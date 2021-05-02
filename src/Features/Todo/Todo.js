import Button from "../../Components/UI/Button";

export default function Todo({ todo, id, deleteTodo, completeTodo }) {
	return (
		<li
			style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
			key={id}
			className="shadow list-group-item list-group-item-action text-center pointer m-0 p-2"
		>
			<span onClick={() => completeTodo(id)}>{todo.text}</span>
			<Button
				onClick={() => {
					deleteTodo(id);
				}}
				className="btn btn-danger pointer float-right"
				value="X"
			/>
		</li>
	);
}
