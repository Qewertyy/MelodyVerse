import { Route, Routes } from "react-router-dom";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import UserDashboard from "./pages/user";
import "./App.css";
import { useSelector } from "react-redux";
import { AppState } from "./redux/store";
import NotFound from "./pages/notFound";

const App = () => {
  const { token } = useSelector((state: AppState) => state.auth);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={token ? <UserDashboard token={token} /> : <Register />}
          caseSensitive={false}
        />
        <Route path="/register" element={<Register />} caseSensitive={false} />
        <Route path="/login" element={<Login />} caseSensitive={false} />
        <Route path="/signup" element={<Register />} caseSensitive={false} />
        {token && (
          <>
            <Route path="/account" element={<UserDashboard token={token} />} />
            <Route path="/profile" element={<UserDashboard token={token} />} />
          </>
        )}
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </>
  );
};

export default App;
