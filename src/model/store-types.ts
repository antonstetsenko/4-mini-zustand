import { CoffeItem, CoffeeQueryParams, CoffeeType } from '../types/coffee-types';

export type CoffeeCartState = {
	cart?: CoffeItem[];
	address?: string;
};

export type CoffeeCartActions = {
	setAddress: (address: string) => void;
	addToCart: (item: CoffeeType) => void;
	orderCoffee: () => void;
	clearCart: () => void;
};

export type CoffeeListState = {
	coffeeList?: CoffeeType[];
	controller?: AbortController;
	params: CoffeeQueryParams;
};

export type CoffeeListActions = {
	getCoffeeList: (params?: CoffeeQueryParams) => Promise<CoffeeType[]>;
	setParams: (params?: CoffeeQueryParams) => void;
};
