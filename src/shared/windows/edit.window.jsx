import React, { useEffect, useState } from "react";
import { Button, Dialog, FormGroup, InputGroup } from "@blueprintjs/core";
import useModalStore from "../../store/modal.store";
import useTreeStore from "../../store/tree.store";
import Node from "../../types/node";
import { windowList } from "../keys/windowList";
import { User, Calendar,MapPinHouse, X} from "lucide-react";
import { v4 as uuid } from 'uuid'
const EditDetailsModal = ({ isOpen, onClose, onSubmit, node}) => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    secondName:"",
    birthDate: "",
    deathDate: "",
    birthPlace: "",
    deathPlace: "",
  });

  const close = useModalStore((state)=>state.close)
  const window = useModalStore((state)=>state.window)
  const member = useModalStore((state)=>state.member)
  const data = useTreeStore((state)=>state.node)
  const addNewNode = useTreeStore((state)=>state.addNewNode)
  const addSibling = useTreeStore((state)=>state.addSibling)
  const changeData = useTreeStore((state)=>state.changeNode)
  console.log(member)
  useEffect(() => {
    if (node) {
      setFormData({
        name: node.name || "",
        lastName: node.lastName || "",
        secondName:node.secondName || "",
        birthDate: node.birthDate || "",
        deathDate: node.deathDate || "",
        birthPlace: node.birthPlace || "",
        deathPlace: node.deathPlace || "",
      });
    }
  }, [node]);

  const handleChange = (e) => {
    e.preventDefault()
    changeData(node.id, formData)
    close(windowList.changeWindow);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(member==='parent'){
      const parentId = uuid()
      addNewNode(data, new Node(parentId, formData.name, formData.lastName));
    }
    else if(member==='sibling'){
      const siblingId = uuid()
      addSibling(data, new Node(siblingId, formData.name, formData.lastName));
    }
    close(windowList.addWindow);
  };


  return (
    isOpen&&
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        <div className={`flex items-center justify-between 
          ${member==='sibling'?'bg-purple-200':member==='parent'?'bg-pink-200':'bg-lime-200'} px-6 py-4`}>

          <h2 className="text-xl font-semibold text-black">
            {member==='sibling'?'Додати брата/сестру':
              member==='parent'?'Додати батька/мати'
              :'Змінити дані про предка'}</h2>
          <button 
            onClick={()=>close(windowList.changeWindow)}
            className="text-black p-1 rounded-full transition-colors hover:text-gray-500"
          >
            <X size={24}/>
          </button>
        </div>
        
        <div className="p-6">
          <form>
            <div className="space-y-4">
              <div className="pb-4 border-b border-gray-200">
                <div className="flex items-center gap-2 mb-3">
                  <User size={20} className="text-gray-300" />
                  <h3 className="font-medium text-gray-700">Особисті дані</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input 
                      type="text" 
                      placeholder="Ім'я" 
                      className="w-full rounded-lg border border-gray-300 px-4 py-2   outline-none transition-all" 
                      value={formData.name}
                      onChange={e=>setFormData(prev=>({...prev, name:e.target.value}))}
                    />
                  </div>
                  <div>
                    <input 
                      type="text" 
                      placeholder="Прізвище" 
                      className="w-full rounded-lg border border-gray-300 px-4 py-2   outline-none transition-all" 
                      value={formData.lastName}
                      onChange={e=>setFormData(prev=>({...prev, lastName:e.target.value}))}
                    />
                  </div>
                </div>
                
                <div className="mt-4">
                  <input 
                    type="text" 
                    placeholder="По-батькові" 
                    className="w-full rounded-lg border border-gray-300 px-4 py-2   outline-none transition-all"
                    value={formData.secondName}
                    onChange={e=>setFormData(prev=>({...prev, secondName:e.target.value}))}
                  />
                </div>
              </div>
              
              <div className="pb-4 border-b border-gray-200">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar size={20} className="text-gray-300" />
                  <h3 className="font-medium text-gray-700">Дата народження</h3>
                </div>
                
                <input 
                  type="date" 
                  className="w-full rounded-lg border border-gray-300 px-4 py-2   outline-none transition-all" 
                />
                
                <div className="mt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPinHouse size={20} className="text-gray-300" />
                    <span className="text-sm text-gray-600">Місце народження</span>
                  </div>
                  <input 
                    type="text" 
                    placeholder="Місце народження" 
                    className="w-full rounded-lg border border-gray-300 px-4 py-2   outline-none transition-all" 
                  />
                </div>
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Calendar size={20} className="text-gray-300" />
                  <h3 className="font-medium text-gray-700">Дата смерті</h3>
                </div>
                
                <input 
                  type="date" 
                  className="w-full rounded-lg border border-gray-300 px-4 py-2   outline-none transition-all" 
                />
                
                <div className="mt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPinHouse size={20} className="text-gray-300" />
                    <span className="text-sm text-gray-600">Місце смерті</span>
                  </div>
                  <input 
                    type="text" 
                    placeholder="Місце смерті" 
                    className="w-full rounded-lg border border-gray-300 px-4 py-2   outline-none transition-all" 
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end gap-3">
              <button 
                type="button" 
                onClick={()=>close(windowList.changeWindow)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Скасувати
              </button>
              <button 
                type="submit" 
                className={`
                  px-4 py-2 ${member==='sibling'?'bg-purple-300 hover:bg-purple-200':member==='parent'?'bg-pink-300 hover:bg-pink-200':'bg-lime-300 hover:bg-lime-200'} 
                  text-black rounded-lg transition-colors`}
                onClick={(e)=>{
                  if(window===windowList.addWindow){
                    handleSubmit(e)
                  }
                  else if(window===windowList.changeWindow){
                    handleChange(e)
                  }
                }}
              >
                Зберегти
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditDetailsModal ;
