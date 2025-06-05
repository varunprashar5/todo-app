import { STORAGE_KEY_TODOS } from "../constants";

export const loadTodos = () => {
  try {
    const item = localStorage.getItem(STORAGE_KEY_TODOS);
    return item ? JSON.parse(item) : [];
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const saveTodos = (todos) => {
  try {
    localStorage.setItem(STORAGE_KEY_TODOS, JSON.stringify(todos));
  } catch (e) {
    console.error(e);
  }
};
