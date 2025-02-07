import { Input } from 'antd';
import { setParams, useCoffeeStore } from '../model/coffee-store';
import { useUrlParamsStore } from '../helpers/use-url-storage';

import { useShallow } from 'zustand/react/shallow';

import { useCustomQuery } from '../helpers/use-custom-query';

export const SearchInput = () => {
	const [params] = useCoffeeStore(useShallow((s) => [s.params]));

	useUrlParamsStore(params, setParams);
	useCustomQuery(params);

	return <Input placeholder="Search" value={params?.text} onChange={(e) => setParams({ text: e.target.value })} />;
};
