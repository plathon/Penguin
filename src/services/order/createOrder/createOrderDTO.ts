import Product from '@entities/Product'

export interface CreateOrderRequestDTO{
  products: number[]
}

export interface CreateOrderResponseDTO {
  status: number,
  products: Product[],
  id: number,
  createdAt: Date,
  updatedAt: Date,
  userId: number
}
