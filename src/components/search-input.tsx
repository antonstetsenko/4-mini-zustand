import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { getCoffeeList, useCoffeeStore } from '../model/coffee-store';
import { useUrlStorage } from '../helpers/use-url-storage';

import { Input } from 'antd';

export const SearchInput = () => {
	const [params, setParams] = useCoffeeStore(useShallow((state) => [state.params, state.setParams]));

	useEffect(() => {
		getCoffeeList({ text: params.text });
	}, []);

	useUrlStorage(params, setParams);

	return <Input placeholder="поиск" value={params.text} onChange={(e) => setParams({ text: e.target.value })} />;
};
