import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';

export default function ProtectedAuth({children}) {
   const [token,setToken] =useState();
    const navigate = useNavigate()
    useEffect(()=>{
        if(token){
            navigate('/home')
        }
    },[])
  return (
    <>
      {children}
    </>
  )
}
