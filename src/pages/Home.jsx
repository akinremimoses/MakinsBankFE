import React from 'react';
import { Link } from 'react-router-dom';
import womanbank from '../assets/womanbank.jpg';
import { FaLock, FaBolt, FaGift, FaShieldAlt } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="container py-5">
      <div className="row align-items-center justify-content-center flex-lg-row flex-column-reverse">
        <div className="col-lg-6 text-center text-lg-start mb-5 mb-lg-0">
          <h1 className="display-3 fw-bold text-success mb-3">Welcome to MakinsBank</h1>
          <p className="lead mb-4 text-secondary">
            Experience simple, secure, and stress-free banking.<br/>
            Say goodbye to long queues and complex procedures and hello to hassle-free banking with MakinsBank.
          </p>
          <div className="d-flex flex-column align-items-center align-items-lg-start gap-3 mb-4">
            <div className="d-flex align-items-center gap-2">
              <FaLock className="text-success" />
              <span>100% SECURE TRANSACTION</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <FaBolt className="text-success" />
              <span>FAST AND RELIABLE</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <FaGift className="text-success" />
              <span>Get $10,000 UPON REGISTRATION</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <FaShieldAlt className="text-success" />
              <span>NDIC INSURED</span>
            </div>
          </div>
          <div className="d-flex gap-3 justify-content-center justify-content-lg-start">
            <Link to="/register" className="btn btn-success btn-lg px-4 shadow">Get Started</Link>
            <Link to="/login" className="btn btn-outline-success btn-lg px-4 shadow">Login</Link>
          </div>
        </div>
        <div className="col-lg-6 d-flex justify-content-center mb-4 mb-lg-0">
          <img 
            src={womanbank} 
            alt="Banking woman" 
            className="img-fluid rounded shadow-lg" 
            style={{ maxHeight: '400px', objectFit: 'cover' }}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;