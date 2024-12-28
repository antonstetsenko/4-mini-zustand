import { useState } from 'react';
import { Card, Checkbox, Input } from 'antd';
import { useTodoStore } from './model/todo-store';

import './App.css';

function App() {
	const { addTodo, changeIsCompleted, todos } = useTodoStore();
	const [value, setValue] = useState<string>('');
	return (
		<div className="wrapper">
			<Input
				style={{ width: 300 }}
				onChange={(e) => setValue(e.target.value)}
				value={value}
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						addTodo(value);
						setValue('');
					}
				}}
			/>
			{todos.map((todo, index) => (
				<Card className="card" key={todo.title}>
					<Checkbox checked={todo.isCompleted} onChange={() => changeIsCompleted(index)} />
					<span>{todo.title}</span>
				</Card>
			))}
		</div>
	);
}

export default App;
