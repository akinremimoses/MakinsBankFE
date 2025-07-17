import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container py-5">


      {/* Navigation */}
      {/* <div className="landingpagenav d-flex flex-column flex-md-row gap-3 gap-md-5 align-items-center p-5">
        <div>
          <h1 className="m-0 text-success fw-bold">MakinsPay</h1>
        </div>
        <div className="d-flex flex-column flex-md-row gap-3 gap-md-5 align-items-center">
          <a href="#" className="text-decoration-none text-dark fs-4 fs-md-5">About</a>
          <a href="#" className="text-decoration-none text-dark fs-4 fs-md-5">Contact Us</a>
          <Link to={'/login'} className="btn btn-success ms-md-auto mt-3 mt-md-0">Login</Link>
        </div>
      </div> */}


      <div className="row align-items-center ">
        <div className="col-lg-6 d-flex gap-5">
          <div className=''>
            <h1 className="display-4 fw-bold text-success mb-4">Welcome to MakinsBank</h1>
            <p className="lead mb-4">
              Experience simple, secure, and stress-free banking. Say goodbye to
              long queues and complex procedures and hello to hassle-free banking
              with MakinsBank.
            </p>
          </div>
          <div className="landingimg col-lg-6 d-none d-lg-block"></div>

          <div className='dark list w-100 text-success'>
            <ul>
              <li>100% SECURE TRANSACTION</li>
              <li>FAST AND RELIABLE</li>
              <li>Get $10,000 UPON REGISTRATION</li>
              <li>NDIC INSURE</li>
            </ul>
          </div>
        </div>
          <div className="d-flex gap-3">
            <Link to="/register" className="btn btn-success btn-lg px-4">Get Started</Link>
            <Link to="/login" className="btn btn-outline-success btn-lg px-4">Login</Link>
          </div>



        {/* <div className="col-lg-6 d-none d-lg-block">
          <img 
            src='./assets/womanbank.jpg' 
            alt="./assets/womanbank.jpg" 
            className="img-fluid rounded shadow"
          />
        </div> */}


      </div>
    </div>
  );
};

export default Home;