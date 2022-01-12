import React from "react";

export default function ConnectorLine({ length, strokeColor, strokeWidth, transition=false, fillColor='', position='' }) {
    return <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className={`${length} ${strokeColor} ${fillColor} ${position} ${strokeWidth} my-1.5 drop-shadow-sm`}>
        <line x1="50" y1="0" x2="50" y2="100" />
        {transition && <ellipse cx="50" cy="50" rx="3" ry="3"></ellipse>}
    </svg>
}