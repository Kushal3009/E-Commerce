import React from 'react';

const Footer = () => {
  return (
    <footer className='bg-gray-800 text-white py-8'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='flex flex-col md:flex-row justify-between'>
          {/* Company Info Section */}
          <div className='mb-6 md:mb-0'>
            <h2 className='text-lg font-semibold mb-4'>Company</h2>
            <p className='mb-2'>1234 Street Name, City, State, 56789</p>
            <p className='mb-2'>Email: info@example.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
          
          {/* Navigation Links */}
          <div className='mb-6 md:mb-0'>
            <h2 className='text-lg font-semibold mb-2'>Quick Links</h2>
            <ul className='flex items-center flex-col'>
              <li className='mb-1'><a href='#' className='hover:underline'>Home</a></li>
              <li className='mb-1'><a href='#' className='hover:underline'>About</a></li>
              <li className='mb-1'><a href='#' className='hover:underline'>Services</a></li>
              <li className='mb-1'><a href='#' className='hover:underline'>Contact</a></li>
            </ul>
          </div>
          
          {/* Social Media Links */}
          <div>
            <h2 className='text-lg font-semibold mb-4'>Follow Us</h2>
            <div className='flex space-x-4'>
              <a href='#' className='hover:text-blue-500 text-2xl'><i className='fab fa-facebook-f'></i></a>
              <a href='#' className='hover:text-blue-400 text-2xl'><i className='fab fa-twitter'></i></a>
              <a href='#' className='hover:text-red-600 text-2xl'><i className='fab fa-youtube'></i></a>
              <a href='#' className='hover:text-gray-400 text-2xl'><i className='fab fa-instagram'></i></a>
            </div>
          </div>
        </div>
        
        <div className='mt-8 text-center w-full'>
          <p>&copy; 2024 Company Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
