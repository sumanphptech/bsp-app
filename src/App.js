import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Import Router
import RegistrationForm from './components/RegistrationForm';
import DisplayStudents from './components/DisplayStudents';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {

  const [refreshData, setRefreshData] = useState(false);  

  const handleDataSubmit = () => {
    setRefreshData(prev => !prev);  
  };


  return (
    <div className="App">

     
    <Router>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">Registration</Link>
            </li>
            <li className="nav-item">
              <Link to="/data" className="nav-link">Students</Link>
            </li>
          </ul>
        </nav>

      <Routes>
      <Route path="/" element={<RegistrationForm onDataSubmit={handleDataSubmit} />} />
        <Route path="/form" element={<RegistrationForm onDataSubmit={handleDataSubmit} />} />
        <Route path="/data" element={<DisplayStudents refreshData={refreshData} />} />
      </Routes>
    </Router> 

    </div>
  );
}

export default App;
