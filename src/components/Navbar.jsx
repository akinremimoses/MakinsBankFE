import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    setShowModal(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setShowModal(false);
    navigate('/login');
  };

  const cancelLogout = () => {
    setShowModal(false);
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top shadow-sm" style={{ background: 'linear-gradient(90deg, #e8f5e9 0%, #a5d6a7 100%)' }}>
      <div className="container ">
        <Link className="navbar-brand fw-bold text-success fs-3" to="/">MakinsBank</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto gap-2">
            <li className="nav-item">
              <Link className="nav-link px-3 rounded-pill text-success fw-semibold" to="/dashboard" style={{ transition: 'background 0.2s' }}>Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3 rounded-pill text-success fw-semibold" to="/transfer" style={{ transition: 'background 0.2s' }}>Transfer</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3 rounded-pill text-success fw-semibold" to="/withdraw" style={{ transition: 'background 0.2s' }}>Withdraw</Link>
            </li>
          </ul>
          <ul className="navbar-nav align-items-center gap-2">
            {user ? (
              <>
                <li className="nav-item d-flex align-items-center gap-2">
                  <FaUserCircle className="text-success" size={28} />
                  <span className="nav-link text-success fw-semibold">{user.name}</span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-success rounded-pill px-4 fw-semibold shadow-sm" onClick={handleLogout} style={{ transition: 'background 0.2s' }}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="btn btn-success rounded-pill px-4 fw-semibold shadow-sm" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-outline-success rounded-pill px-4 fw-semibold shadow-sm" to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      {showModal && (
        <div className="modal show d-block fade" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.3)', transition: 'background 0.3s' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content rounded-4 shadow-lg animate__animated animate__fadeInDown">
              <div className="modal-header border-0">
                <h5 className="modal-title">Confirm Logout</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={cancelLogout}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to logout?</p>
              </div>
              <div className="modal-footer border-0">
                <button type="button" className="btn btn-outline-secondary rounded-pill px-4" onClick={cancelLogout}>Cancel</button>
                <button type="button" className="btn btn-danger rounded-pill px-4" onClick={confirmLogout}>Logout</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;