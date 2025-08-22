import React from "react";

function Button(props) {
    return (
        <button
            className="bg-amber-400 p-2 rounded-[8px] text-center text-white  w-full disabled:bg-amber-200"
            {...props}
        >
            {props.lable}
        </button>
    );
}

export default Button;
