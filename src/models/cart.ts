export interface userCart {
   carts: cartArray[]
}

interface cartArray{
   discountedTotal: number,
   id: number,
   products: productCart[],
   total: number,
   totalProducts: number,
   totalQuantity: number,
   userId: number
}

export interface productCart{
   discountPercentage: number,
   discountedPrice: number,
   id: number,
   price: number|string,
   quantity: number,
   title: string,
   total: number,
   value?:boolean
}