import React, { useEffect, useState } from 'react'
import { User, LogOut, X, Upload, Trash2, RefreshCw } from 'lucide-react';
import { windowList } from '../keys/windowList';
import userService from '../services/user.service';
import useModalStore from '../../store/modal.store';
import useTreeStore from '../../store/tree.store';
import { useNavigate } from 'react-router-dom';
function Profile(){
  const getTree = useTreeStore((state)=>state.getTree)
  const tree = useTreeStore((state)=>state.tree)
  const [isUpdatingImage, setIsUpdatingImage] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(()=>{
    const fetchTree = async ()=>{
        await getTree();
    }
    if(!!localStorage.getItem('TREE_ID')){
      fetchTree();
    }
    else{
      open(windowList.createTree)
    }
  },[])

  const username = !!localStorage.getItem('ACCESS_TOKEN')&&`${tree?.firstName} ${tree?.lastName}`; 
  const close = useModalStore((state)=>state.close)


  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setIsUpdatingImage(true);
        // Here you would typically upload the image to your server
        // and update the user's img parameter
        // For example:
        // await userService.updateProfileImage(file);
        // const updatedUser = await userService.getUserData(); // Refresh user data
        // setUser(updatedUser);
        
        // This is a placeholder for the actual implementation
        console.log("Image would be uploaded:", file.name);
        
        // After successful upload
        setIsUpdatingImage(false);
      } catch (error) {
        console.error("Error uploading image:", error);
        setIsUpdatingImage(false);
      }
    }
  };
  
  const removeImage = async () => {
    try {
      setIsUpdatingImage(true);
      // Here you would typically call an API to remove the user's image
      // For example:
      // await userService.removeProfileImage();
      // const updatedUser = await userService.getUserData(); // Refresh user data
      // setUser(updatedUser);
      
      // This is a placeholder for the actual implementation
      console.log("Image would be removed");
      
      // After successful removal
      setIsUpdatingImage(false);
    } catch (error) {
      console.error("Error removing image:", error);
      setIsUpdatingImage(false);
    }
  };


  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg p-6 border-l z-50">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Профіль</h2>
          <div className="hover:bg-gray-300 rounded-full p-2 cursor-pointer" onClick={() => close(windowList.profileWindow)}>
            <X size={24}/>
          </div>
        </div>
        
        <div className="flex flex-col items-center space-y-4">
          <div className="relative group">
            {isUpdatingImage ? (
              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            ) : user?.img ? (
              <div className="relative">
                <img 
                  src={user.img} 
                  alt="Profile" 
                  className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 rounded-full flex items-center justify-center transition-all duration-300">
                  <div className="hidden group-hover:flex space-x-2">
                    <label htmlFor="profile-image-update" className="bg-blue-500 p-2 rounded-full cursor-pointer">
                      <RefreshCw size={16} className="text-white" />
                    </label>
                    <button 
                      className="bg-red-500 p-2 rounded-full"
                      onClick={removeImage}
                    >
                      <Trash2 size={16} className="text-white" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center border-2 border-gray-300">
                <label htmlFor="profile-image" className="cursor-pointer flex flex-col items-center">
                  <Upload size={24} className="text-gray-500" />
                  <span className="text-xs text-gray-500 mt-1">Додати фото</span>
                </label>
              </div>
            )}
            
            <input 
              type="file" 
              id={user?.img ? "profile-image-update" : "profile-image"} 
              className="hidden" 
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>*
          
          <div className="flex items-center space-x-3 w-full">
            <User className="text-gray-600" size={24} />
            <span className='font-bold text-lg'>{username || ''}</span>
          </div>
        </div>

        <div className="flex flex-col space-y-3 mt-4">
          <button 
            className="flex items-center justify-center w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
            onClick={() => alert('Перехід до дерева')}
          >
            Перейти до дерева
          </button>

          <button 
            className="flex items-center justify-center w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition duration-300"
            onClick={() => {
              userService.LogOut();
              navigate('/login');
            }}
          >
            <LogOut className="mr-2" size={20} />
            Вийти
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile