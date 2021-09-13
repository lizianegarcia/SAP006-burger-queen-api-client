import React from 'react';
// import { useState } from 'react';
import './style.css'; 

const Button = ({variant, children}) => {
    const classes = `button ${variant}`;

    return (
        <button className = {classes} >
            {children}
        </button>
    )
}

export default Button;
// const pesssoa ={
//         nome: 'gabriel',
//         sobrenome: 'ramos',
// }

// const { nome } = pessoa;
// console.log (nome); rsp gabriel
// const nome completo = ${nome} ${sobrenome}`