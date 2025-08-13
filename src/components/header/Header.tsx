import React from 'react'
import heart from "../../assets/heart.svg";
import basket from "../../assets/basket.svg";
import logo from "../../assets/logo.svg";
import productCategory from "../../assets/productCategory.png";
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
                <div className='h-9.5 mt-2.5 mb-3 flex items-center'>
                    <ul className='flex gap-2.5 text-[#4D4F59]'>
                        <li>
                            <NavLink to={''} className={({ isActive }) => `flex gap-1 ${isActive ? 'text-black' : 'text-[#4D4F59]'}`}>
                                <div className='w-6'>
                                    <img src={productCategory} alt="" />
                                </div>
                                <span>Products</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'recipes'} className={({ isActive }) => `${isActive ? 'text-black' : 'text-[#4D4F59]'}`}>
                                Recipes
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'students'} className={({ isActive }) => `${isActive ? 'text-black' : 'text-[#4D4F59]'}`}>
                                Students
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default React.memo(Header)