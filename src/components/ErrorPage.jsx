import React from 'react'
import { useNavigate, Link } from 'react-router-dom'


const ErrorPage = () => {
    const navigate = useNavigate();

  return (
    <div className='flex items-center justify-center h-screen flex-col'>
        <h2 className='text-3xl'>Page Is Not Found</h2>
        <button className='border-2 border-black hover:bg-black hover:text-white duration-300 py-2 px-5 mt-5' onClick={() => navigate(-1)}>Go Back</button>
        <Link className='py-2 px-5 bg-blue-400 text-white mt-5' to="/">Or navigate home</Link>
    </div>
  )
}

export default ErrorPage