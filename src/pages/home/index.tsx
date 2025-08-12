import React, { lazy } from 'react'
import { useFetch } from '../../hooks/useFetch'
import type { IResponse } from '../../types'

const ProductView = lazy(() => import("../../components/product-view/ProductView"))

const Home = () => {
    const { data } = useFetch<IResponse>("/products", { limit: 10, skip: 0 })

    return (
        <div>
            <ProductView title='Products' data={data?.products} />
        </div>
    )
}

export default React.memo(Home)