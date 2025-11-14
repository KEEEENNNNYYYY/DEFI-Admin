import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from "./pages/Login";
import UpdatePage from "./pages/update";
import Details from "./pages/Details";
import Create from "./pages/create";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/update/:id" element={<UpdatePage />} />
        <Route path="/:id" element={<Details />} />
        <Route path="/create" element={<Create />} />
      </Routes>


    </>
  );
}

export default App;


