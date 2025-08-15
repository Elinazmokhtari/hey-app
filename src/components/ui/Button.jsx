import React from 'react'

function Button(props) {
  return (
    <button {...props}  className='bg-amber-400 p-2 rounded-[8px] text-center text-white  w-full'>{props.lable}</button>
  )
}

export default Button