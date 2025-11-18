import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from "./pages/Login";
import UpdatePage from "./pages/update";
import Details from "./pages/Details";
import Create from "./pages/create";
import ProtectedRoute from './components/ProtectedRoute.jsx';

function App() {
  return (
    <Routes>
      {/* Routes publiques */}
      <Route path="/login" element={<Login />} />

      {/* Routes protégées */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/update/:id"
        element={
          <ProtectedRoute>
            <UpdatePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/:id"
        element={
          <ProtectedRoute>
            <Details />
          </ProtectedRoute>
        }
      />
      <Route
        path="/create"
        element={
          <ProtectedRoute>
            <Create />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
