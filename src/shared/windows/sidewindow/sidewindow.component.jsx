
import { Button } from '@blueprintjs/core';
import React, {useState} from 'react'
import useModalStore from '../../../store/modal.store';
import { windowList } from '../../keys/windowList';
import useTreeStore from '../../../store/tree.store';

function SideWindow({node}) {
  const close = useModalStore((state)=>state.close)
  const removeParent = useTreeStore((state)=>state.removeNode)
  return (
    <div className="fixed top-0 right-0 h-full w-1/3 bg-gray-100 shadow-lg z-50 flex flex-col">
      <div className="p-6 bg-blue-600 text-white">
        <h2 className="text-lg font-semibold">Parent Information</h2>
      </div>
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-center border-b pb-2 border-gray-300">
          <span className="font-medium text-sm text-gray-600">Name</span>
          <span className="font-medium text-sm text-gray-900">{node.name}</span>
        </div>
        <div className="flex justify-between items-center border-b pb-2 border-gray-300">
          <span className="font-medium text-sm text-gray-600">Last Name</span>
          <span className="font-medium text-sm text-gray-900">{node.lastname}</span>
        </div>
        <div className="mt-6 flex justify-between">
          <Button
            intent="primary"
            icon="cross"
            text="Close"
            onClick={()=>close(windowList.informationWindow)}
          />
          <Button
            intent="danger"
            icon="trash" 
            text="Delete"
            onClick={()=>removeParent(node)}
          />
        </div>
      </div>
    </div>
  );
}

export default SideWindow