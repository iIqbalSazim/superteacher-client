import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import { ProtectedRouteProps, AlreadyLoggedInProps } from "./Types/AppTypes";
import Registration from "./Pages/Registration/Registration";
import Login from "./Pages/Login/Login";
import Landing from "./Pages/Landing/Landing";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Profile from "./Pages/Profile/Profile";
import Header from "./Shared/Components/Header/Header";
import ClassroomWithProvider from "./Pages/Classroom/ClassroomWithProvider";

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem("token");
  let location = useLocation();

  if (!token) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return (
    <>
      <Header />
      {children}
    </>
  );
};

const NotFound: React.FC = () => {
  return <Navigate to="/dashboard" />;
};

const AlreadyLoggedIn: React.FC<AlreadyLoggedInProps> = ({ children }) => {
  const token = localStorage.getItem("token");
  let location = useLocation();

  if (token) {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/classroom/:id/:tabValue"
          element={
            <ProtectedRoute>
              <ClassroomWithProvider />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/:id"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <AlreadyLoggedIn>
              <Login />
            </AlreadyLoggedIn>
          }
        />
        <Route
          path="/register/:role"
          element={
            <AlreadyLoggedIn>
              <Registration />
            </AlreadyLoggedIn>
          }
        />
        <Route
          path="/"
          element={
            <AlreadyLoggedIn>
              <Landing />
            </AlreadyLoggedIn>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
