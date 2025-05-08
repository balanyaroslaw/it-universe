import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-gray-400 bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="flex justify-center items-center h-full">
            <div 
                className="w-12 h-12 border-4 border-gray-100 border-t-4 border-t-tree rounded-full animate-spin"
            />
        </div>
    </div>
  );
};

export default LoadingSpinner;