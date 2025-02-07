import { getCounter, incrementByAmount } from '../model/counter-store';

export const addTen = () => {
	const counter = getCounter();
	console.log(counter);
	if (counter >= 0) {
		incrementByAmount(10);
	} else {
		incrementByAmount(-10);
	}
};
