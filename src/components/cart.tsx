import { useCoffeeStore } from '../model/coffee-store';
import { useShallow } from 'zustand/react/shallow';

export const Cart = () => {
	const [cart] = useCoffeeStore(useShallow((state) => [state.cart]));

	return (
		<>
			{cart ? (
				<>
					{cart.map((item) => (
						<span key={item.id}>{item.name}</span>
					))}
				</>
			) : (
				<span>Your cart is empty</span>
			)}
		</>
	);
};
