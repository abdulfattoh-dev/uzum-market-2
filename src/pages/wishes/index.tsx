import React from 'react'
import ProductView from '../../components/product-view/ProductView'
import { useSelector } from 'react-redux'
import type { RootState } from '../../redux'

const Wishes = () => {
  const wishes = useSelector((state: RootState) => state.wishes.value)

  return (
    <div>
      <ProductView title='Wishes' data={wishes} />
    </div>
  )
}

export default React.memo(Wishes)