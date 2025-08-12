import React, { type FC } from 'react'
import heart from "../../assets/heart.svg";
import star from "../../assets/star.svg";
import type { IRecipe } from '../../types';
import { useNavigate } from 'react-router-dom';

// import { CreditCard } from 'lucide-react';
// import { useDispatch } from 'react-redux';
// import { addToWishes } from '../../redux/features/wishes';
// import { addToCart } from '../../redux/features/cart';

interface IProps {
    title: string
    data: IRecipe[] | undefined
}

const RecipeView: FC<IProps> = ({ title, data }) => {
    // const dispatch = useDispatch()
    const navigate = useNavigate()

    return (
        <div className='container'>
            <h2 className='text-[28px] font-bold'>{title}</h2>
            <div className='grid grid-cols-5 gap-x-5 gap-y-8 mt-[21px] mb-10'>
                {
                    data?.map((recipe: IRecipe) => (
                        <div key={recipe.id}>
                            <div className='relative'>
                                <div onClick={() => navigate(`/recipes/${recipe.id}`)} className='w-[232px] h-[309.3299865722656px] rounded-lg bg-[#EFEFEF] overflow-hidden'>
                                    <img className='h-full object-cover' src={recipe.image} alt="" />
                                </div>
                                {/* <button onClick={() => dispatch(addToWishes(recipe))} className='absolute top-2.5 right-[9px] bg-white p-1 rounded-full hover:cursor-pointer'> */}
                                <button className='absolute top-2.5 right-[9px] bg-white p-1 rounded-full hover:cursor-pointer'>
                                    <img className='w-4' src={heart} alt="" />
                                </button>
                            </div>
                            <div className='p-1 gap-0.5'>
                                {/* <div>
                                    <div className='flex text-[#7F4DFF] font-semibold items-center gap-1'>
                                        <span>{(recipe.price * (100 - recipe.discountPercentage) / 100).toFixed(2)}</span>
                                        <CreditCard className='w-[14.5px]' />
                                    </div>
                                    <p className='text-[#7E818C] text-xs'>{recipe.price}</p>
                                </div>
                                <p className='bg-[#FFFF00] px-1 py-[1px] text-[11px] w-max'>{(recipe.price * 170 / 24 / 100).toFixed(2)} USD/month</p> */}
                                <p className='text-xs'>{recipe.name}</p>
                                <div className='flex text-xs items-center gap-0.5 text-[#7E818C]'>
                                    <div>
                                        <img src={star} alt="" />
                                    </div>
                                    <span>{recipe.rating} ({recipe.reviewCount} reviews)</span>
                                </div>
                                {/* <button onClick={() => dispatch(addToCart(recipe))} className='bg-[#7000FF] text-white w-full rounded-lg py-1 mt-1'>Add to cart</button> */}
                                <button className='bg-[#7000FF] text-white w-full rounded-lg py-1 mt-1'>Add to cart</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default React.memo(RecipeView)