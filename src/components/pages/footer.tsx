import React, {FC}  from 'react';
import '../css/footer.scss';
import { BsInstagram } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";


const Footer: FC = () => {

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="social-media">
          <a href="https://x.com/lucasanniaxx" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="social-icon">
          <FaXTwitter className='social' id='tw' />
          </a>
          <a href="https://www.instagram.com/lucasanniaa/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-icon">
          <BsInstagram className='social' id='insta'/>
          </a>
          <a href="https://www.linkedin.com/in/luca-sannia-376871309/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-icon">
          <FaLinkedin className='social' id='linkedin'/>
          </a>
        </div>


        <div className="footer-bottom">
          <p>&copy; 2024 ScienceLens. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
