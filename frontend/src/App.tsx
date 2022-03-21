import { Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import CreateTodo from "./components/todo/CreateTodo";
import EditTodo from "./components/todo/EditTodo";
import TodoContainer from "./components/todo/TodoContainer";
import Login from "./components/user/Login";
import Signin from "./components/user/Signin";
import Signup from "./components/user/Signup";
import User from "./components/user/User";
import { AuthProvider } from "./contexts/AuthContext";
import { TodoProvider } from "./contexts/TodoContext";
import PrivateRoute from "./models/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <TodoProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route
            path="/todos"
            element={
              <PrivateRoute>
                <TodoContainer />
              </PrivateRoute>
            }
          />
          <Route
            path="/create"
            element={
              <PrivateRoute>
                <CreateTodo />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <PrivateRoute>
                <EditTodo />
              </PrivateRoute>
            }
          />
          <Route
            path="/user"
            element={
              <PrivateRoute>
                <User />
              </PrivateRoute>
            }
          />
        </Routes>
      </TodoProvider>
    </AuthProvider>
  );
}

export default App;
