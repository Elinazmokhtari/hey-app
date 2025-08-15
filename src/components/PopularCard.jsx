import React from "react";

export default function PopularCard(props) {
 

  return (
    <div className="border-[1px] border-gray-300 p-2 rounded-[8px] mt-2 ">
      <div className="flex  flex-row justify-between ">
        <p>{props.item.user.name}</p>
        <p >{props.item.likes_count}</p>
      </div>
      <div className="text-[15px] text-gray-600">
        <p>{props.item.content}</p>
      </div>

    
    </div>
  );
}
