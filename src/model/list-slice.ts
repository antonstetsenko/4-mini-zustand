import { StateCreator } from 'zustand';
import { CartActions, CartState, ListActions, ListState } from './store-types';
import { GetCoffeeListReqParams } from '../types/coffee-types';
import axios from 'axios';
import { BASE_URL } from '../api/core-api';

export const listSlice: StateCreator<
	CartActions & CartState & ListState & ListActions,
	[['zustand/devtools', never], ['zustand/persist', unknown]],
	[['zustand/devtools', never], ['zustand/persist', unknown]],
	ListActions & ListState
> = (set, get) => ({
	coffeeList: undefined,
	controller: undefined,
	params: {
		text: undefined,
		type: undefined,
	},
	setParams: (newParams) => {
		const { getCoffeeList, params } = get();
		set({ params: { ...params, ...newParams } }, false, 'setParams');
		getCoffeeList(params);
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
