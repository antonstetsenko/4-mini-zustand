import { useEffect, useState } from 'react';
import { Button, Card, Input, Rate, Tag } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useCoffeeStore } from './model/coffee-store';
import './App.css';

function App() {
	const { getCoffeeList, coffeeList, addToCart, clearCart, orderCoffee, address, setAddress, cart } = useCoffeeStore();

	const [text, setText] = useState<string | undefined>('');

	const handleSearch = (text: string) => {
		getCoffeeList({ text });
		setText(text);
	};

	useEffect(() => {
		getCoffeeList();
	}, []);

	return (
		<div className="wrapper">
			<Input placeholder="поиск" value={text} onChange={(e) => handleSearch(e.target.value)} />
			<div style={{ display: 'flex' }}>
				{coffeeList && (
					<div className="cardsContainer">
						{coffeeList.map((coffee) => (
							<Card
								hoverable
								key={coffee.id}
								cover={<img src={coffee.image} />}
								actions={[
									<Button icon={<ShoppingCartOutlined />} key={coffee.name} onClick={() => addToCart(coffee)}>
										{coffee.price}
									</Button>,
								]}
							>
								<Card.Meta title={coffee.name} description={coffee.subTitle} />
								<Tag style={{ marginTop: '24px' }} color="purple">
									{coffee.type}
								</Tag>
								<Rate defaultValue={coffee.rating} disabled allowHalf style={{ marginTop: '24px' }} />
							</Card>
						))}
					</div>
				)}
				<aside className="cart">
					<h1>Заказ</h1>
					{cart && cart.length > 0 ? (
						<>
							{cart.map((item, index) => (
								<span key={index}>{item.name}</span>
							))}
							<Input placeholder="Адрес" value={address} onChange={(e) => setAddress(e.target.value)} />
							<Button type="primary" onClick={orderCoffee} disabled={!address}>
								Сделать заказ
							</Button>
							<Button onClick={clearCart}>Очистить корзину</Button>
						</>
					) : (
						<span>Добавьте напитки</span>
					)}
				</aside>
			</div>
		</div>
	);
}

export default App;
