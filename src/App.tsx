import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Donantes from './pages/Donantes';
import Beneficiarios from './pages/Beneficiarios';
import Donaciones from './pages/Donaciones';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/donantes" element={<Donantes />} />
            <Route path="/beneficiarios" element={<Beneficiarios />} />
            <Route path="/donaciones" element={<Donaciones />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;