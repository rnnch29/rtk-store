import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-blue-500 text-white py-5 w-full">
      <div className="mx-auto flex justify-center">
        <p>© 2024 All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
