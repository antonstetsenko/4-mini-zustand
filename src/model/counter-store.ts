import { StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';
import { create } from '../helpers/create';

type counterState = {
	counter: number;
	persistedCounter: number;
};

type counterActions = {
	increment: () => void;
	decrement: () => void;
	changeByAmount: (value: number) => void;
};

const initialState = {
	counter: 0,
	persistedCounter: 0,
};

const counterSlice: StateCreator<counterState & counterActions, [['zustand/persist', unknown]]> = (set, get) => ({
	counter: 0,
	persistedCounter: 0,
	resetStore: () => {
		set(initialState);
	},
	increment: () => {
		const { counter, persistedCounter } = get();
		set({ counter: counter + 1, persistedCounter: persistedCounter + 1 });
	},
	decrement: () => {
		const { counter, persistedCounter } = get();
		set({ counter: counter - 1, persistedCounter: persistedCounter - 1 });
	},
	changeByAmount: (value: number) => {
		const { counter } = get();
		set({ counter: counter + value });
	},
});

export const useCounterStore = create<counterState & counterActions>()(
	persist(counterSlice, {
		name: 'counterStore',
		partialize: (state) => ({ persistedCounter: state.persistedCounter }),
	}),
);
export const changeByAmount = (value: number) => useCounterStore.getState().changeByAmount(value);
export const getCounter = () => useCounterStore.getState().counter;
