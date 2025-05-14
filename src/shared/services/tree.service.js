import httpService from "./http.service";

class TreeService{

    async getTree(treeId){
        try {
            const response = await httpService.get(`/tree/${treeId}`);
            const tree = response.data;
            if(tree){
                return tree
            }
        } catch (error) {
            console.log('Get Tree', error)
        }
    }

    async createTree(name){
        try {
            const response = await httpService.post('/tree', {name:name});
            const tree = response.data;
            if(tree){
                this.setTree(tree)
                return tree
            }
        } catch (error) {
            console.log('Create tree', error)
        }
    }

    async addParent(treeID, childID, parentData){
        try {
            if(treeID){
                const parent = {
                    first_name:parentData.firstName,
                    last_name:parentData.lastName,
                    father_name:parentData.fatherName,
                    maiden_name:parentData.maidenName||null,
                    gender:parentData.gender,
                    birth_date:parentData.birthDate||null,
                    children:[childID],
                    
                }
                await httpService.post(`tree/${treeID}`,parent,
                {
                    'Content-Type': 'multipart/form-data'
                });
            }
        } catch (error) {
            console.log('Add parent', error)
        }
    }

    async addSibling(treeID, parents, siblingData){
        try {
            if(treeID){
                const sibling = {
                    first_name:siblingData.firstName,
                    last_name:siblingData.lastName,
                    father_name:siblingData.fatherName,
                    maiden_name:siblingData.maiden_name||null,
                    birth_date:siblingData.birthDate || null,
                    gender:siblingData.gender,
                    parents:[...parents],
                    
                }
                await httpService.post(`tree/${treeID}`,sibling,
                {
                    'Content-Type': 'multipart/form-data'
                });
            }
        } catch (error) {
            console.log('Add sibling', error)
        }
    }

    async addChild(treeID, parentId, childData){
        try {
            if(treeID){
                const child = {
                    first_name:childData.firstName,
                    last_name:childData.lastName,
                    father_name:childData.fatherName,
                    birth_date:childData.birthDate || null,
                    maiden_name:childData.maiden_name||null,
                    gender:childData.gender,
                    parents:[parentId],
                    
                }
                await httpService.post(`tree/${treeID}`, child,{
                    'Content-Type': 'multipart/form-data'
                });
            }
        } catch (error) {
            console.log('Add child', error)
        }
    }

    async removeNode(treeID, nodeId){
        try {
            if(treeID){
                await httpService.delete(`/tree/${treeID}/${nodeId}`);
            }
        } catch (error) {
            console.log('Delete node', error)
        }
    }

    async changeData(treeID, nodeId, data){
        console.log(nodeId)
        try {
            if(treeID){
                const newData = {
                    first_name:data.firstName,
                    last_name:data.lastName,
                    father_name:data.fatherName,
                    maiden_name:data.maidenName||null,
                    gender:data.gender,
                    birth_date:data.birthDate||null,
                }
                await httpService.patch(`tree/${treeID}/${nodeId}`,newData,
                {
                    'Content-Type': 'multipart/form-data'
                });

            }
        } catch (error) {
            console.log('Change data', error)
        }
    }

    setTree(treeId){
        localStorage.setItem('TREE_ID', treeId)
    }

    removeTree(){
        localStorage.removeItem('TREE_ID')
    }
}

const treeService = new TreeService();

export default treeService