const csv = require('csvtojson');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const DistributedList = require('../models/DistributedList');
const Agent = require('../models/Agent');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '../uploads');

    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'text/csv' ||
    file.originalname.toLowerCase().endsWith('.csv')) {
    cb(null, true);
  } else {
    cb(new Error('Only CSV files are allowed'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

exports.uploadMiddleware = upload.single('file');

exports.uploadCSV = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const filePath = req.file.path;
    console.log('Processing file:', filePath);

    const jsonArray = await csv().fromFile(filePath);
    console.log(`Converted CSV to JSON: ${jsonArray.length} records`);

    if (jsonArray.length === 0) {
      fs.unlinkSync(filePath);
      return res.status(400).json({ message: 'CSV file is empty' });
    }

    const agents = await Agent.find();
    console.log(`Found ${agents.length} agents`);

    if (agents.length < 5) {
      fs.unlinkSync(filePath);
      return res.status(400).json({ message: 'At least 5 agents are required' });
    }

    const chunkSize = Math.floor(jsonArray.length / 5);
    const remainder = jsonArray.length % 5;

    let processedCount = 0;
    for (let i = 0; i < 5; i++) {
      const count = chunkSize + (i < remainder ? 1 : 0);
      const chunk = jsonArray.splice(0, count);

      await DistributedList.create({
        agentId: agents[i]._id,
        data: chunk
      });

      processedCount += chunk.length;
      console.log(`Distributed ${chunk.length} records to agent ${agents[i]._id}`);
    }

    fs.unlinkSync(filePath);

    res.json({
      message: `CSV distributed successfully - ${processedCount} records distributed among ${agents.length} agents`,
      recordsProcessed: processedCount,
      agentsUsed: agents.length
    });

  } catch (error) {
    console.error('CSV processing error:', error);

    if (req.file && req.file.path) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (unlinkError) {
        console.error('Error deleting file:', unlinkError);
      }
    }

    res.status(500).json({
      message: 'Error processing CSV file',
      error: error.message
    });
  }
};

exports.getDistributedLists = async (req, res) => {
  try {
    console.log('Fetching distributed lists');

    const lists = await DistributedList.find().populate('agentId');

    console.log(`Found ${lists.length} distributed lists`);

    res.json(lists);
  } catch (error) {
    console.error('Error fetching distributed lists:', error);
    res.status(500).json({
      message: 'Error fetching distributed lists',
      error: error.message
    });
  }
};