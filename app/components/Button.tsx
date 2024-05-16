import React from 'react';
import Link from 'next/link';
import './ButtonStyle.css'; // Importa los estilos

const Button: React.FC = () => {
    return (
        <span className="background">
            <a
                href="https://learning.atheros.ai"
                className='button'
            >
                <svg>
                    <rect
                        x="0" y="0" 
                        fill="none"
                        width="100%"
                        height="100%"
                    />
                </svg>
                Learn
            </a>            
        </span>
    );
};

export default Button;