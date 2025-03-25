
import React from 'react'
import AuthForm from '../shared/components/form.component'

function Login() {
  return (
    <div className="max-w-full flex h-screen justify-center items-center my-5">
        <div className="flex w-full h-[80%] justify-center items-center mb-10 mt-10">
            <AuthForm login={true}/>
        </div>
    </div>
  )
}

export default Login