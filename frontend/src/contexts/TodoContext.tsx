import React, { createContext, useContext, useState } from "react";
import { Todo } from "../models/todo";

interface ITodoContext {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  createTodo: (todo: Todo) => void;
  updateTodo: (id: string, todo: Todo) => void;
  deleteTodo: (id: string) => void;
}

const TodoContext = createContext<ITodoContext>({
  todos: [],
  setTodos() {},
  createTodo() {},
  deleteTodo() {},
  updateTodo() {},
});

const TodoProvider = (props: any) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const createTodo = (todo: Todo) => {
    setTodos([...todos, todo]);
  };

  const updateTodo = (id: string, updatedTodo: Todo) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo = { ...todo, ...updatedTodo };
      }
      return todo;
    });

    setTodos([...updatedTodos]);
  };

  const deleteTodo = (id: string) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos([...updatedTodos]);
  };

  return (
    <TodoContext.Provider
      value={{ todos, setTodos, createTodo, updateTodo, deleteTodo }}
      {...props}
    />
  );
};

const useTodoContext = () => {
  return useContext(TodoContext);
};

export { TodoProvider, useTodoContext };
