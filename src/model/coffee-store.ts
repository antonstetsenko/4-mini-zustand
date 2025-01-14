import { OrderCoffeeRes, OrderItem } from './../types/coffee-types';
import { create, StateCreator } from 'zustand';
import { CoffeeType, GetCoffeeListReqParams } from '../types/coffee-types';
import { devtools, persist } from 'zustand/middleware';
import axios from 'axios';

const BASE_URL = 'https://purpleschool.ru/coffee-api/';

type CoffeeState = {
	coffeeList?: CoffeeType[];
	controller?: AbortController;
	cart?: OrderItem[];
	address?: string;
};

type CoffeeActions = {
	getCoffeeList: (params?: GetCoffeeListReqParams) => void;
	addToCart: (item: CoffeeType) => void;
	clearCart: () => void;
	orderCoffee: () => void;
	setAddress: (address: string) => void;
};

const coffeeSlice: StateCreator<
	CoffeeActions & CoffeeState,
	[['zustand/devtools', never], ['zustand/persist', unknown]]
> = (set, get) => ({
	coffeeList: undefined,
	controller: undefined,
	cart: undefined,
	address: undefined,
	clearCart: () => {
		set({ cart: undefined });
	},
	setAddress: (address) => {
		set({ address });
	},

	addToCart: (item) => {
		const { cart } = get();
		const { id, name, subTitle } = item;
		const preparedItem: OrderItem = { id, name: `${name} ${subTitle}`, size: 'L', quantity: 1 };
		set({ cart: cart ? [...cart, preparedItem] : [preparedItem] });
	},

	orderCoffee: async () => {
		const { cart, address, clearCart } = get();
		try {
			const { data } = await axios.post<OrderCoffeeRes>(BASE_URL + 'order', { address, orderItems: cart });
			if (data.success) {
				alert(data.message);
				clearCart();
			}
		} catch (err) {
			console.log(err);
		}
	},

	getCoffeeList: async (params?: GetCoffeeListReqParams) => {
		const { controller } = get();
		if (controller) {
			controller.abort();
		}

		const newController = new AbortController();

		set({ controller: newController });

		const { signal } = newController;

		try {
			const { data } = await axios.get(BASE_URL, { params, signal });
			set({ coffeeList: data });
		} catch (err) {
			if (axios.isCancel(err)) return;
			console.log(err);
		}
	},
});

export const useCoffeeStore = create<CoffeeActions & CoffeeState>()(
	devtools(
		persist(coffeeSlice, {
			name: 'coffeeStore',
			partialize: (state) => ({ cart: state.cart, address: state.address }),
		}),
		{
			name: 'coffeeStore',
		},
	),
);
