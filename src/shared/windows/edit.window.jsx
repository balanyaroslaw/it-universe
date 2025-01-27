import React, { useEffect, useState } from "react";
import { Button, Dialog, FormGroup, InputGroup } from "@blueprintjs/core";
import useModalStore from "../../store/modal.store";
import useTreeStore from "../../store/tree.store";
import Node from "../../types/node";
import { windowList } from "../keys/windowList";
const EditDetailsModal = ({ isOpen, onClose, onSubmit, node}) => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    birthDate: "",
    deathDate: "",
    birthPlace: "",
    deathPlace: "",
  });

  const close = useModalStore((state)=>state.close)
  const data = useTreeStore((state)=>state.node)
  const addNewNode = useTreeStore((state)=>state.addNewNode)

  useEffect(() => {
    if (node) {
      setFormData({
        name: node.name || "",
        lastName: node.lastName || "",
        birthDate: node.birthDate || "",
        deathDate: node.deathDate || "",
        birthPlace: node.birthPlace || "",
        deathPlace: node.deathPlace || "",
      });
    }
  }, [node]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = ({node}) => {
    addNewNode(data, new Node(Math.random(), formData.name, formData.lastName));
    close(windowList.addWindow);
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={()=>close(windowList.addWindow)}
      title={node?"Change details":"Add Details"}
      className="w-[50vw] max-h-[100vh]"
    >
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4">
          <FormGroup label="Name" labelFor="name-input">
            <InputGroup
              id="name-input"
              name="name"
              placeholder="Enter name"
              value={formData.name}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup label="Last Name" labelFor="lastName-input">
            <InputGroup
              id="lastName-input"
              name="lastName"
              placeholder="Enter last name"
              value={formData.lastName}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup label="Birth Date" labelFor="birthDate-input">
            <InputGroup
              id="birthDate-input"
              name="birthDate"
              type="date"
              value={formData.birthDate}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup label="Death Date" labelFor="deathDate-input">
            <InputGroup
              id="deathDate-input"
              name="deathDate"
              type="date"
              value={formData.deathDate}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup label="Birth Place" labelFor="birthPlace-input">
            <InputGroup
              id="birthPlace-input"
              name="birthPlace"
              placeholder="Enter birth place"
              value={formData.birthPlace}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup label="Death Place" labelFor="deathPlace-input">
            <InputGroup
              id="deathPlace-input"
              name="deathPlace"
              placeholder="Enter death place"
              value={formData.deathPlace}
              onChange={handleChange}
            />
          </FormGroup>
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <Button intent="danger" onClick={()=>node?close(windowList.changeWindow):close(windowList.addWindow)} text="Close"/>
          <Button intent="primary" onClick={handleSubmit} text={node?"Change":"Submit"}/>
        </div>
      </div>
    </Dialog>
  );
};

export default EditDetailsModal ;
