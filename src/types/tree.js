import { th } from "framer-motion/client";
import Node from "./node";
class Tree{
    constructor(tree){
      this.index = 0;
      this.root = this.convert(tree)
    }

    convert(node) {
        if (!node) return null; 
        const newNode = new Node(node);
        newNode.isRoot = this.index === 0; 
    
        this.index++; 
        if (node.parents && Array.isArray(node.parents)) {
          newNode.parents = node.parents.map((parent) => this.convert(parent)); 
        }

        if (node.siblings && Array.isArray(node.siblings)) {
          newNode.siblings = node.siblings.map((sibling) => this.convert(sibling)); 
        }

        this.index++
    
        return newNode; 
    }

    traverse(node, targetId) {
      if (!node) return null;
    
      if (node.id === targetId) {
        return node;
      }
    
      if (node.parents && node.parents.length > 0) {
        for (const parent of node.parents) {
          const foundNode = this.traverse(parent, targetId);
          if (foundNode) return foundNode;
        }
      }
    
      if (node.siblings && node.siblings.length > 0) {
        for (const sibling of node.siblings) {
          const foundNode = this.traverse(sibling, targetId);
          if (foundNode) return foundNode;
        }
      }
    
      return null;
    }
    

    findChildByParentId(parentId) {
      const findChild = (node) => {
        if (node.parents && node.parents.some(parent => parent.id === parentId)) {
          return node.id; 
        }
        
        if (node.parents && node.parents.length > 0) {
          for (let child of node.parents) {
            const childId = findChild(child);
            if (childId) return childId;
          }
        }
    
        return null; 
      };
    
      return findChild(this.root); 
    }
    
    addParentToChild(childNodeId, parent){
        const childNode = this.traverse(this.root, childNodeId)

        if(childNode){
            childNode.addNode(parent);
        }
        console.log(this.root)
        return this.root;
    }

    addSiblingToChild(childNodeId, sibling){
      const childNode = this.traverse(this.root, childNodeId)

      if(childNode){
          childNode.addSibling(sibling);
      }
      console.log(this.root)
      return this.root;
    }

    removeParentFromNode(parentId){
      const childNodeId = this.findChildByParentId(parentId);
      const childNode = this.traverse(this.root, childNodeId)
      console.log(parentId + "  " + childNodeId)
      if(childNode){
          childNode.removeNode(parentId)
      }

      return this.root;
    }


    findSiblingBySiblingId(siblingId) {
      const findSibling = (node) => {
          if (node.siblings && node.siblings.some(sibling => sibling.id === siblingId)) {
              return node;
          }
  
          if (node.parents && node.parents.length !== 0) {
              for (let parent of node.parents) {
                  const result = findSibling(parent);
                  if (result) return result; 
              }
          }
  
          return null; 
      };
  
      return findSibling(this.root);
    }

    removeSibling(siblingId) {
      const sibling = this.findSiblingBySiblingId(siblingId)
      const node = this.traverse(this.root, sibling.id);
      if(node){
        node.removeSibling(siblingId)
      }
  
      return this.root;
    }

    changeData(id, nodeData){
      const node = this.traverse(this.root, id); 

      if(node){
        node.changeData(nodeData);
      }

      return this.root
    }
    
}

export default Tree;