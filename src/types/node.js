import { th } from "framer-motion/client";

class Node{
    constructor(id, name, lastname, secondname, birthdate, deathdate, birthplace, deathplace, parents = [], siblings=[]){
        this.id = id;
        this.name = name;
        this.lastname = lastname;
        this.secondname = secondname;
        this.birthdate = birthdate;
        this.deathdate = deathdate;
        this.birthplace = birthplace;
        this.deathplace = deathplace;
        this.parents = parents
        this.siblings = siblings
    }

    addNode(parent){
        if(this.parents.length<2){
            this.parents.push(parent)
            if (this.siblings.length !== 0) {
                console.log(this.siblings);
                this.siblings.forEach(sibling => sibling.parents.push(parent));
            }            
        }
        else return
    }

    changeData(node) {
        this.name = node.name;
        this.lastname = node.lastname;
        this.secondname = node.secondname;
        this.birthdate = node.birthdate;
        this.deathdate = node.deathdate;
        this.birthplace = node.birthplace;
        this.deathplace = node.deathplace;
        
        if (Array.isArray(node.parents)) this.parents = node.parents;
        if (Array.isArray(node.siblings)) this.siblings = node.siblings;
    }  

    addSibling(sibling){
        this.siblings.push(sibling)
        this.siblings.map(sibling=>sibling.parents=[...this.parents])
    }

    removeSibling(siblingId){
        this.siblings = this.siblings.filter((sibling)=>sibling.id!==siblingId)
        console.log(this.siblings)
    }
    
    removeNode(parentId){
        this.parents = this.parents.filter((parent)=>parent.id!==parentId)
        this.siblings.forEach((sibling) => {
            sibling.parents = sibling.parents.filter((parent) => parent.id !== parentId);
        });
    }
}

export default Node;