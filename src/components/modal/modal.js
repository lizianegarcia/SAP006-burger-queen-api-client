import React from "react";
import "./modal.css";

const Modal = ({ className, modalRef })=> {
   
    return(
        <div ref={modalRef} className={`${className} modal`}>
            <p>Meu modal!</p>
        </div>
    )
}

export default Modal;