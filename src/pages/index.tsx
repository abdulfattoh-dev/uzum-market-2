import React, { lazy, Suspense } from 'react'
import { useRoutes } from 'react-router-dom'

const Layout = lazy(() => import('./layout'))
const Home = lazy(() => import('./home'))

const Recipes = lazy(() => import('./recipes'))
const RecipeDetail = lazy(() => import('./recipes/RecipeDetail'))

const Wishes = lazy(() => import('./wishes'))
const Cart = lazy(() => import('./cart'))

const MainRoutes = () => {
    return (
        <Suspense>
            {
                useRoutes(
                    [
                        {
                            path: '/', element: <Layout />, children: [
                                { index: true, element: <Home /> },
                                { path: 'recipes', element: <Recipes /> },
                                { path: 'recipes/:id', element: <RecipeDetail /> },
                                { path: 'wishes', element: <Wishes /> },
                                { path: 'cart', element: <Cart /> }
                            ]
                        },
                    ]
                )
            }
        </Suspense>
    )
}

export default React.memo(MainRoutes)