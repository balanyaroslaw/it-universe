import Trees from '../assets/tree_bg2.png';
import React from 'react'
import AuthForm from '../shared/components/form.component'

function Login() {
  return (
    <div className="max-w-full flex h-full justify-center items-center my-5">
        <div className="flex w-full justify-center items-center">
          <AuthForm login={true}/>
          <div className="absolute bottom-0 z-0">
            <img src={Trees} alt="" className='h-full'/>
          </div>
        </div>
    </div>
  )
}

export default Login