import { create } from 'zustand'
import Tree from '../types/tree'
/*const initialTree = {
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
*/
const initialTree = {
  id: '1',
  name: "Jaroslaw",
  parents: [
      {
          id: '2',
          name: "Luyba",
          parents: [
              {
                  id: '4',
                  name: 'Lydmyla',
                  parents: [
                      {
                          id: '13',
                          name: "Manya",
                          parents: [],
                          siblings: []
                      },
                      {
                          id: '14',
                          name: "Ivan",
                          parents: [],
                          siblings: []
                      }
                  ],
                  siblings: [
                      {
                          id: '11',
                          name: "Valya",
                          parents: [
                              {
                                  id: '13',
                                  name: "Manya",
                                  parents: [],
                                  siblings: []
                              },
                              {
                                  id: '14',
                                  name: "Ivan",
                                  parents: [],
                                  siblings: []
                              }
                          ],
                          siblings: []
                      },
                      {
                          id: '15',
                          name: "Nelya",
                          parents: [
                              {
                                  id: '13',
                                  name: "Manya",
                                  parents: [],
                                  siblings: []
                              },
                              {
                                  id: '14',
                                  name: "Ivan",
                                  parents: [],
                                  siblings: []
                              }
                          ],
                          siblings: []
                      },
                      {
                          id: '16',
                          name: "Viktor",
                          parents: [
                              {
                                  id: '13',
                                  name: "Manya",
                                  parents: [],
                                  siblings: []
                              },
                              {
                                  id: '14',
                                  name: "Ivan",
                                  parents: [],
                                  siblings: []
                              }
                          ],
                          siblings: []
                      }
                  ]
              },
              {
                  id: '5',
                  name: 'Mykola',
                  parents: [
                    {
                      id:'18',
                      name:"Ivan",
                      parents:[],
                      siblings:[]
                    }
                  ],
                  siblings: [
                    {
                      id:'19',
                      name:"Olya",
                      parents: [
                        {
                          id:'18',
                          name:"Ivan",
                          parents:[],
                          siblings:[]
                        }
                      ],
                      siblings:[]
                    },
                  ]
              }
          ],
          siblings: []
      },
      {
          id: '3',
          name: "Sergiy",
          parents: [
              {
                  id: '6',
                  name: 'Vera',
                  parents: [],
                  siblings: []
              },
              {
                  id: '7',
                  name: 'Vasyl',
                  parents: [],
                  siblings: []
              }
          ],
          siblings: [
              {
                  id: '8',
                  name: "Volodymyr",
                  parents: [
                      {
                          id: '6',
                          name: 'Vera',
                          parents: [],
                          siblings: []
                      },
                      {
                          id: '7',
                          name: 'Vasyl',
                          parents: [],
                          siblings: []
                      }
                  ],
                  siblings: []
              }
          ]
      }
  ],
  siblings: []
};
const useTreeStore = create((set) => ({
    tree: initialTree,
    node: null,
    addNewNode: (childNode, newNode) => set((state) => {
        const newTree = new Tree(state.tree);
        newTree.addParentToChild(childNode.id, newNode);
        return { tree: newTree.root };
    }),
    addSibling: (childNode, newNode) => set((state) => {
      const newTree = new Tree(state.tree);
      newTree.addSiblingToChild(childNode.id, newNode);
      return { tree: newTree.root };
    }),
    removeSibling: (sibling) => set((state) => {
      const newTree = new Tree(state.tree);
      newTree.removeSibling(sibling.id);
      return { tree: newTree.root };
    }),
    removeNode: (parent) => set((state)=>{
      const newTree = new Tree(state.tree);
      newTree.removeParentFromNode(parent.id);
      return { tree: newTree.root };
    }),
    changeNode: (nodeId, node) => set((state)=>{
      const newTree = new Tree(state.tree);
      newTree.changeData(nodeId, node);
      return { tree: newTree.root };
    }),
    deleteTree: () => set(()=>({

    })),
    setNode: (settedNode) => set(()=>({
      node: settedNode
    }))

}))

export default useTreeStore