import React from 'react'
import { X, Trash} from "lucide-react";
import useModalStore from '../../store/modal.store';
import { windowList } from '../keys/windowList';
import useTreeStore from '../../store/tree.store';
import Man from '../../assets/man.png';
import Woman from '../../assets/woman.png'

function SideWindow({ node }) {
  const close = useModalStore((state) => state.close);
  const removeNode = useTreeStore((state) => state.removeNode);
  const [isConfirmingDelete, setIsConfirmingDelete] = React.useState(false);
  const [isUpdatingImage, setIsUpdatingImage] = useState(false);
  const handleDelete = async () => {
    if (isConfirmingDelete) {
      await removeNode(node.id);
      close(windowList.informationWindow);
    } else {
      setIsConfirmingDelete(true);
    }
  };
  
  return (
    <div className="absolute right-0 h-full w-1/4 bg-greenly z-10 flex flex-col justify-center animate-slideIn overflow-hidden border-4 border-[#CBE68B]">
      <div className="p-4 bg-greenly text-brown flex font-comfortaa items-center relative">
        <div className="absolute right-0">
          <button
            onClick={() => close(windowList.informationWindow)}
            className="text-tree hover:text-blue-200 transition-colors"
          >
            <X size={24}/>
          </button>
        </div>
        <h2 className="text-lg font-semibold mx-auto">Інформація</h2>
      </div>

      <div className="w-full bg-[#CBE68B] h-[2px]"></div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-2">
          <div className="flex items-center justify-center">
            <div className="w-[90px] h-[90px] border-4 border-[#CBE68B] rounded-full overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={!node.img ? (node.gender === 'female' ? Woman : Man) : node.img}
                alt=""
              />
            </div>
          </div>
          <h3 className="text-center text-md font-bold font-comfortaa text-brown">
            {node.firstName} <br /> {node.lastName}
          </h3>
        </div>

        <div className="w-full bg-[#CBE68B] h-[2px]"></div>

        <div className="flex flex-col bg-greenly p-2">
          <div className="flex flex-col">
            <span className="text-[#788951] font-comfortaa text-s">Ім'я</span>
            <span className="text-brown font-comfortaa text-md">{node.firstName || '-'}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[#788951] font-comfortaa text-s">Прізвище</span>
            <span className="text-brown font-comfortaa text-md">{node.lastName || '-'}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[#788951] font-comfortaa text-s">По-батькові</span>
            <span className="text-brown font-comfortaa text-md">{node.fatherName || '-'}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[#788951] font-comfortaa text-s">Дата народження</span>
            <span className="text-brown font-comfortaa text-md">{node.birthDate || '-'}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[#788951] font-comfortaa text-s">Місце народження</span>
            <span className="text-brown font-comfortaa text-md">{node.birthPlace || '-'}</span>
          </div>
        </div>

        {
          node.bio&&
          <div className="w-full bg-[#CBE68B] h-[2px]"></div>
        }

        {
          node.bio&&
          <div className="flex justify-center items-center p-3">
            <div className="flex w-[300px] h-[220px] bg-cream rounded-xl border-2 border-[#CBE68B] border-solid">
              {node.bio}
            </div>
          </div>
        }

      </div>
      
      <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-between">
        <button
          onClick={() => close(windowList.informationWindow)}
          className="px-4 py-2 border border-gray-300 bg-[#97B948] text-cream font-comfortaa rounded-md flex items-center gap-2"
        >
          <X className="w-5 h-5 text-cream" />
          Закрити
        </button>
        <button
          onClick={handleDelete}
          className={`px-4 py-2 rounded-md text-brown font-bold font-comfortaa flex items-center gap-2 transition ${
            isConfirmingDelete ? "bg-red-600 hover:bg-red-700" : "bg-cream border border-green"
          }`}
        >
          <Trash className="w-5 h-5" />
          {isConfirmingDelete ? "Підтвердити" : "Видалити"}
        </button>
      </div>
    </div>
  );
}

export default SideWindow