import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Upload from './pages/Upload';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/upload" element={<Upload />} />
    </Routes>
  );
}

export default App;
