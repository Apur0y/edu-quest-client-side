import React from "react";

const Footer = () => {
  return (
    <footer className="footer mt-24 bg-[#134E4A] text-[#e9fffe] p-10">
      <nav>
        <h6 className="footer-title">Services</h6>
        <a href="https://portfolio-01-fbc04.web.app/" className="link link-hover">Branding</a>
        <a href="https://portfolio-01-fbc04.web.app/" className="link link-hover">Design</a>
        <a href="https://portfolio-01-fbc04.web.app/" className="link link-hover">Marketing</a>
        <a href="https://portfolio-01-fbc04.web.app/" className="link link-hover">Advertisement</a>
      </nav>
      <nav>
        <h6 className="footer-title">Company</h6>
        <a href="https://portfolio-01-fbc04.web.app/" className="link link-hover">About us</a>
        <a href="https://portfolio-01-fbc04.web.app/" className="link link-hover">Contact</a>
        <a href="https://portfolio-01-fbc04.web.app/" className="link link-hover">Jobs</a>
        <a href="https://portfolio-01-fbc04.web.app/" className="link link-hover">Press kit</a>
      </nav>
      <nav>
        <h6 className="footer-title">Legal</h6>
        <a href="https://portfolio-01-fbc04.web.app/" className="link link-hover">Terms of use</a>
        <a href="https://portfolio-01-fbc04.web.app/" className="link link-hover">Privacy policy</a>
        <a href="https://portfolio-01-fbc04.web.app/" className="link link-hover">Cookie policy</a>
      </nav>
    </footer>
  );
};

export default Footer;
