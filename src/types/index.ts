export interface IProduct {
    id: number
    thumbnail: string
    price: number
    discountPercentage: number
    description: string
    rating: number
    reviews: []
    stock: number
    title: string
}

export type ICartProduct = IProduct & {
    amount: number
}