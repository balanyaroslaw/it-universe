
import React from 'react'
import useModalStore from '../../store/modal.store';
import { windowList } from '../keys/windowList';
import { X, UserRound, Users, Heart, Baby} from 'lucide-react';
function MemberWindow({isOpen, node}) {

    const close = useModalStore((state) => state.close);
    const open = useModalStore((state)=>state.open)
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4">
            <div className="flex justify-between items-center p-4 border-b">
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
                    className={`flex flex-col items-center p-4 rounded-lg transition-colors bg-pink-100 hover:bg-pink-200 
                    focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    onClick={()=>open(windowList.addWindow, 'parent')}
                >
                    <div className="mb-2">
                      <Heart size={24} className="text-pink-500" />
                    </div>
                    <h3 className="font-medium">Додати батьків</h3>
                  </button>

                  <button                    
                    className={`flex flex-col items-center p-4 rounded-lg transition-colors bg-purple-100 hover:bg-purple-200 
                    focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    onClick={()=>open(windowList.addWindow, 'sibling')}
                  >
                    <div className="mb-2">
                      <Users size={24} className="text-purple-500" />
                    </div>
                    <h3 className="font-medium">Додати брата/сестру</h3>
                  </button>

                  <button                    
                    className={`flex flex-col items-center p-4 rounded-lg transition-colors bg-blue-100 hover:bg-blue-200 
                    focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    onClick={()=>open(windowList.addWindow, 'child')}
                  >
                    <div className="mb-2">
                      <Baby size={24} className="text-blue-500" />
                    </div>
                    <h3 className="font-medium">Додати дітей</h3>
                  </button>
              </div>
            </div>
            
            <div className="p-4 border-t bg-gray-50 flex justify-end rounded-b-lg">
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