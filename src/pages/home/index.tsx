import React, { lazy, useEffect, useState } from 'react'
import { api } from '../../api'

const ProductView = lazy(() => import("../../components/product-view/ProductView"))

const Home = () => {
    const [data, setData] = useState<null>(null)
    useEffect(() => {
        api
            .get("products")
            .then((res) => setData(res.data?.products))
    }, [])
    return (
        <div>
            <ProductView title='Famous' data={data} />
        </div>
    )
}

export default React.memo(Home)