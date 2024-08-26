import React from 'react';
import { FaChartLine, FaUserCheck } from 'react-icons/fa'; // Example icons

const Header = () => {
  return (
    <header className="text-black lg:ml-6 ml-6  py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold">Attend!t</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
