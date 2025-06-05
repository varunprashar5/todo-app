import { useState } from "react";
import Button from "../../Components/UI/Button";
export default function Todo({ todo, id, deleteTodo, completeTodo, updateTodo, moveTodo }) {
        const [ editing, setEditing ] = useState(false);
        const [ editValue, setEditValue ] = useState(todo.text);

        const save = () => {
                updateTodo(id, editValue);
                setEditing(false);
        };

        return (
                <li
                        className={`shadow list-group-item list-group-item-action m-0 p-2 ${
                                todo.isCompleted ? "completed" : ""
                        }`}
                >
                        <div className="d-flex align-items-center justify-content-between">
                                <div className="flex-grow-1 text-start">
                                        {editing ? (
                                                <input
                                                        value={editValue}
                                                        onChange={(e) => setEditValue(e.target.value)}
                                                        onKeyDown={(e) => e.key === "Enter" && save()}
                                                        className="form-control"
                                                />
                                        ) : (
                                                <span onClick={() => completeTodo(id)}>{todo.text}</span>
                                        )}
                                        {todo.dueDate && (
                                                <small className="text-muted ms-2 todo-date">{todo.dueDate}</small>
                                        )}
                                </div>
                                <div className="btn-group btn-group-sm ms-2" role="group">
                                        {editing ? (
                                                <Button className="btn btn-success" onClick={save} value="Save" />
                                        ) : (
                                                <Button className="btn btn-secondary" onClick={() => setEditing(true)} value="Edit" />
                                        )}
                                        <Button className="btn btn-danger" onClick={() => deleteTodo(id)} value="X" />
                                        <Button className="btn btn-light" onClick={() => moveTodo(id, -1)} value="↑" />
                                        <Button className="btn btn-light" onClick={() => moveTodo(id, 1)} value="↓" />
                                </div>
                        </div>
                </li>
        );
}
