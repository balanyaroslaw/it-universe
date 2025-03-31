import React, {useState} from 'react'
import { X, Trash, User} from "lucide-react";
import useModalStore from '../../store/modal.store';
import { windowList } from '../keys/windowList';
import useTreeStore from '../../store/tree.store';

function SideWindow({ node }) {
  const close = useModalStore((state) => state.close);
  const removeNode = useTreeStore((state) => state.removeNode);
  const [isConfirmingDelete, setIsConfirmingDelete] = React.useState(false);
  const handleDelete = async () => {
    if (isConfirmingDelete) {
      await removeNode(node.id);
      close(windowList.informationWindow);
    } else {
      setIsConfirmingDelete(true);
    }
  };
  
  return (
    <div className="absolute right-0 h-full w-1/4 bg-white z-10 flex flex-col animate-slideIn overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-green-500 to-green-400 text-white flex justify-between items-center">
        <div className="flex items-center gap-2">
          <User size={24} />
          <h2 className="text-lg font-semibold">Інформація</h2>
        </div>
        <button 
          onClick={() => close(windowList.informationWindow)} 
          className="text-white hover:text-blue-200 transition-colors"
        >
          <X size={24}/>
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6">
        <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-100">
          <div className="flex items-center justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl font-bold">
              {node.firstName?.charAt(0) || ""}
              {node.lastName?.charAt(0) || ""}
            </div>
          </div>
          <h3 className="text-center text-lg font-medium text-gray-800">{node.firstName} {node.lastName}</h3>
          {node.role && <p className="text-center text-sm text-gray-500">{node.role}</p>}
        </div>

        <div className="space-y-4">
          <h4 className="font-medium text-gray-700 text-md border-b pb-2">Персональні деталі</h4>

          <div className="flex flex-col gap-1 rounded-md bg-gray-50 p-3">
            <div className="flex justify-between items-center">
              <span className="font-medium text-sm text-gray-600">Ім'я</span>
              <span className="font-medium text-gray-900">{node.firstName || "-"}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-sm text-gray-600">Прізвище</span>
              <span className="font-medium text-gray-900">{node.lastName || "-"}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-sm text-gray-600">По-батькові</span>
              <span className="font-medium text-gray-900">{node.fatherName || "-"}</span>
            </div>
            {node.gender==='female'&&
              <div className="flex justify-between items-center">
                <span className="font-medium text-sm text-gray-600">Дівоче прізвище</span>
                <span className="font-medium text-gray-900">{node.maidenName || "-"}</span>
              </div>
            }
            <div className="flex justify-between items-center">
              <span className="font-medium text-sm text-gray-600">Дата народження</span>
              <span className="font-medium text-gray-900">{node.birthDate || "-"}</span>
            </div>
          </div>

          {node.email && (
            <div className="flex justify-between items-center px-3 py-2">
              <span className="font-medium text-sm text-gray-600">Email</span>
              <span className="font-medium text-sm text-blue-600">{node.email}</span>
            </div>
          )}
          
          {node.phone && (
            <div className="flex justify-between items-center px-3 py-2">
              <span className="font-medium text-sm text-gray-600">Phone</span>
              <span className="font-medium text-sm text-gray-900">{node.phone}</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-between">
        <button
          onClick={() => close(windowList.informationWindow)}
          className="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-md flex items-center gap-2 hover:bg-gray-100 transition"
        >
          <X className="w-5 h-5" />
          Закрити
        </button>
        <button
          onClick={handleDelete}
          className={`px-4 py-2 rounded-md text-white flex items-center gap-2 transition ${
            isConfirmingDelete ? "bg-red-600 hover:bg-red-700" : "bg-green-500 hover:bg-green-600"
          }`}
        >
          <Trash className="w-5 h-5" />
          {isConfirmingDelete ? "Підтвердити" : "Видалити"}
        </button>
      </div>
    </div>
  );
}

export default SideWindow