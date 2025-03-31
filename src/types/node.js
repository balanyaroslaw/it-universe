import moment from "moment";
class Node {
    constructor(tree) {
        this.id = tree.id;
        this.familyTreeId = tree.family_tree_id;
        this.firstName = tree.first_name;
        this.lastName = tree.last_name;
        this.fatherName = tree.father_name;
        this.birthDate = tree.birth_date&&moment(tree.birth_date).format("DD-MM-YYYY");
        this.maidenName = tree.maiden_name;
        this.deathDate = tree.death_date;
        this.bio = tree.bio;
        this.isUser = tree.is_user;
        this.userId = tree.user_id;
        this.parents = tree.parents;
        this.siblings = tree.siblings;
        this.children = tree.children;
        this.img = tree.img;
        this.createdAt = tree.created_at;
        this.gender = tree.gender
        this.isRoot = null
    }

    addParent(parent) {
        if (this.parents.length < 2) {
            this.parents.push(parent);
            this.siblings.forEach(sibling => sibling.parents.push(parent));
        }
    }

    updateData(newData) {
        Object.keys(newData).forEach(key => {
            if (this.hasOwnProperty(key)) {
                this[key] = newData[key];
            }
        });
    }

    addSibling(sibling) {
        this.siblings.push(sibling);
        this.siblings.forEach(sib => sib.parents = [...this.parents]);
    }

    removeSibling(siblingId) {
        this.siblings = this.siblings.filter(sibling => sibling.id !== siblingId);
    }

    removeParent(parentId) {
        this.parents = this.parents.filter(parent => parent.id !== parentId);
        this.siblings.forEach(sibling => {
            sibling.parents = sibling.parents.filter(parent => parent.id !== parentId);
        });
    }
}

export default Node;