import React from 'react'
import heart from "../../assets/heart.svg";
import basket from "../../assets/basket.svg";
import logo from "../../assets/logo.svg";
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <header className='container'>
            <nav>
                <div></div>
                <div className='flex justify-between h-[42px] items-center'>
                    <NavLink to={'/'}>
                        <div>
                            <img src={logo} alt="" />
                        </div>
                    </NavLink>
                    <ul className='flex gap-2 items-center h-full'>
                        <li>
                            <NavLink to={'wishes'} className='flex gap-[9px] px-2'>
                                <div>
                                    <img src={heart} alt="" />
                                </div>
                                <span>Sorted</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'cart'} className='flex gap-[9px] px-2'>
                                <div>
                                    <img src={basket} alt="" />
                                </div>
                                <span>Cart</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div></div>
            </nav>
        </header>
    )
}

export default React.memo(Header)