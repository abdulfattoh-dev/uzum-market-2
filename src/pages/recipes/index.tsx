import React, { lazy } from 'react'
import { useFetch } from '../../hooks/useFetch'
import type { IResResipe } from '../../types'
import { useSearchParams } from 'react-router-dom'

const RecipeView = lazy(() => import("../../components/recipe-view/RecipeView"))

const Recipes = () => {
    const limit = 5
    const [params, setParams] = useSearchParams()
    const skip = Number(params.get('skip')) || 1
    const tag = params.get('tag') || ''

    const { data, loading } = useFetch<IResResipe>(`/recipes/${tag ? `tag/${tag}` : ''}`, { limit, skip: limit * (skip - 1) })

    const handlePaginate = (index: number) => {
        if (index == 0) {
            params.delete('skip')
        } else {
            params.set('skip', (index + 1).toString())
        }

        setParams(params)
    }

    const { data: tags } = useFetch<string[]>('/recipes/tags')

    const handleTag = (tag: string) => {
        if (tag.length == 0) {
            params.delete('tag')
        } else {
            params.set('tag', `${tag}`)
        }

        params.delete('skip')
        setParams(params)
    }

    const handleDec = () => {
        if (skip == 2) {
            params.delete('skip')
        } else {
            params.set('skip', `${skip - 1}`)
        }

        setParams(params)
    }

    const handleInc = () => {
        params.set('skip', `${skip + 1}`)
        setParams(params)
    }

    return (
        <div>
            <div className='container'>
                <div className='flex gap-2 items-center overflow-x-auto scroll'>
                    <button onClick={() => handleTag('')} className={`${'' == tag ? 'bg-black text-white' : ''} py-1.5 px-2 bg-[#DDDFE3] text-xs rounded-lg text-nowrap select-none cursor-pointer`}>All</button>
                    {
                        tags?.map((item: string, index: number) => (
                            <button onClick={() => handleTag(item)} key={index} className={`${item == tag ? 'bg-black text-white' : ''} py-1.5 px-2 bg-[#DDDFE3] text-xs rounded-lg text-nowrap select-none cursor-pointer`}>{item}</button>
                        ))
                    }
                </div>
            </div>
            {
                loading ? <p className='container'>Loading...</p> : <RecipeView title='Recipes' data={data?.recipes} />
            }

            <div className='container flex justify-between'>
                <button disabled={skip == 1} onClick={() => handleDec()} className='border px-2'>&#10094;</button>
                <div>
                    {
                        Array(Math.ceil((data?.total || 0) / limit)).fill('').map((_, index: number) => (
                            <button key={index} onClick={() => handlePaginate(index)} className={`border px-2 ${skip == (index + 1) ? 'bg-black text-white' : ''}`}>{index + 1}</button>
                        ))
                    }
                </div>
                <button disabled={skip == Math.ceil((data?.total || 0) / limit)} onClick={() => handleInc()} className='border px-2'>&#10095;</button>
            </div>
        </div>
    )
}

export default React.memo(Recipes)