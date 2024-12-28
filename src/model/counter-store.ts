import { create, StateCreator } from 'zustand';

type counterState = {
	counter: number;
};

type counterActions = {
	increment: () => void;
	decrement: () => void;
	changeByAmount: (value: number) => void;
};

const counterSlice: StateCreator<counterState & counterActions> = (set, get) => ({
	counter: 0,
	increment: () => {
		const { counter } = get();
		set({ counter: counter + 1 });
	},
	decrement: () => {
		const { counter } = get();
		set({ counter: counter - 1 });
	},
	changeByAmount: (value: number) => {
		const { counter } = get();
		set({ counter: counter + value });
	},
});

export const useCounterStore = create<counterState & counterActions>(counterSlice);
export const changeByAmount = (value: number) => useCounterStore.getState().changeByAmount(value);
export const getCounter = () => useCounterStore.getState().counter;
