import "./styles.css";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import { app, database } from "./firebaseConfig";
import Home from "./components/Home";
import Editor from "./components/Editor";
export default function App() {
  return (
    <div className="app">
      <h1> Docs Management </h1>

      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/home" element={<Home database={database} />} />
        <Route path="/editor/:id" element={<Editor database={database} />} />
      </Routes>
    </div>
  );
}
