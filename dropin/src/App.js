import "./App.css";
import Homepage from "./pages/Homepage";
import SpotDetail from "./pages/SpotDetail";
import LoginPage from "./pages/LoginPage";
import Header from "./components/Header";
import AddSpot from "./pages/AddSpot";
import UpdateSpot from "./pages/UpdateSpot";
import Footer from "./components/Footer";
import AuthContext from "./context/AuthContext";
import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import Register from "./pages/Register";

function App() {
  let { user } = useContext(AuthContext);
  return (
    <div className="App">
      <div>
        <Header />
        <main>
          <Routes>
            <Route
              path="/"
              exact
              element={!user ? <LoginPage /> : <Homepage />}
            />
            <Route
              path="/spots/:id"
              element={!user ? <LoginPage /> : <SpotDetail />}
            />
            <Route
              path="/addSpot"
              element={!user ? <LoginPage /> : <AddSpot />}
            />
            <Route
              path="/updateSpot/:id"
              element={!user ? <LoginPage /> : <UpdateSpot />}
            />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default App;
