import React from 'react'
import { useParams } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'
import type { IRecipe } from '../../types'

const RecipeDetail = () => {
    const { id } = useParams()
    const { data } = useFetch<IRecipe>(`/recipes/${id}`)
    console.log(data);
    
    return (
        <div className='container'>
            <div>
                <img src={data?.image} alt="" />
            </div>
        </div>
    )
}

export default React.memo(RecipeDetail)