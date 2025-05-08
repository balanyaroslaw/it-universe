import React, { useState } from 'react'
import treeService from '../services/tree.service'
import useTreeStore from '../../store/tree.store';
import { windowList } from '../keys/windowList';
import useModalStore from '../../store/modal.store';

function CreateWindow({isOpen,close}) {
    const [name, setName] = useState("");
    const [error, setError] = useState();
    const modalClose = useModalStore((state)=>state.close)
    const setId = useTreeStore((state)=>state.setId);
    const handleCreateTree = async () => {
        if (!name.trim()) {
            return setError("Введіть назву дерева");
        }
    
        try {
            const tree = await treeService.createTree(name);
            
            if (tree?.id) {
                setId(tree.id);
                console.log(tree);
                if(close){
                    close(false); 
                }
                else{
                    modalClose(windowList.createTree)
                }
            } else {
                setError("Не вдалося створити дерево");
            }
        } catch (err) {
            setError("Сталася помилка при створенні дерева");
        }
    };

    return (
        isOpen&&
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-greenly rounded-lg p-8 max-w-md w-full">
                <h3 className="text-xl font-semibold mb-4 text-brown font-bold font-outfit">Створити нове родове дерево?</h3>
                <p className="text-[#788951] mb-6 font-comfortaa">Почни з себе або іншого члена родини як кореня твого дерева</p>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-[#788951] mb-1">Назва дерева</label>
                        <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md font-comfortaa text-brown" placeholder="Моє родинне дерево" 
                        onChange={(e)=>setName(e.target.value)}
                        value={name}/>
                    </div>
                    <span className='mt-1 text-red-500'>{error}</span>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                    <button 
                    onClick={() => {
                        if(close){
                            close(false)
                        }
                        else{
                            modalClose(windowList.createTree)
                        }
                    }} 
                    className="px-4 py-2 bg-cream border-2 border-tree rounded-md text-brown font-bold"
                    >
                        Скасувати
                    </button>
                    <button className="px-4 py-2 bg-[#97B948] text-cream rounded-md font-bold"
                    onClick={()=>handleCreateTree()}>
                        Створити
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreateWindow