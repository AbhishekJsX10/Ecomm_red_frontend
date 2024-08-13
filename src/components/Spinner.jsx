import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const Spinner = ({path="/login"}) => {

  const location = useLocation()
  const navigate = useNavigate()
  const [count,setCount] = useState(7)

  useEffect(()=>{
    const interval  = setInterval(()=>{
      setCount((prevValue)=> --prevValue)
    },1000)
    count === 0 && navigate(`${path}`,{
      state:location.pathname
    })
    return ()=>clearInterval(interval)
  },[count,navigate,location,path])

  return (
    <>
        <div className='flex space-x-2 justify-center items-center bg-zinc-900 h-screen dark:invert'>
            <span className='sr-only'>Loading...</span>
            <div className='h-8 w-8 bg-white rounded-full animate-bounce [animation-delay:-0.3s]'></div>
            <div className='h-8 w-8 bg-white rounded-full animate-bounce [animation-delay:-0.15s]'></div>
            <div className='h-8 w-8 bg-white rounded-full animate-bounce'></div>
        </div>
        <div>
          <h1 className='text-white'>Redirecting in {count} seconds...</h1>
        </div>
    </>
  )
}

export default Spinner