// Main application component rendering the todo list UI
import { useState } from "react";
import "./App.css";
import Header from "./Components/Header";
import TextField from "./Components/UI/TextField";
import Button from "./Components/UI/Button";
import TodoList from "./Features/Todo/TodoList";
import useTodos from "./hooks/useTodos";
import {
  FILTER_ALL,
  FILTER_ACTIVE,
  FILTER_COMPLETED
} from "./constants";

function TodoApp() {
        const [ todoValue, setVal ] = useState("");
        const [ dueDate, setDueDate ] = useState("");
        const [ filter, setFilter ] = useState(FILTER_ALL);
        // manage todo state via custom hook with localStorage persistence
        const {
                todos,
                addTodo,
                deleteTodo,
                completeTodo,
                updateTodo,
                moveTodo
        } = useTodos();

        const onAdd = () => {
                addTodo(todoValue, dueDate);
                setVal("");
                setDueDate("");
        };

        const onKeyPressHandler = (e) => {
                if (e.charCode === 13) {
                        onAdd();
                }
        };

        const onChangeHandler = (e) => {
                setVal(e.target.value);
        };

        const onDateChange = (e) => {
                setDueDate(e.target.value);
        };

        // derive filtered list based on current filter state
        const filteredTodos = todos.filter((t) => {
                if (filter === FILTER_ACTIVE) return !t.isCompleted;
                if (filter === FILTER_COMPLETED) return t.isCompleted;
                return true;
        });

        return (
                <div className="container">
                        <div className="row justify-content-center">
                                <div className="col-md-6">
                                        <Header />

                                        <div className="row gx-0 pt-2 mb-2">
                                                <div className="col-sm-7 mb-1 mb-sm-0">
                                                        <TextField
                                                                onKeyPress={onKeyPressHandler}
                                                                value={todoValue}
                                                                onChange={onChangeHandler}
                                                                placeholder="Things to be done..."
                                                        />
                                                </div>
                                                <div className="col-sm-3 mb-1 mb-sm-0">
                                                        <input className="form-control" type="date" value={dueDate} onChange={onDateChange} />
                                                </div>
                                                <div className="col-sm-2 text-end">
                                                        <Button onClick={onAdd} className="btn btn-primary pointer w-100" value="Add" />
                                                </div>
                                        </div>

                                        <div className="btn-group mb-3" role="group">
                                                <button type="button" className={`btn btn-outline-secondary ${filter === FILTER_ALL ? "active" : ""}`} onClick={() => setFilter(FILTER_ALL)}>All</button>
                                                <button type="button" className={`btn btn-outline-secondary ${filter === FILTER_ACTIVE ? "active" : ""}`} onClick={() => setFilter(FILTER_ACTIVE)}>Active</button>
                                                <button type="button" className={`btn btn-outline-secondary ${filter === FILTER_COMPLETED ? "active" : ""}`} onClick={() => setFilter(FILTER_COMPLETED)}>Completed</button>
                                        </div>

                                        {filteredTodos.length > 0 && (
                                                <TodoList
                                                        moveTodo={moveTodo}
                                                        updateTodo={updateTodo}
                                                        completeTodo={completeTodo}
                                                        deleteTodo={deleteTodo}
                                                        todos={filteredTodos}
                                                />
                                        )}
                                </div>
                        </div>
                </div>
        );
}

export default TodoApp;
