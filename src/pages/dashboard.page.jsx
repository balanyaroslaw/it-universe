import React, { useState } from 'react';
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
function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const modalStatus = useModalStore((state)=>state.isOpen)
  const window = useModalStore((state)=>state.window)
  const isAuth  = userService.isAuthenticated();
  const navigate = useNavigate();

  const handleClick = () => {
    if(!!!localStorage.getItem('TREE_ID')){
      if(!!localStorage.getItem('ACCESS_TOKEN')){
        setShowModal(true);
      }
      else{
        navigate('/login')
      }
    }
  }
  
  return (
    <>
     <div className="h-full bg-cream flex flex-col items-center py-12">
      <div className="relative w-full h-full flex flex-col">
        <div className="flex flex-col items-center space-y-10 mt-10 z-10">
          <div className="flex flex-col">
            <h1 className="text-7xl font-bold text-brown">Вас Вітає</h1>
            <h1 className="text-7xl font-bold text-brown">ANCTREE</h1>
          </div>
          <p className="text-brown text-center text-xl font-comfortaa w-[50%] z-10"> Створи унікальне родове дерево за лічені хвилини та Збережи пам’ять про рід </p>
        </div>

        <div className="flex justify-center items-center w-full z-10 absolute top-[160%] w-full">
          <button className="w-[30%] py-3 bg-tree shadow-[10px_10px_30px_5px_rgba(0,0,0,0.4)] rounded-lg text-brown text-2xl px-5 font-bold text-center"
            onClick={() => handleClick()}>
            {!!!localStorage.getItem('TREE_ID')?'СТВОРИТИ ДЕРЕВО':'ВІДКРИТИ ДЕРЕВО'}
          </button>
        </div>

        <div className="absolute inset-0 top-[60%] z-0">
          <img src={Trees} alt="" />
        </div>
      </div>

      <div className="relative w-full h-full flex items-center px-10 mt-[20%] mb-[5%]">
        <div className="flex justify-center mt-5 z-10">
          <img src={Family} alt="Family tree illustration" className="w-[300px] md:w-[530px] h-auto md:h-[650px]" />
        </div>
        <div className="flex flex-col gap-20 mt-8 md:mt-0 md:ml-10 w-[60%]">
          <h1 className="text-3xl md:text-6xl font-bold text-brown text-right">
            Родове дерево - це історія
          </h1>
          <p className="text-brown text-xl text-right font-comfortaa w-full">
            Кожна сім’я – це вічний зв’язок між тими, хто був, є і буде, але з часом спогади зникають,
            а документи втрачаються. У складні часи війни, коли щезають цілі населені пункти та розсіюються сім’ї, 
            важливо берегти свою родинну пам’ять. Збереження історії роду – це не лише про минуле, а й про наше майбутнє.
          </p>
        </div>
        <div className="absolute inset-0 top-[90%]">
          <img src={Rect1} alt="" className='w-[120%]'/>
        </div>
      </div>

      <div className="relative w-full h-full flex items-center px-10 mb-[5%]">
        <div className="flex flex-col gap-20 mt-8 md:mt-0 md:ml-10 w-[60%]">
          <h1 className="text-3xl md:text-6xl font-bold text-brown text-left">
            Знаходь свою родину
          </h1>
          <p className="text-brown text-xl text-left font-comfortaa w-full">
            Сучасні технології відкривають нові можливості для пошуку рідних. Завдяки AncTree ти можеш віднайти родичів, 
            про яких раніше навіть не підозрював, з’єднати загублені гілки родового дерева та дізнатися більше про своє походження. 
            Можливо, саме зараз хтось шукає тебе.
          </p>
        </div>
        <div className="flex justify-center mt-5 z-10">
          <img src={Search} alt="Family tree illustration" className="w-[300px] md:w-[540px] h-auto md:h-[540px]" />
        </div>
        <div className="absolute inset-0 top-[70%]">
          <img src={Rect2} alt="" className='w-[120%]'/>
        </div>
      </div>

      <div className="relative w-full h-full flex flex-col mb-[25%]">
        <div className="flex flex-col items-center space-y-10 mt-5 z-10">
          <div className="flex justify-center items-center">
            <img src={Photos} alt="" className="w-[50%] h-[35%]" />
          </div>
          <h1 className="text-brown text-center font-bold text-5xl w-[60%] mt-10 mb-10">
            Шукай, знаходь, об’єднуй – твоя сім’я ближче, ніж здається
          </h1>
        </div>

        <div className="flex justify-center items-center w-full z-20 absolute top-[150%] w-full">
          <button className="w-[30%] py-3 bg-tree shadow-[10px_10px_30px_5px_rgba(0,0,0,0.4)] rounded-lg text-brown text-2xl px-5 font-bold text-center"
            onClick={() => handleClick()}>
            {!!!localStorage.getItem('TREE_ID')?'СТВОРИТИ ДЕРЕВО':'ВІДКРИТИ ДЕРЕВО'}
          </button>
        </div>

        <div className="absolute inset-0 top-[80%] z-0">
          <img src={Trees} alt="" className="w-full h-auto" />
        </div>
        <div className="absolute h-[200px] inset-0 top-[150%] z-0 bg-[#B1CF66]"></div>
      </div>
      
      <CreateWindow isOpen={showModal} close={setShowModal}/>
      {modalStatus && window===windowList.profileWindow&& isAuth&&<Profile/>}
    </div>
    </>
  );
}

export default Dashboard;