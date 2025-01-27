import { create } from 'zustand'
import Tree from '../types/tree'
const initialTree = {
    id: "1",
    name: "You",
    parents: [
      {
        id: "2",
        name: "Parent 1",
        parents: [
          {
            id: "4",
            name: "Grandparent 1",
            parents: [
              {
                id: "8",
                name: "Great-Grandparent 1",
                parents: [],
              },
              {
                id: "9",
                name: "Great-Grandparent 2",
                parents: [],
              },
            ],
          },
          {
            id: "5",
            name: "Grandparent 2",
            parents: [
              {
                id: "10",
                name: "Great-Grandparent 3",
                parents: [],
              },
              {
                id: "11",
                name: "Great-Grandparent 4",
                parents: [],
              },
            ],
          },
        ],
      },
      {
        id: "3",
        name: "Parent 2",
        parents: [
          {
            id: "6",
            name: "Grandparent 3",
            parents: [
              {
                id: "12",
                name: "Great-Grandparent 5",
                parents: [],
              },
              {
                id: "13",
                name: "Great-Grandparent 6",
                parents: [],
              },
            ],
          },
          {
            id: "7",
            name: "Grandparent 4",
            parents: [
              {
                id: "14",
                name: "Great-Grandparent 7",
                parents: [],
              },
              {
                id: "15",
                name: "Great-Grandparent 8",
                parents: [],
              },
            ],
          },
        ],
      },
    ],
  }

const useTreeStore = create((set) => ({
    tree: initialTree,
    node: null,
    addNewNode: (childNode, newNode) => set((state) => {
        const newTree = new Tree(state.tree);
        newTree.addParentToChild(childNode.id, newNode);
        return { tree: newTree.root };
    }),
    removeNode: (parent) => set((state)=>{
      const newTree = new Tree(state.tree);
      newTree.removeParentFromNode(parent.id);
      return { tree: newTree.root };
    }),
    changeNode: (nodeId, node) => set(()=>({

    })),
    deleteTree: () => set(()=>({

    })),
    setNode: (settedNode) => set(()=>({
      node: settedNode
    }))

}))

export default useTreeStore