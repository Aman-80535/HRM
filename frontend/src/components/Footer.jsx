// Footer.js
import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container mt-5">
      <div className="footer-logo-section">
        <img src="https://s3-alpha-sig.figma.com/img/5e82/7775/f6c8d4c3a3f7055f7b3650b64a7cd789?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=J~1w4JTElo-rDr-LJ5O68fFJJQDE-Hckurt6FZ3vpwtyPYJ0FFIyQStPthBWOejWuNF6qzZGI071CFh5CLofsRBSssWHbAXkz-EfRg7HenIvu8bdhMk46E7HOpNSlzjxmpP9rw76udiTsRc5sJmF13CIeg740rZ8yfirL6U2xmXLietPc6t9SgWeNui4AIDUWjS7Z3QoZLRD4Dghob7FYEZDLXOD5h6VkhsDCQj6j63MrT8xqOz19dDbzxR-EdMGGp7Tqlcm50eXHuB59q-8jbQTXckR7cKmXdDEE7tG2cOKh~cgYgjBcPyu~QBEJGDHvZOB-wIUoYPMYN24f1FTRQ__" alt="" style={{width:"279px", height:"117px"}}/>
        <p className="footer-description">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum, eligendi, voluptatibus deleniti ipsum officiis alias ex impedit.
        </p>
      </div>
      <div className="footer-links-section">
        <div className="footer-links">
          <h4>Important Links</h4>
          <ul>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>
        <div className="footer-links">
          <h4>Terms & Conditions</h4>
          <ul>
            <li><a href="#">Contact Support</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-social-section">
        <a href="#"><i className="fab fa-facebook-f"></i></a>
        <a href="#"><i className="fab fa-instagram"></i></a>
        <a href="#"><i className="fab fa-linkedin-in"></i></a>
        <a href="#"><i className="fab fa-skype"></i></a>
      </div>
      <div className="footer-bottom">
        <hr />
        <p>Copyright &copy; 2025. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
