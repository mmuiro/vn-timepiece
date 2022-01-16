import React from "react";
import ReactDOM from "react-dom";

export default function Modal({ children, show, close }) {
    return show ? ReactDOM.createPortal(
        <>
            <div className="fixed bg-neutral-900 opacity-50 top-0 left-0 right-0 bottom-0" onClick={close}></div>
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg drop-shadow-md z-50 py-5 px-8">
                {children}
            </div>
        </>,
        document.getElementById('modal-portal')
    ) : <></>;
}