import React, { useEffect, useState } from 'react';
import Trees from '../assets/tree_bg.png';
import Family from '../assets/family.png';
import Rect1 from '../assets/curv_rect.png';
import Rect2 from '../assets/curv_rect_2.png';
import Search from '../assets/search.png';
import Photos from '../assets/photos.png';
import CreateWindow from '../shared/windows/create.window';
import Profile from '../shared/windows/profile.window';
import useModalStore from '../store/modal.store';
import { windowList } from '../shared/keys/windowList';
import userService from '../shared/services/user.service';
import { useNavigate } from 'react-router-dom';
import MainMenu from "../shared/components/menu.component";
import useTreeStore from "../store/tree.store";
function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const modalStatus = useModalStore((state) => state.isOpen);
  const window = useModalStore((state) => state.window);
  const isAuth = userService.isAuthenticated();
   const [tree, node] = [useTreeStore((state) => state.tree), useTreeStore((state) => state.node)];
  const getTree = useTreeStore((state)=>state.getTree);
  const navigate = useNavigate();

  const handleClick = () => {
    if (!!!localStorage.getItem('TREE_ID')) {
      if (!!localStorage.getItem('ACCESS_TOKEN')) {
        setShowModal(true);
      } else {
        navigate('/login');
      }
    } else {
      navigate('/tree');
    }
  };

  useEffect(()=>{
    const fetchTree = async (id)=>{
        await getTree(id);
    }
    if(!!localStorage.getItem('TREE_ID')){
      fetchTree(localStorage.getItem('TREE_ID'));
    }
    },[])

  return (
    <>
      <MainMenu/>
      <div className="h-full bg-cream flex flex-col items-center py-4 sm:py-8 md:py-12 overflow-hidden">
        {/* Hero Section */}
        <div className="relative w-full h-full flex flex-col">
          <div className="flex flex-col items-center space-y-4 sm:space-y-6 md:space-y-10 mt-4 sm:mt-6 md:mt-10 z-10 px-4">
            <div className="flex flex-col items-center">
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-brown text-center">Вас Вітає</h1>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-brown text-center">ANCTREE</h1>
            </div>
            <p className="text-brown text-center text-base sm:text-lg md:text-xl font-comfortaa w-full sm:w-[70%] md:w-[50%] z-10">
              створи унікальне родове дерево за лічені хвилини та збережи пам'ять про рід
            </p>
          </div>

          <div className="flex justify-center items-center w-full z-10 absolute top-[150%] sm:top-[160%] md:top-[160%] w-full px-4">
            <button
              className="w-full sm:w-[50%] md:w-[30%] py-2 sm:py-3 bg-tree shadow-[5px_5px_15px_3px_rgba(0,0,0,0.4)] sm:shadow-[10px_10px_30px_5px_rgba(0,0,0,0.4)] rounded-lg text-brown text-xl sm:text-2xl px-3 sm:px-5 font-bold text-center"
              onClick={() => handleClick()}
            >
              {!!!localStorage.getItem('TREE_ID') ? 'СТВОРИТИ ДЕРЕВО' : 'ВІДКРИТИ ДЕРЕВО'}
            </button>
          </div>

          <div className="absolute inset-0 top-[60%] z-0">
            <img src={Trees} alt="" className="w-full h-auto" />
          </div>
        </div>

        {/* Family Section */}
        <div className="relative w-full h-full flex flex-col md:flex-row items-center px-4 sm:px-6 md:px-10 mt-[25%] sm:mt-[20%] mb-[5%]">
          <div className="flex justify-center mt-5 z-10 w-full md:w-[40%]">
            <img
              src={Family}
              alt="Family tree illustration"
              className="w-[220px] sm:w-[300px] md:w-[530px] h-auto md:h-[650px]"
            />
          </div>
          <div className="flex flex-col gap-6 sm:gap-10 md:gap-20 mt-8 md:mt-0 md:ml-10 w-full md:w-[60%]">
            <h1 className="text-2xl sm:text-3xl md:text-6xl font-bold text-brown text-center md:text-right">
              Родове дерево - це історія
            </h1>
            <p className="text-brown text-base sm:text-lg md:text-xl text-center md:text-right font-comfortaa w-full">
              Кожна сім'я – це вічний зв'язок між тими, хто був, є і буде, але з часом спогади зникають,
              а документи втрачаються. У складні часи війни, коли щезають цілі населені пункти та розсіюються сім'ї,
              важливо берегти свою родинну пам'ять. Збереження історії роду – це не лише про минуле, а й про наше майбутнє.
            </p>
          </div>
          <div className="absolute inset-0 top-[90%]">
            <img src={Rect1} alt="" className="w-[120%]" />
          </div>
        </div>

        {/* Search Section */}
        <div className="relative w-full h-full flex flex-col-reverse md:flex-row items-center px-4 sm:px-6 md:px-10 mb-[5%]">
          <div className="flex flex-col gap-6 sm:gap-10 md:gap-20 mt-8 md:mt-0 w-full md:w-[60%]">
            <h1 className="text-2xl sm:text-3xl md:text-6xl font-bold text-brown text-center md:text-left">
              Знаходь свою родину
            </h1>
            <p className="text-brown text-base sm:text-lg md:text-xl text-center md:text-left font-comfortaa w-full">
              Сучасні технології відкривають нові можливості для пошуку рідних. Завдяки AncTree ти можеш віднайти родичів,
              про яких раніше навіть не підозрював, з'єднати загублені гілки родового дерева та дізнатися більше про своє походження.
              Можливо, саме зараз хтось шукає тебе.
            </p>
          </div>
          <div className="flex justify-center mt-5 z-10 w-full md:w-[40%]">
            <img
              src={Search}
              alt="Search illustration"
              className="w-[220px] sm:w-[300px] md:w-[540px] h-auto md:h-[540px]"
            />
          </div>
          <div className="absolute inset-0 top-[70%]">
            <img src={Rect2} alt="" className="w-[120%]" />
          </div>
        </div>

        {/* Photos Section */}
        <div className="relative w-full h-full flex flex-col mb-[25%]">
          <div className="flex flex-col items-center space-y-4 sm:space-y-6 md:space-y-10 mt-5 z-10 px-4">
            <div className="flex justify-center items-center">
              <img src={Photos} alt="" className="w-[70%] sm:w-[60%] md:w-[50%] h-auto" />
            </div>
            <h1 className="text-brown text-center font-bold text-2xl sm:text-3xl md:text-5xl w-full sm:w-[80%] md:w-[60%] mt-4 sm:mt-6 md:mt-10 mb-4 sm:mb-6 md:mb-10">
              Шукай, знаходь, об'єднуй – твоя сім'я ближче, ніж здається
            </h1>
          </div>

          <div className="flex justify-center items-center w-full z-20 absolute top-[130%] sm:top-[140%] md:top-[150%] w-full px-4">
            <button
              className="w-full sm:w-[50%] md:w-[30%] py-2 sm:py-3 bg-tree shadow-[5px_5px_15px_3px_rgba(0,0,0,0.4)] sm:shadow-[10px_10px_30px_5px_rgba(0,0,0,0.4)] rounded-lg text-brown text-xl sm:text-2xl px-3 sm:px-5 font-bold text-center"
              onClick={() => handleClick()}
            >
              {!!!localStorage.getItem('TREE_ID') ? 'СТВОРИТИ ДЕРЕВО' : 'ВІДКРИТИ ДЕРЕВО'}
            </button>
          </div>

          <div className="absolute inset-0 top-[80%] z-0">
            <img src={Trees} alt="" className="w-full h-auto" />
          </div>
          <div className="absolute h-[200px] inset-0 top-[150%] z-0 bg-[#B1CF66]"></div>
        </div>

        {/* Modals */}
        <CreateWindow isOpen={showModal} close={setShowModal} />
        {!!localStorage.getItem('TREE_ID') && modalStatus && window === windowList.profileWindow && isAuth && <Profile />}
      </div>
    </>
  );
}

export default Dashboard;