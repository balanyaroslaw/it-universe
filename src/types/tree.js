import Node from "./node";
class Tree{
    constructor(tree){
        this.root = this.convert(tree)
    }

    convert(node) {
        if (!node) return null; 
    
        const newNode = new Node(node.id, node.name);
    
        if (node.parents && Array.isArray(node.parents)) {
          newNode.parents = node.parents.map((parent) => this.convert(parent)); 
        }
    
        return newNode; 
    }

    traverse(node, targetId) {
        if (!node) return null; 
    
        if (node.id == targetId) {
          return node;
        }
    
        if (node.parents && node.parents.length > 0) {
          for (const parent of node.parents) {
            const foundNode = this.traverse(parent, targetId); 
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
    
}

export default Tree;