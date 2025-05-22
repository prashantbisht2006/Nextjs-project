import React from 'react';

const Ping = () => {
  return (
    <div className="relative">
      <div className="absolute -left-4 top-1">
        <div className="relative flex h-3 w-3">
          
          <span className="absolute inline-flex h-full w-full rounded-full bg-blue-800 opacity-75 animate-ping"></span>
          
          <span className="relative inline-flex h-3 w-3 rounded-full bg-blue-600"></span>
        </div>
      </div>
    </div>
  );
};

export default Ping;
