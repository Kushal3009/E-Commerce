import React from 'react';
import { useSpring, animated } from 'react-spring';

const Modal = ({ isOpen, onClose, children }) => {
  const fadeIn = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? 'translateY(0)' : 'translateY(-100px)',
    config: { duration: 300 },
  });

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 z-50" onClick={onClose}>
          <animated.div
            style={fadeIn}
            className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full"
            onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
          >
            {children}
          </animated.div>
        </div>
      )}
    </>
  );
};

export default Modal;