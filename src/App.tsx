import { SearchInput } from './components/search-input';
import { CardList } from './components/card-list';
import { Cart } from './components/cart';
import { CategoryPicker } from './components/catefory-picker';

import './App.css';

function App() {
	return (
		<div className="wrapper">
			<SearchInput />
			<CategoryPicker />
			<div style={{ display: 'flex' }}>
				<CardList />
				<Cart />
			</div>
		</div>
	);
}

export default App;
