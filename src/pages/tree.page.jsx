
import React, { useMemo, useState, useRef, useEffect } from "react";
import TreeComponent from "../shared/components/tree.component";
import NodeComponent from "../shared/components/node.component";
import { useStore } from "zustand";
import useTreeStore from "../store/tree.store";
import SideWindow from "../shared/windows/sidewindow.component";
import MemberWindow from "../shared/windows/member.window";
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
      <div className="relative w-100 h-100 flex z-0">
        <TreeComponent 
          node={{width:150, height:140}}
          data = {tree}
          CustomComponent={NodeComponent}
          start={{x:850, y:200}}
          nodeSpacing={100}
          levelSpacing={200}
        />
        {node && window === windowList.informationWindow && modalStatus && (
            <SideWindow isOpen={modalStatus} node={node} />
        )}
        {node && window === windowList.memberWindow && modalStatus && (
            <MemberWindow isOpen={modalStatus} node={node} />
        )}
        {node && window === windowList.changeWindow && modalStatus && (
            <EditDetailsModal isOpen={modalStatus} node={node}/>
        )}
        {node && window === windowList.addWindow && modalStatus && (
            <EditDetailsModal isOpen={modalStatus}/>
        )}
      </div>
    </div>
   )
}

export default TreeBoard