import { changeByAmount, getCounter } from '../model/counter-store';

export const addTen = () => {
	const counter = getCounter();
	changeByAmount(counter < 0 ? -10 : 10);
};
