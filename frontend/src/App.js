import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddAgent from './pages/AddAgent';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import UploadCSV from './pages/UploadCSV';
import ViewLists from './pages/ViewLists';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-agent" element={<AddAgent />} />
        <Route path="/upload" element={<UploadCSV />} />
        <Route path="/lists" element={<ViewLists />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
