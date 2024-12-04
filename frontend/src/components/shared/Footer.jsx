import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">JobHunt</h3>
          <p>
            Find the perfect job or the perfect candidate with JobHunt. Connecting recruiters and job seekers efficiently.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul>
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">Jobs</a></li>
            <li><a href="#" className="hover:underline">Post a Job</a></li>
            <li><a href="#" className="hover:underline">Contact Us</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-bold mb-4">Contact Us</h3>
          <p>Email: <a href="mailto:info@jobhunt.com" className="underline">info@jobhunt.com</a></p>
          <p>Phone: +123-456-7890</p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-gray-400"><i className="fab fa-facebook"></i></a>
            <a href="#" className="hover:text-gray-400"><i className="fab fa-twitter"></i></a>
            <a href="#" className="hover:text-gray-400"><i className="fab fa-linkedin"></i></a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
        &copy; 2024 JobHunt. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
