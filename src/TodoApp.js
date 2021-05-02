import { useState } from "react";
import "./App.css";
import Header from "./Components/Header";
import TextField from "./Components/UI/TextField";
import Button from "./Components/UI/Button";
import TodoList from "./Features/Todo/TodoList";

function TodoApp() {
	const [ todoValue, setVal ] = useState("");
	const [ todos, setTodos ] = useState([]);

	const addTodo = () => {
		const newTodo = { text: todoValue, completed: false };
		setTodos([ newTodo, ...todos ]);
		setVal("");
	};

	const onKeyPressHandler = (e) => {
		if (e.charCode === 13) {
			addTodo();
		}
	};

	const onChangeHandler = (e) => {
		setVal(e.target.value);
	};

	const completeTodo = (id) => {
		const newTodos = [ ...todos ];
		newTodos[id].isCompleted = !newTodos[id].isCompleted;
		setTodos(newTodos);
	};

	const deleteTodo = (id) => {
		const newTodos = todos.filter((_, index) => index !== id);
		setTodos(newTodos);
	};

	return (
		<div className="container">
			<div className="row justify-content-center">
				<div className="col-md-4">
					<Header />

					<div className="row gx-0 pt-2">
						<div className="col-md-8 col-sm-8">
							<TextField
								onKeyPress={onKeyPressHandler}
								value={todoValue}
								onChange={onChangeHandler}
								placeholder="Things to be done..."
							/>
						</div>
						<div className="col-md-4 col-sm-4">
							<Button onClick={addTodo} className="btn btn-primary pointer float-right" value="Add Todo" />
						</div>
					</div>

					{todos.length > 0 && <TodoList completeTodo={completeTodo} deleteTodo={deleteTodo} todos={todos} />}
				</div>
			</div>
		</div>
	);
}

export default TodoApp;
