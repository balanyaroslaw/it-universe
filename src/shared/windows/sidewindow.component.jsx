
import { Button } from '@blueprintjs/core';
import React, {useState} from 'react'
import useModalStore from '../../store/modal.store';
import { windowList } from '../keys/windowList';
import useTreeStore from '../../store/tree.store';

function SideWindow({ node }) {
  const close = useModalStore((state) => state.close);
  const removeParent = useTreeStore((state) => state.removeNode);
  const removeSibling = useTreeStore((state) => state.removeSibling);
  const member = useModalStore((state)=>state.member)
  const [isConfirmingDelete, setIsConfirmingDelete] = React.useState(false);
  const handleDelete = () => {
    if (isConfirmingDelete) {
      if(member==='sibling'){
        removeSibling(node);
      }
      else{
        removeParent(node);
      }
      close(windowList.informationWindow);
    } else {
      setIsConfirmingDelete(true);
    }
  };
  
  return (
    <div className="absolute right-0 h-full w-1/3 bg-white z-10 flex flex-col animate-slideIn overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white flex justify-between items-center">
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
          <h2 className="text-lg font-semibold">Parent Information</h2>
        </div>
        <button 
          onClick={() => close(windowList.informationWindow)} 
          className="text-white hover:text-blue-200 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6">
        <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-100">
          <div className="flex items-center justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl font-bold">
              {node.name?.charAt(0) || ""}
              {node.lastname?.charAt(0) || ""}
            </div>
          </div>
          <h3 className="text-center text-lg font-medium text-gray-800">{node.name} {node.lastname}</h3>
          {node.role && <p className="text-center text-sm text-gray-500">{node.role}</p>}
        </div>

        <div className="space-y-4">
          <h4 className="font-medium text-gray-700 text-md border-b pb-2">Personal Details</h4>

          <div className="rounded-md bg-gray-50 p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-sm text-gray-600">Name</span>
              <span className="font-medium text-gray-900">{node.name || "-"}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-sm text-gray-600">Last Name</span>
              <span className="font-medium text-gray-900">{node.lastname || "-"}</span>
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
        <Button
          intent="secondary"
          icon="cross"
          text="Close"
          onClick={() => close(windowList.informationWindow)}
          className="px-4 py-2"
        />
        <Button
          intent={isConfirmingDelete ? "danger" : "warning"}
          icon="trash"
          text={isConfirmingDelete ? "Confirm Delete" : "Delete"}
          onClick={handleDelete}
          className="px-4 py-2"
        />
      </div>
    </div>
  );
}

export default SideWindow