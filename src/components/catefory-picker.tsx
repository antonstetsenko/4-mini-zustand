import { Button } from 'antd';
import { CoffeeTypeEnum } from '../types/coffee-types';
import { setParams, useCoffeeStore } from '../model/coffee-store';
import { useShallow } from 'zustand/react/shallow';

export const CategoryPicker = () => {
	const [params] = useCoffeeStore(useShallow((state) => [state.params]));

	return (
		<div>
			{Object.keys(CoffeeTypeEnum).map((key) => (
				<Button
					key={key}
					danger={params.type === key}
					onClick={() => {
						setParams({
							type: CoffeeTypeEnum[key as keyof typeof CoffeeTypeEnum],
						});
					}}
				>
					{key}
				</Button>
			))}
		</div>
	);
};
