import React from "react";

export default function Toggle({toggleFn, textLeft, textRight, colorLeft, colorRight, position, margin, toggled, setToggled}) {
    return (<div className={`flex items-center h-6 justify-center ${position} ${margin}`}>
        <p className="mr-1 pb-0.5 text-gray-800">{textLeft}</p>
        <div className={`relative transition flex justify-start items-center px-0.5 w-12 h-full rounded-full ${backgroundStyler(toggled, colorLeft, colorRight)}`}>
            <div className={`${sliderStyler(toggled)} cursor-pointer`} onClick={() => setToggled(!toggled)}></div>
        </div>
        <p className="ml-1 pb-0.5 text-gray-800">{textRight}</p>
    </div>);
}

const backgroundStyler = (toggled, colorLeft, colorRight) => {
    return toggled ? colorRight : colorLeft;
};

const sliderStyler = (toggled) => {
    return "absolute transition-all h-5 aspect-square rounded-full bg-white drop-shadow-md" + (toggled ? " translate-x-[1.5rem]" : "");
};