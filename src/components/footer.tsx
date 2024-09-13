import React, {FC, useState}  from 'react';
import './css/footer.scss';
import { BsInstagram } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { BiBadgeCheck } from "react-icons/bi";
import { MdCancel } from "react-icons/md";

const Footer: FC = () => {

  const [contactForm, setContactForm] = useState(false)
  

  const showForm = () => {
    setContactForm(true);
  }

  const cancelForm = () => {
    setContactForm(false);
  }


  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactType: 'general',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aggiungi qui la logica per gestire l'invio del form (es. invio dati a un server)
    console.log('Dati del form inviati:', formData);
    setIsSubmitted(true);

    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      contactType: 'general',
    });
  };

  const cancelSubmit = () => {
    setIsSubmitted(false);
  }


  console.log(formData)
  


  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="social-media">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="social-icon">
          <FaXTwitter className='social' id='tw' />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-icon">
          <BsInstagram className='social' id='insta'/>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-icon">
          <FaLinkedin className='social' id='linkedin'/>
          </a>
        </div>
{ !contactForm &&(
          <div className="contact-button">
          <a className="button" onClick={showForm}>Contact Us</a>
        </div>
)}

{ contactForm && (
  <>
  <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">Name:</label>
        <input
          type="text"
          name="firstName"
          className="form-input"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label className="form-label">Surname:</label>
        <input
          type="text"
          name="lastName"
          className="form-input"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label className="form-label">Email:</label>
        <input
          type="email"
          name="email"
          className="form-input"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label className="form-label">Choose a Contact Reason:</label>
        <select
          name="contactType"
          className="form-select"
          value={formData.contactType}
          onChange={handleChange}
        >
          <option value="general">General request</option>
          <option value="payment">Payments problem</option>
          <option value="bug">Website bug</option>
          <option value="business">Business inquiries</option>
        </select>
        <a className='cancelForm' onClick={cancelForm}><MdCancel /></a>
      </div>

      <button type="submit" className="form-button">Invia</button>
    </form>

    { isSubmitted && (
        <div className="success-screen">
        <div className="success-content">
          <div className="success-icon"><BiBadgeCheck /></div>
          <h2 className="success-message">We have reached you inquiries!</h2>
          <p className='success-message-p'>Our team will be back to you as soon as possible, thanks for reporting!</p>
          <a className='cancelSubmit' onClick={cancelSubmit}><MdCancel /></a>
        </div>
      </div>
    )}
    </>
)}


        <div className="footer-bottom">
          <p>&copy; 2024 Shop-Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
