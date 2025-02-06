import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { CoffeeType, GetCoffeeListReqParams } from '../types/coffee-types';
import { CartActions, CartState, ListActions, ListState } from './store-types';
import { cartSlice } from './cart-slice';
import { listSlice } from './list-slice';

export const useCoffeeStore = create<CartActions & CartState & ListState & ListActions>()(
	devtools(
		persist((...arg) => ({ ...cartSlice(...arg), ...listSlice(...arg) }), {
			name: 'coffeeStore',
			partialize: (state) => ({ cart: state.cart, address: state.address }),
		}),
		{
			name: 'coffeeStore',
		},
	),
);

export const getCoffeeList = (params?: GetCoffeeListReqParams) => useCoffeeStore.getState().getCoffeeList(params);

export const setParams = (params?: GetCoffeeListReqParams) => useCoffeeStore.getState().setParams(params);

export const setAddress = (address: string) => useCoffeeStore.getState().setAddress(address);

export const orderCoffee = () => useCoffeeStore.getState().orderCoffee();

export const clearCart = () => useCoffeeStore.getState().clearCart();

export const addToCart = (coffee: CoffeeType) => useCoffeeStore.getState().addToCart(coffee);
