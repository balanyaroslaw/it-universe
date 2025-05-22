import { useEffect, useState } from "react";
import {Link, useNavigate} from 'react-router-dom'
import Logo from '../../assets/logo.png'
import CreateWindow from "../windows/create.window";
import useModalStore from "../../store/modal.store";
import { windowList } from "../keys/windowList";
function MainMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [_, setIsTreeExist] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{
    if(!!!localStorage.getItem('TREE_ID')&&!!!localStorage.getItem("ACCESS_TOKEN")){
      setIsTreeExist(true);
    } 
  },[])
  const open = useModalStore((state)=>state.open)
  return (
    <div className="fixed w-full bg-tree shadow-md z-50 top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex w-full justify-center items-center">
            <div className="font-outfit flex-shrink-0 flex items-center">
              <img className="h-10 w-auto" src={Logo} alt="AncTree Logo" />
              <span className="ml-2 text-2xl font-bold text-brown">ANCTREE</span>
            </div>
            
            <div className="flex w-full justify-center gap-10 items-center rounded-lg md:text-lg">
              <Link 
                to="/" 
                onClick={() => setActiveTab('dashboard')}
                className="text-brown focus:outline-none outline-none font-comfortaa no-underline hover:no-underline hover:text-xl hover:text-brown transition-all duration-300"
              >
                Головна
              </Link>
              
              <Link 
                to="/about" 
                onClick={() => setActiveTab('about')}
                className="text-brown focus:outline-none outline-none font-comfortaa no-underline hover:no-underline hover:text-xl hover:text-brown transition-all duration-300"
              >
                Про нас
              </Link>
            </div>

            <div className="hidden sm:ml-6 sm:flex sm:items-center gap-4">
              <button
                className="text-gray-500 md:text-md font-comfortaa"
                onClick={() => {
                  open(windowList.loginWindow)
                  navigate('/login');
                }}
              >
                {!!!localStorage.getItem('ACCESS_TOKEN')?'Увійти':''}
              </button>

              <div className="ml-3 relative">
                <button
                  onClick={() => {
                    open(windowList.profileWindow)
                  }}
                  className="p-1 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <span className="sr-only">View profile</span>
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/tree"
              className={`${
                activeTab === 'tree'
                  ? 'bg-green-50 border-green-500 text-green-700'
                  : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
              } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
              onClick={() => {
                setActiveTab('tree');
                setIsOpen(false);
              }}
            >
              Family Tree
            </Link>
            
            <Link
              to="/profile"
              className={`${
                activeTab === 'profile'
                  ? 'bg-green-50 border-green-500 text-green-700'
                  : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
              } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
              onClick={() => {
                setActiveTab('profile');
                setIsOpen(false);
              }}
            >
              Profile
            </Link>
            
            <Link
              to="/about"
              className={`${
                activeTab === 'about'
                  ? 'bg-green-50 border-green-500 text-green-700'
                  : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
              } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
              onClick={() => {
                setActiveTab('about');
                setIsOpen(false);
              }}
            >
              About Us
            </Link>
          </div>
          
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">User Name</div>
                <div className="text-sm font-medium text-gray-500">user@example.com</div>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <button className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                Your Profile
              </button>
              <button className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                Settings
              </button>
              <button className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
      <CreateWindow isOpen={showModal} close={setShowModal}/>
    </div>
  );
}

export default MainMenu;