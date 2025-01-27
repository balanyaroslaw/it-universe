
import React, { useMemo, useState, useRef, useEffect } from "react";
import TreeComponent from "../shared/components/tree.component";
import NodeComponent from "../shared/components/node.component";
import { useStore } from "zustand";
import useTreeStore from "../store/tree.store";
import SideWindow from "../shared/windows/sidewindow/sidewindow.component";
import EditDetailsModal from "../shared/windows/edit.window"
import Tree from "../types/tree";
import Node from "../types/node";
import useModalStore from "../store/modal.store";
import { windowList } from "../shared/keys/windowList";


function TreeBoard() {
  const [tree, node] = [useTreeStore((state) => state.tree), useTreeStore((state) => state.node)];
  const modalStatus = useModalStore((state)=>state.isOpen)
  const window = useModalStore((state)=>state.window)
  console.log(node)
   return(
    <div className="relative w-100 h-100">
      {modalStatus&&window===windowList.addWindow&&<div className="absolute w-full h-full bg-black opacity-50 flex justify-center items-center z-20">
        <EditDetailsModal isOpen={modalStatus}/>
      </div>}
      {node&&modalStatus&&window===windowList.changeWindow&&<div className="absolute w-full h-full bg-black opacity-50 flex justify-center items-center z-20">
        <EditDetailsModal isOpen={modalStatus} node={node}/>
      </div>}
      <div className="relative w-100 h-100 flex z-0">
        <TreeComponent 
          node={{width:150, height:140}}
          data = {tree}
          CustomComponent={NodeComponent}
          start={{x:700, y:200}}
          nodeSpacing={100}
          levelSpacing={200}
        />
        {node && window === windowList.informationWindow && modalStatus && (
            <SideWindow isOpen={modalStatus} node={node} />
        )}
      </div>
    </div>
   )
}

export default TreeBoard