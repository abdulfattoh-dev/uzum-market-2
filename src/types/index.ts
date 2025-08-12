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

export interface IResponse {
    products: IProduct[]
    limit: number
    total: number
    skip: number
}

export interface IRecipe {
    id: number
    image: string
    rating: number
    reviewCount: number
    name: string
    tags: string[]
}

export interface IResResipe {
    recipes: IRecipe[]
    limit: number
    total: number
    skip: number
}