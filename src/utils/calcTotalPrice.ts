import { BasketState } from "../store/slices/basket";

export const calcTotalPrice = (array: any[]) => {
  const totalPrice = array.reduce((sum: number, obj: any) => {
    return (obj.count * obj.price) + sum
  }, 0)
  return totalPrice
}