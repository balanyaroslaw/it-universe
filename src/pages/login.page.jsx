import Trees from '../assets/tree_bg2.png';
import React from 'react'
import AuthForm from '../shared/components/form.component'

function Login() {
  return (
    <div className="max-w-full flex h-full justify-center items-center my-5">
        <div className="flex w-full justify-center items-center">
          <AuthForm login={true}/>
          <div className="absolute inset-0 top-[28%] z-0">
            <img src={Trees} alt="" />
          </div>
        </div>
    </div>
  )
}

export default Login