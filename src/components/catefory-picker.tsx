import { Button } from 'antd';
import { useShallow } from 'zustand/react/shallow';
import { CoffeeCategoryEnum } from '../types/coffee-types';
import { setParams, useCoffeeStore } from '../model/coffee-store';

export const CategoryPicker = () => {
	const [params] = useCoffeeStore(useShallow((state) => [state.params]));
	return (
		<div>
			{Object.keys(CoffeeCategoryEnum).map((key) => (
				<Button
					key={key}
					danger={params.type === key}
					onClick={() => setParams({ type: CoffeeCategoryEnum[key as keyof typeof CoffeeCategoryEnum] })}
				>
					{key}
				</Button>
			))}
		</div>
	);
};
