import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import BarChart from './components/BarChart';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
