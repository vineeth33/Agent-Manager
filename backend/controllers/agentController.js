const Agent = require('../models/Agent');

exports.addAgent = async (req, res) => {
  const { name, email, mobile, password } = req.body;
  const agent = new Agent({ name, email, mobile, password });
  await agent.save();
  res.json({ message: 'Agent added' });
};

exports.getAgents = async (req, res) => {
  const agents = await Agent.find();
  res.json(agents);
};
