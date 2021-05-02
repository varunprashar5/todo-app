import Todo from "./Todo";

export default function TodoList({ todos, deleteTodo, completeTodo }) {
	return (
		<div className="row-md-4 justify-content-center mt-2">
			<ul className="list-group">
				{todos.map((todo, index) => {
					return <Todo deleteTodo={deleteTodo} key={index} completeTodo={completeTodo} id={index} todo={todo} />;
				})}
			</ul>
		</div>
	);
}
