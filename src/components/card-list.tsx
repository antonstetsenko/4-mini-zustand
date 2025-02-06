import { useShallow } from 'zustand/react/shallow';
import { useCoffeeStore } from '../model/coffee-store';
import { CoffeeCard } from './coffee-card';

export const CardList = () => {
	const [coffeeList] = useCoffeeStore(useShallow((state) => [state.coffeeList]));

	return (
		<>
			{coffeeList && (
				<div className="cardsContainer">
					{coffeeList.map((coffee) => (
						<CoffeeCard coffee={coffee} key={coffee.id} />
					))}
				</div>
			)}
		</>
	);
};
