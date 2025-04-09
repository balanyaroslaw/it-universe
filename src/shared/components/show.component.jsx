 import React from 'react'
 import { EyeClosed } from 'lucide-react';
 import { Eye } from 'lucide-react';
 function ShowPassword({type, setStatus}) {

    const changeType = () =>{
        if(type==='password'){
            setStatus('text');
        }
        else{
            setStatus('password');
        }
    }
   return (
     <div className="flex">
        <button onClick={()=>changeType()}>
            {type==='password'?<EyeClosed size={16} />:<Eye size={16}/>}
        </button>
     </div>
   )
 }
 
 export default ShowPassword