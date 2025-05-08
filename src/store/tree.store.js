import { create } from 'zustand'
import Tree from '../types/tree'
import treeService from '../shared/services/tree.service';
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
const treeId = localStorage.getItem('TREE_ID');
const treeExist = !!localStorage.getItem('TREE_ID');
const useTreeStore = create((set) => ({
    tree: null,
    treeId:null,
    node: null,
    loading:null,


    getTree: async (id) => {
      if(id){
        const newTree = await treeService.getTree(id);
        if (newTree) {
            const convertedTree = new Tree(newTree);
            set({ tree: convertedTree.root }); 
            return convertedTree
        }
      }
    },


    addParent: (childNode, newNode) => set((state) => {
      state.loading = true;
    
      (async () => {
        if (treeExist) {
          await treeService.addParent(treeId, childNode.id, newNode);
          const tree = await state.getTree();
          if(tree){
            set({ loading: false }); 
          }
        }
      })();

      return state.tree
    }),



    addChild: (parentNode, newNode) => set((state) => {
      state.loading = true;
    
      (async () => {
        if (treeExist) {
          await treeService.addChild(treeId, parentNode.id, newNode);
          const tree = await state.getTree();
          if(tree){
            set({ loading: false }); 
          }
        }
      })();

      return state.tree
    }),


    addSibling: (childId, newNode) => set((state) => {
      state.loading = true;

      const newTree = new Tree(state.tree);
      const childNode = newTree.traverse(newTree.root, childId);

      if(!childNode?.parents && childNode?.parents.length<2){
        const error = "У вас не вказані батьки"
        return error
      }

      (async()=>{
        const parentsId = childNode?.parents.map(parent=>parent.id);
        if(treeExist && parentsId.length>1){
          await treeService.addSibling(treeId, parentsId, newNode);
          const tree = await state.getTree();

          if(tree){
            set({ loading: false }); 
          }
        }
        
      })()

      return state.tree
    }),

    
    removeNode: async (nodeId) => set(async (state)=> {
      state.loading = true;

      (async()=>{
        if(treeExist && nodeId){
          await treeService.removeNode(treeId, nodeId);
          const tree = await state.getTree();
          if(tree){
            set({ loading: false }); 
          }
        }
      })()

      return state.tree
    }),


    changeNode: (nodeId, node) => set((state)=>{
      state.loading = true;

      (async()=>{
        await treeService.changeData(treeId, nodeId, node);
        const tree = await state.getTree();
        if(tree){
          set({ loading: false }); 
        }
      })();

      return state.tree
    }),


    deleteTree: () => set(()=>({

    })),


    setNode: (settedNode) => set(()=>({
      node: settedNode
    })),

    
    setId: (id) => set(()=>({
      treeId: id
    }))

}))

export default useTreeStore