import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Calendar, User, Mail, Lock, MapPin, FileText, VenusAndMars } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import userService from '../services/user.service';
import ShowPassword from './show.component';

const AuthForm = ({ login }) => {
  const [isLogin, setIsLogin] = useState(login);
  const [submitError, setSubmitError] = useState('');
  const [type, setType] = useState('password');
  const [pending, setPending] = useState(false);
  const navigate = useNavigate();
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      bio: '',
      birthdate: '',
      birthplace: '',
      gender: ''
    }
  });

  const onSubmit = async (data) => {
    try {
      setPending(true);
      const response = !isLogin 
        ? await userService.signUp(data) 
        : await userService.logIn(data);
        
      if (response.access_token && response.refresh_token) {
        await navigate('/tree');
      }
    } catch (error) {
      setSubmitError(
        error?.response?.data?.message || 
        'Сталася помилка під час автентифікації'
      );
      setPending(false);
    }
  };

  const toggleAuthMode = (e) => {
    e.preventDefault();
    setIsLogin(!isLogin);
    const newPath = isLogin ? '/signup' : '/login';
    window.history.pushState({}, '', newPath);
  };

  return (
    <div className={`w-full max-w-md mx-auto bg-greenly rounded-lg shadow-md p-6 z-10 ${isLogin ? 'mt-[5%]': ''}`}>
      <h2 className="text-2xl font-bold text-center text-brown mb-6">
        {isLogin ? 'Увійти до облікового запису' : 'Створити новий обліковий запис'}
      </h2>
      
      {submitError && (
        <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
          {submitError}
        </div>
      )}
      
      <div className="max-h-96 overflow-y-auto pr-2 custom-scrollbar">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {!isLogin && (
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700">Ім'я</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Іван"
                    className={`pl-10 block w-full rounded-md shadow-sm sm:text-sm border p-2 ${
                      errors.firstName ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                    }`}
                    {...register('firstName', { 
                      required: "Ім'я обов'язкове" 
                    })}
                  />
                </div>
                {errors.firstName && (
                  <span className="text-sm text-red-500">{errors.firstName.message}</span>
                )}
              </div>
              
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700">Прізвище</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Петренко"
                    className={`pl-10 block w-full rounded-md shadow-sm sm:text-sm border p-2 ${
                      errors.lastName ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                    }`}
                    {...register('lastName', { 
                      required: "Прізвище обов'язкове" 
                    })}
                  />
                </div>
                {errors.lastName && (
                  <span className="text-sm text-red-500">{errors.lastName.message}</span>
                )}
              </div>

              <div className="col-span-2 mt-4">
                <div className="flex items-center gap-2 mb-1">
                  <VenusAndMars size={20} className="text-gray-300" />
                  <label className="text-sm font-medium text-gray-700">Стать</label>
                </div>
                <select 
                  className={`w-full rounded-lg border px-4 py-2 outline-none transition-all bg-white text-gray-600 ${
                    errors.gender ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                  }`}
                  {...register('gender', { 
                    required: "Стать обов'язкова",
                    validate: value => value !== 'select' || "Будь ласка, оберіть стать" 
                  })}
                >
                  <option value="select">Оберіть стать</option>
                  <option value="male">Чоловік</option>
                  <option value="female">Жінка</option>
                </select>
                {errors.gender && (
                  <span className="text-sm text-red-500">{errors.gender.message}</span>
                )}
              </div>
            </div>
          )}
  
          <div>
            <label className="block text-sm font-medium text-gray-700">Електронна пошта</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail size={16} className="text-gray-400" />
              </div>
              <input
                type="email"
                placeholder="ви@приклад.com"
                className={`pl-10 block w-full rounded-md shadow-sm sm:text-sm border p-2 ${
                  errors.email ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                }`}
                {...register('email', { 
                  required: "Електронна пошта обов'язкова", 
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Недійсна адреса електронної пошти"
                  }
                })}
              />
            </div>
            {errors.email && (
              <span className="text-sm text-red-500">{errors.email.message}</span>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Пароль</label>
            <div className="flex mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={16} className="text-gray-400" />
              </div>
              <input
                type={type}
                placeholder="••••••••"
                className={`pl-10 block w-full rounded-md shadow-sm sm:text-sm border p-2 ${
                  errors.password ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                }`}
                {...register('password', { 
                  required: "Пароль обов'язковий",
                  minLength: {
                    value: 8,
                    message: "Пароль має містити щонайменше 8 символів"
                  }
                })}
              />
               <div className="absolute inset-y-0 right-0 pr-3 flex items-center z-50">
                <ShowPassword setStatus={setType} type={type}/>
              </div>
            </div>
            {errors.password && (
              <span className="text-sm text-red-500">{errors.password.message}</span>
            )}
          </div>
          
          {!isLogin && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Біографія</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FileText size={16} className="text-gray-400" />
                  </div>
                  <textarea
                    rows="3"
                    placeholder="Розкажіть про себе..."
                    className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border p-2"
                    {...register('bio')}
                  ></textarea>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Дата народження</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="date"
                    className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border p-2"
                    {...register('birthdate')}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Місце народження</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Місто, Країна"
                    className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border p-2"
                    {...register('birthplace')}
                  />
                </div>
              </div>
            </>
          )}
          
          <div className='w-full flex justify-center'>
            <button
              type="submit"
              disabled={pending}
              className={`flex justify-center py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-cream 
                font-comfortaa 
                ${!pending ? 'bg-[#97B948]' : 'bg-gray-300 cursor-not-allowed'} 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              {pending ? 'Відправка...' : isLogin ? 'Увійти' : 'Зареєструватися'}
            </button>
          </div>
        </form>
      </div>
      
      <div className="mt-6 text-center">
        <a
          href="#"
          onClick={toggleAuthMode}
          className="text-sm font-medium text-[#788951] hover:[#839558] font-comfortaa"
        >
          {isLogin ? "Немає облікового запису? Зареєструватися" : "Вже маєте обліковий запис? Увійти"}
        </a>
      </div>
    </div>
  );
};

export default AuthForm;