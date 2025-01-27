
class Node{
    constructor(id, name, lastname, secondname, birthdate, deathdate, birthplace, deathplace, parents = []){
        this.id = id;
        this.name = name;
        this.lastname = lastname;
        this.secondname = secondname;
        this.birthdate = birthdate;
        this.deathdate = deathdate;
        this.birthplace = birthplace;
        this.deathplace = deathplace;
        this.parents = parents
    }

    addNode(parent){
        if(this.parents.length<2){
            this.parents.push(parent)
        }
        else return
    }
    
    removeNode(parentId){
        this.parents = this.parents.filter((parent)=>parent.id!==parentId)
    }
}

export default Node;