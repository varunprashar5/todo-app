import { useState, useEffect } from "react";
import { loadTodos, saveTodos } from "../utils/storage";

export default function useTodos() {
  const [todos, setTodos] = useState(() => loadTodos());

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const addTodo = (text, dueDate) => {
    if (!text.trim()) return;
    const newTodo = { text, dueDate, isCompleted: false };
    setTodos([newTodo, ...todos]);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((_, index) => index !== id));
  };

  const completeTodo = (id) => {
    const newTodos = [...todos];
    newTodos[id].isCompleted = !newTodos[id].isCompleted;
    setTodos(newTodos);
  };

  const updateTodo = (id, newText) => {
    const newTodos = [...todos];
    newTodos[id].text = newText;
    setTodos(newTodos);
  };

  const moveTodo = (id, direction) => {
    const newTodos = [...todos];
    const target = id + direction;
    if (target < 0 || target >= newTodos.length) return;
    const tmp = newTodos[id];
    newTodos[id] = newTodos[target];
    newTodos[target] = tmp;
    setTodos(newTodos);
  };

  return { todos, addTodo, deleteTodo, completeTodo, updateTodo, moveTodo };
}
