import { Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import CreateTodo from "./components/todo/CreateTodo";
import EditTodo from "./components/todo/EditTodo";
import TodoContainer from "./components/todo/TodoContainer";

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<TodoContainer />} />
        <Route path="/create" element={<CreateTodo />} />
        <Route path="/edit" element={<EditTodo />} />
      </Routes>
    </div>
  );
}

export default App;
