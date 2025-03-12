import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const DropdownMenu = () => {

    return (
        <div
            className="relative"
        >
                <ul className="absolute left-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg transition-opacity duration-300 ease-in-out opacity-100">
                    <li className="hover:bg-gray-100 transition-colors duration-300">
                        <NavLink to="/inspiredPerfumeOil" className="block px-4 py-2 text-gray-800">
                            Inspired Perfume Oil
                        </NavLink>
                    </li>
                    <li className="hover:bg-gray-100 transition-colors duration-300">
                        <NavLink to="/oriental" className="block px-4 py-2 text-gray-800">
                            Oriental & Arabian Attar
                        </NavLink>
                    </li>
                    <li className="hover:bg-gray-100 transition-colors duration-300">
                        <NavLink to="/artificialOud" className="block px-4 py-2 text-gray-800">
                            Artificial Oud
                        </NavLink>
                    </li>
                    <li className="hover:bg-gray-100 transition-colors duration-300">
                        <NavLink to="/natural" className="block px-4 py-2 text-gray-800">
                            Natural Collections
                        </NavLink>
                    </li>
                </ul>
        </div>
    );
};

export default DropdownMenu;
