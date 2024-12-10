import React from 'react';
import { ImSpinner6 } from 'react-icons/im';

const Spinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center fixed inset-0 bg-white bg-opacity-80">
      <ImSpinner6 className="text-3xl animate-spin" size={50}/>
    </div>
  );
};

export default Spinner;
