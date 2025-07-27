import React from 'react'

function Input(props) {
  return (
    <div className='flex flex-col '>
      <label className='text-[#6b7280] text-[14px]'>{props.lable}</label>
      <div>
        <input {...props} className="border-[1px] border-amber-400 p-2 rounded-[8px] mt-1 w-full "/>
      </div>
      {props.error?<p className='text-red-500 mt-2'>{props.error}</p>:""}
      
    </div>
  )
}

export default Input