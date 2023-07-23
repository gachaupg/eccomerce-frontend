import React, { useState } from 'react'
import { StyledForm } from "./StyledForm";
import { useNavigate } from 'react-router-dom';
const Otp = () => {
    const [Otp,setOpt]=useState('')
    const navigate=useNavigate()
    const handleSubmit=()=>{
        if(Otp){
            navigate('/login')
        }
    }
    
  return (
    <div>
 <StyledForm onSubmit={handleSubmit} >
 <h2>Enter your code</h2>
        <input
          type="number"
          required
          placeholder=" code"
          onChange={(e) => setOpt({ ...Otp, Otp: e.target.value })}
        />
         <button>
          submit
        </button>
 </StyledForm>
    </div>
  )
}

export default Otp