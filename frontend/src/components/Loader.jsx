import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="loader"></div>
      <style>{`
        .loader {
          border: 8px solid rgba(0, 0, 0, 0.1);
          border-left-color: #4f46e5; /* Change this color to match your theme */
          border-radius: 50%;
          width: 50px; /* Adjust size here */
          height: 50px; /* Adjust size here */
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;
