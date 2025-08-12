import React from 'react'
import type { ICartProduct } from '../../types';
import { CreditCard, Trash2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../redux';
import { decAmount, deleteFromCart, incAmount } from '../../redux/features/cart';

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
]

const Cart = () => {
    const cart = useSelector((state: RootState) => state.cart.value)
    const dispatch = useDispatch()

    return (
        <div className='container'>
            <div>
                <h2 className='text-[28px] font-bold mt-8 mb-6'>Your cart</h2>
                <div className='flex'>
                    <div className='border-2 border-[#ebebec] p-4 w-214 rounded-lg'>
                        {
                            cart?.map((product: ICartProduct) => (
                                <div key={product.id} className=' border-t-2 border-t-[#f7f7f8] pt-6 m-4'>
                                    <p className='text-xs text-[#7E818C] font-medium'>Uzum Market delivery</p>
                                    <p className='text-lg font-semibold'>We will deliver from {months[new Date().getMonth()]} {new Date().getDate() + 1}th</p>
                                    <div className='flex'>
                                        <div className='w-37 bg-[#EFEFEF]'>
                                            <img src={product.thumbnail} alt="" />
                                        </div>
                                        <div className='flex flex-col gap-2.5 w-full'>
                                            <div className='flex gap-1.5 justify-between'>
                                                <p className='line-clamp-2'>{product.description}</p>
                                                <button onClick={() => dispatch(deleteFromCart(product))} className='flex gap-1.5 hover:cursor-pointer'>
                                                    <Trash2 className='text-[#868689]' />
                                                    <span className='text-[#4D4F59]'>Delete</span>
                                                </button>
                                            </div>
                                            <div className='flex'>
                                                <div className='flex gap-1.5 w-72'>
                                                    <p className='text-[#7E818C]'>Seller:</p>
                                                    <p>{product.title}</p>
                                                </div>
                                                <div className='border-2 border-[#ebebec] flex justify-evenly'>
                                                    <button onClick={() => dispatch(decAmount(product))} className='w-9.5 h-9.5 text-3xl text-[#86868a]'>-</button>
                                                    <button className='w-9.5 h-9.5'>{product.amount}</button>
                                                    <button disabled={product.amount <= product.stock} onClick={() => dispatch(incAmount(product))} className='w-9.5 h-9.5 text-3xl text-[#86868a]'>+</button>
                                                </div>
                                                <div className='flex-1 text-end'>
                                                    <div className='flex text-xl font-semibold text-[#7F4DFF] items-end justify-end gap-1'>
                                                        <span>{(product.price * (100 - product.discountPercentage) / 100 * product.amount).toFixed(2)} USD</span>
                                                        <CreditCard className='w-4' />
                                                    </div>
                                                    <p className='text-[14px]'>Without uzum card {product.price * product.amount} USD</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(Cart)