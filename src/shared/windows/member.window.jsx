
import React from 'react'
import useModalStore from '../../store/modal.store';
import { windowList } from '../keys/windowList';
import { X,Users, Heart, Baby} from 'lucide-react';
function MemberWindow({isOpen, node}) {

    const close = useModalStore((state) => state.close);
    const open = useModalStore((state)=>state.open)
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-greenly rounded-lg shadow-xl w-full max-w-lg mx-4">
            <div className="flex justify-between items-center p-4 border-b-2 border-tree">
              <h2 className="text-lg font-semibold text-gray-800">Додати члена сім'ї</h2>
              <button 
                onClick={()=>close(windowList.memberWindow)} 
                className="text-gray-500 hover:text-gray-700 rounded-full"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-4">
              <p className="text-sm text-gray-500 mb-3">Виберть члена родини:</p>
              
              <div className="grid grid-cols-3 gap-4">
                <button                    
                    className={`flex flex-col items-center p-4 rounded-lg transition-colors border-2 border-tree 
                    focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    onClick={()=>open(windowList.addWindow, 'parent')}
                >
                    <div className="mb-2">
                      <Heart size={24} className="text-[#788951]" />
                    </div>
                    <h3 className="font-medium font-comfortaa text-brown">Додати батьків</h3>
                  </button>

                  <button                    
                    className={`flex flex-col items-center p-4 rounded-lg transition-colors border-2 border-tree 
                    focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    onClick={()=>open(windowList.addWindow, 'sibling')}
                  >
                    <div className="mb-2">
                      <Users size={24} className="text-[#788951]" />
                    </div>
                    <h3 className="font-medium font-comfortaa text-brown">Додати брата/сестру</h3>
                  </button>

                  <button                    
                    className={`flex flex-col items-center p-4 rounded-lg transition-colors border-2 border-tree 
                    focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    onClick={()=>open(windowList.addWindow, 'child')}
                  >
                    <div className="mb-2">
                      <Baby size={24} className="text-[#788951]" />
                    </div>
                    <h3 className="font-medium font-comfortaa text-brown">Додати дітей</h3>
                  </button>
              </div>
            </div>
            
            <div className="p-4 border-t-2 border-tree bg-gray-50 flex justify-end rounded-b-lg bg-greenly">
              <button
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm 
                hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={()=>close(windowList.memberWindow)} 
              >
                Скасувати
              </button>
            </div>
          </div>
        </div>
      );
}

export default MemberWindow