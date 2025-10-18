
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-6 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} Yoco Payment Demo. This is a demonstration and not a real store.</p>
      </div>
    </footer>
  );
};

export default Footer;
