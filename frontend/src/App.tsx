import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import agent from "./api/agent";
import Header from "./components/header/Header";
import CreateTodo from "./components/todo/CreateTodo";
import EditTodo from "./components/todo/EditTodo";
import TodoContainer from "./components/todo/TodoContainer";
import Login from "./components/user/Login";
import Signin from "./components/user/Signin";
import Signup from "./components/user/Signup";
import { Todo } from "./models/todo";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const getTodos = async () => {
      const todos = await agent.Todos.todoList();

      setTodos(todos);
    };

    getTodos();
  }, []);

  const handleTodo = (todo: Todo) => {
    setTodos([...todos, todo]);
  };

  const deleteTodo = (id: string) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos([...updatedTodos]);
  };

  const updateTodo = (id: string, updatedTodo: Todo) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo = { ...todo, ...updatedTodo };
        console.log(todo);
      }
      return todo;
    });
    console.log(updatedTodos);

    setTodos([...updatedTodos]);
  };

  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route
          path="/todos"
          element={
            <TodoContainer
              todos={todos}
              deleteTodo={deleteTodo}
              updateTodo={updateTodo}
            />
          }
        />
        <Route
          path="/create"
          element={<CreateTodo handleTodo={handleTodo} />}
        />
        <Route
          path="/edit/:id"
          element={<EditTodo todos={todos} updateTodo={updateTodo} />}
        />
      </Routes>
    </div>
  );
}

export default App;
