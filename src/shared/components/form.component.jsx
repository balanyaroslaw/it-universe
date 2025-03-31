import React, { useState } from 'react';
import { Calendar, User, Mail, Lock, MapPin, FileText, VenusAndMars} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import userService from '../services/user.service';
import { validateForm } from '../../utilities/validate';
const AuthForm = ({login}) => {
  const [isLogin, setIsLogin] = useState(login);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    bio: '',
    birthdate: '',
    birthplace: '',
    gender:''
  });
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError({})
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
    }

    try {
      console.log(formData)
      const data = !isLogin?await userService.signUp(formData):await userService.logIn(formData);
      if (data.access_token && data.refresh_token) {
        await navigate('/tree');
      }
    } catch (error) {
      console.log(isLogin)
      setError({
        submit: error?.response?.data?.message || 'An error occurred during signup'
      });
    }
  };

  const Error = ({text}) =>{
    return(
      <span className='md:text-xd text-red-500'>{text}</span>
    )
  } 

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        {isLogin ? 'Log In to Your Account' : 'Create a New Account'}
      </h2>
      
      <div className="max-h-96 overflow-y-auto pr-2 custom-scrollbar">
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border p-2"
                    placeholder="John"
                  />
                </div>
                {error?.firstName&&<Error text={error.firstName}/>}
              </div>
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border p-2"
                    placeholder="Doe"
                  />
                </div>
                {error?.lastName&&<Error text={error.lastName}/>}
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
            </div>
          )}
  
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail size={16} className="text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border p-2"
                placeholder="you@example.com"
                required
              />
            </div>
            {error?.email&&<Error text={error.email}/>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="mt-1 relative rounded-md shadow-sm mb-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={16} className="text-gray-400" />
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border p-2"
                placeholder="••••••••"
                required
              />
            </div>
            {error?.password&&<Error text={error.password}/>}
          </div>
          
          {!isLogin && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Bio</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FileText size={16} className="text-gray-400" />
                  </div>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows="3"
                    className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border p-2"
                    placeholder="Tell us about yourself..."
                  ></textarea>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Birthdate</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="date"
                    name="birthdate"
                    value={formData.birthdate}
                    onChange={handleChange}
                    className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border p-2"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Birthplace</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="birthplace"
                    value={formData.birthplace}
                    onChange={handleChange}
                    className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border p-2"
                    placeholder="City, Country"
                  />
                </div>
              </div>
            </>
          )}
          
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
              bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isLogin ? 'Log In' : 'Sign Up'}
            </button>
          </div>
        </form>
      </div>
      
      <div className="mt-6 text-center">
        <Link
          className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          to={`${isLogin?'/signup':'/login'}`}
        >
          {isLogin ? 'Need an account? Sign up' : 'Already have an account? Log in'}
        </Link>
      </div>
    </div>
  );
};

export default AuthForm;