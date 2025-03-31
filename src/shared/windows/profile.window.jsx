import React from 'react'
import { User, LogOut, X} from 'lucide-react';
import { windowList } from '../keys/windowList';
import userService from '../services/user.service';
import useModalStore from '../../store/modal.store';
function Profile(){
  const username = "John Doe"; 
  const close = useModalStore((state)=>state.close)
  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg p-6 border-l z-50">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-3">
          <User className="text-gray-600" size={24} />
          <input 
            type="text" 
            value={username}
            className="w-full border-b border-gray-300 focus:outline-none focus:border-blue-500 text-lg"
          />
          <div className="hover:bg-gray-300 rounded-full p-2" onClick={()=>close(windowList.profileWindow)}>
            <X size={24}/>
          </div>
        </div>

        <div className="flex flex-col space-y-3">
          <button 
            className="flex items-center justify-center w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
            onClick={() => alert('Navigating to Tree')}
          >
            Go to Tree
          </button>

          <button 
            className="flex items-center justify-center w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition duration-300"
            onClick={() => {
                userService.LogOut();
            }}
          >
            <LogOut className="mr-2" size={20} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile