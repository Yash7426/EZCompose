import React from 'react';


const Footer: React.FC = () => {

  return (
    <footer className=" px-4 pt-20 max-w-screen-xl mx-auto md:px-8 text-lg text-white">
   
      <div className="mt-8 py-6  items-center justify-between sm:flex">
        <div className="mt-4 sm:mt-0 font-normal mx-auto text-gray-500">
          &copy; 2024 EZ Compose All rights reserved.
        </div>
      
      </div>
      <style jsx>{`
          .svg-icon path,
          .svg-icon polygon,
          .svg-icon rect {
              fill: currentColor;
          }
      `}</style>
    </footer>
  );
};

export default Footer;
