import { Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import CreateTodo from "./components/todo/CreateTodo";
import EditTodo from "./components/todo/EditTodo";
import TodoContainer from "./components/todo/TodoContainer";
import Login from "./components/user/Login";
import Signin from "./components/user/Signin";
import Signup from "./components/user/Signup";

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/todos" element={<TodoContainer />} />
        <Route path="/create" element={<CreateTodo />} />
        <Route path="/edit" element={<EditTodo />} />
      </Routes>
    </div>
  );
}

export default App;
