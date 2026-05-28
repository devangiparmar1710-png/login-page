import React, { useState } from "react";
import axios from "axios";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // signup
  const handleSignup = async () => {
    const res = await axios.post("http://localhost:5000/signup", {
      email,
      password,
    });
    alert(res.data);
  };

  // login
  const handleLogin = async () => {
    const res = await axios.post("http://localhost:5000/login", {
      email,
      password,
    });
    alert(res.data);
  };

  return (
  <div className="container">
    <div className="form-box">
      <h2>{isLogin ? "Login" : "Signup"}</h2>

      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

      <button onClick={isLogin ? handleLogin : handleSignup}>
        {isLogin ? "Login" : "Signup"}
      </button>

      <p>
        {isLogin ? "No account?" : "Already have account?"}
        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Signup" : "Login"}
        </button>
      </p>
    </div>
  </div>
);
}

export default App;