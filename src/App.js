import "./App.css";
import Form from "./components/common/Form";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { app } from "./firebase-config";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleAction = (id) => {
    const authentication = getAuth();

    if (id === 2) {
      createUserWithEmailAndPassword(authentication, email, password)
        .then((response) => {
          console.log(response)
        })
    }
  };

  return (
    <Router>
      <div className="App">
        <>
          <Routes>
            <Route
              path="/login"
              element={
                <Form
                  title="Login"
                  setEmail={setEmail}
                  setPassword={setPassword}
                  handleAction={() => handleAction(1)}
                />
              }
            />
            <Route
              path="/register"
              element={
                <Form
                  title="Register"
                  setEmail={setEmail}
                  setPassword={setPassword}
                  handleAction={() => handleAction(2)}
                />
              }
            />
          </Routes>
        </>
      </div>
    </Router>
  );
}

export default App;
