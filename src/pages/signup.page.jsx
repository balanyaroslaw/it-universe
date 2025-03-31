import React from 'react'
import AuthForm from '../shared/components/form.component'

function Signup() {
  return (
    <div className="max-w-full flex h-screen justify-center items-center my-5">
        <div className="flex w-full h-full justify-center items-center mb-10 mt-10">
            <AuthForm login={false}/>
        </div>
    </div>
  )
}

export default Signup