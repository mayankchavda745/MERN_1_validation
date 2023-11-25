import './App.css';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import Home from './components/Home';
import Raise from './components/Raise';

function App() {
  
  // On click Links should route to respective components

  return (
    <BrowserRouter>
      <nav className="navbar sticky-top bg-light">
        <div className="container-fluid">
          {/** route to Home using the path '/' */}
          <Link
            style={{ textDecoration: "none", color: "black", fontSize: "25px" }}
            data-testid="title-link" 
            to="/"
            >
            Network Provider
          </Link>
          <div className="row w-75 text-center">
        <div className="col-lg-6">
            {/** route to Home */}
          <Link
            type="button"
            className="btn btn-outline-dark mx-2 w-50"
            data-testid="home-link"
            to="/home"
            >
            All Requests
          </Link>
        </div>
        <div className="col-lg-6">
          {/** route to Raise */}
          <Link
            type="button"
            className="btn btn-outline-dark mx-2 w-50"
            data-testid="raise-link"
            to="/raise"
          >
            Raise New Request
          </Link>
        </div>
      </div>
        </div>
        
      </nav>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/raise" element={<Raise />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
