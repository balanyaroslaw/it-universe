import React, { useEffect, useState } from "react";
import useModalStore from "../../store/modal.store";
import useTreeStore from "../../store/tree.store";
import Node from "../../types/node";
import { windowList } from "../keys/windowList";
import { User, Calendar,MapPinHouse, X, VenusAndMars} from "lucide-react";
import { v4 as uuid } from 'uuid'
const EditDetailsModal = ({ isOpen, onClose, onSubmit, node}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    fatherName:"",
    birthDate: "",
    deathDate: "",
    birthPlace: "",
    deathPlace: "",
    gender:"",
    maidenName:""
  });

  const close = useModalStore((state)=>state.close)
  const window = useModalStore((state)=>state.window)
  const member = useModalStore((state)=>state.member)
  const data = useTreeStore((state)=>state.node)
  const addNewNode = useTreeStore((state)=>state.addNewNode)
  const addSibling = useTreeStore((state)=>state.addSibling)
  const changeData = useTreeStore((state)=>state.changeNode)
  const getTree = useTreeStore((state)=>state.getTree)
  useEffect(() => {
    if (node) {
      setFormData({
        firstName: node.firstName || "",
        lastName: node.lastName || "",
        fatherName:node.fatherName || "",
        maidenName:node.maidenName || "",
        birthDate: node.birthDate || "",
        deathDate: node.deathDate || "",
        birthPlace: node.birthPlace || "",
        deathPlace: node.deathPlace || "",
        gender:node.gender || ""
      });
    }
  }, [node]);

  const handleChange = (e) => {
    e.preventDefault();

    const jointData = {
      firstName:formData.firstName,
      lastName:formData.lastName,
      fatherName:formData.fatherName,
      maidenName:formData.maidenName,
      gender:formData.gender,
      birthDate:formData.birthDate&&new Date(formData.birthDate).toISOString()
    }

    changeData(node.id, jointData);

    close(windowList.changeWindow);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jointData = {
      firstName:formData.firstName,
      lastName:formData.lastName,
      fatherName:formData.fatherName,
      maidenName:formData.maidenName,
      gender:formData.gender,
      birthDate:formData.birthDate&&new Date(formData.birthDate).toISOString()
    }

    if(member==='parent'){
      console.log(data.id)
      await addNewNode(data,jointData);
    }
    else if(member==='sibling'){
      console.log(data.id);
      const error = addSibling(data.id, jointData);
    }
    close(windowList.addWindow);
  };
  return (
    isOpen&&
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md mx-4 overflow-hidden flex flex-col max-h-[90vh]">
        <div className={`flex items-center justify-between 
          ${member==='sibling'?'bg-purple-200':
            member==='parent'?'bg-pink-200':
            member==='child'?'bg-blue-200':'bg-lime-200'} px-6 py-4`}>

          <h2 className="text-xl font-semibold text-black">
            {member==='sibling'?'Додати брата/сестру':
              member==='parent'?'Додати батька/мати':
              member==='child'?'Додати дітей'
              :'Змінити дані про предка'}</h2>
          <button 
            onClick={()=>close(windowList.changeWindow)}
            className="text-black p-1 rounded-full transition-colors hover:text-gray-500"
          >
            <X size={24}/>
          </button>
        </div>
        
        <div className="flex-grow overflow-y-auto p-6">
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
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition-all" 
                      value={formData.firstName}
                      onChange={e=>setFormData(prev=>({...prev, firstName:e.target.value}))}
                    />
                  </div>
                  <div>
                    <input 
                      type="text" 
                      placeholder="Прізвище" 
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition-all" 
                      value={formData.lastName}
                      onChange={e=>setFormData(prev=>({...prev, lastName:e.target.value}))}
                    />
                  </div>
                </div>
                
                <div className="mt-4">
                  <input 
                    type="text" 
                    placeholder="По-батькові" 
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition-all"
                    value={formData.fatherName}
                    onChange={e=>setFormData(prev=>({...prev, fatherName:e.target.value}))}
                  />
                </div>

                <div className="mt-4 flex items-center justify-center">
                  <div className="flex items-center gap-2 mr-2 justify-center">
                    <VenusAndMars size={20} className="text-gray-300" />
                    <span className="font-medium text-gray-600">Стать</span>
                  </div>
                  <select 
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition-all bg-white text-gray-600"
                    onChange={(e)=>setFormData(prev=>({...prev, gender:e.target.value}))}
                    value={formData.gender||'Оберіть стать'}
                  >
                    <option value='select'>Оберіть стать</option>
                    <option value="male">Чоловік</option>
                    <option value="female">Жінка</option>
                  </select>
                </div>

                {formData.gender==='female'&&<div className="mt-4">
                  <input 
                    type="text" 
                    placeholder="Дівоче прізвище" 
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition-all"
                    value={formData.maidenName}
                    onChange={e=>setFormData(prev=>({...prev, maidenName:e.target.value}))}
                  />
                </div>}
              </div>
              
              <div className="pb-4 border-b border-gray-200">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar size={20} className="text-gray-300" />
                  <h3 className="font-medium text-gray-700">Дата народження</h3>
                </div>
                
                <input 
                  type="date" 
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition-all"
                  value={formData.birthDate}
                  onChange={e=>setFormData(prev=>({...prev, birthDate:e.target.value}))} 
                />
                
                <div className="mt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPinHouse size={20} className="text-gray-300" />
                    <span className="text-sm text-gray-600">Місце народження</span>
                  </div>
                  <input 
                    type="text" 
                    placeholder="Місце народження" 
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition-all" 
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
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition-all" 
                />
                
                <div className="mt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPinHouse size={20} className="text-gray-300" />
                    <span className="text-sm text-gray-600">Місце смерті</span>
                  </div>
                  <input 
                    type="text" 
                    placeholder="Місце смерті" 
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition-all" 
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
        
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex justify-end gap-3">
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
                px-4 py-2 ${member==='sibling'?'bg-purple-300 hover:bg-purple-200':
                            member==='parent'?'bg-pink-300 hover:bg-pink-200':
                            member==='child'?'bg-blue-300 hover:bg-blue-200':'bg-lime-300 hover:bg-lime-200'} 
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
        </div>
      </div>
    </div>
  );
};

export default EditDetailsModal ;
