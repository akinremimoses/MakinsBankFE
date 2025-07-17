import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-success text-white py-4 mt-4">
      <div className="container text-center">
        <p className="mb-0">© {new Date().getFullYear()} MakinsBank. All rights reserved.</p>
        <p className="mb-0">Secure and reliable banking services</p>
      </div>
    </footer>
  );
};

export default Footer;