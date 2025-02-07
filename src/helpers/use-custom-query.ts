import { useQuery } from '@tanstack/react-query';
import { getCoffeeList } from '../model/coffee-store';

import { CoffeeQueryParams } from '../types/coffee-types';

export const useCustomQuery = (params: CoffeeQueryParams) => {
	const { status, isLoading } = useQuery({
		queryKey: ['params', params],
		queryFn: () => getCoffeeList(params),
	});

	return { status, isLoading };
};
