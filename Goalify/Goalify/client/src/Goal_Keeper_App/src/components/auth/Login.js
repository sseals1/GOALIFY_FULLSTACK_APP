import React, { useRef, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Login.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const existDialog = useRef();
  const history = useHistory();

  const existingUserCheck = () => {
    return fetch(`/api/users?email=${email}`)
      .then((res) => res.json())
      .then((users) => {
        const user = users.find((u) => u.email === email);
        return user ? user : null;
      });
  };
  console.log(email);
  const handleLogin = (e) => {
    e.preventDefault();
    existingUserCheck().then((user) => {
      if (user) {
        console.log(user);
        const userId = Number(user.id);
        console.log(userId);
        localStorage.setItem("goal_keeper", userId);
        history.push("/mygoals");
      } else {
        existDialog.current.showModal();
      }
    });
  };

  useEffect(() => {
    const handleUnload = () => {
      localStorage.removeItem("goal_keeper");
    };
    window.addEventListener("beforeunload", handleUnload);
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  return (
    <main className="container--login">
      <dialog className="dialog dialog--auth" ref={existDialog}>
        <div>User does not exist</div>
        <button
          className="button--close"
          onClick={(e) => existDialog.current.close()}
        >
          Close
        </button>
      </dialog>

      <section>
        <form className="form--login" onSubmit={handleLogin}>
          <div className="form-title">
            <h1>Welcome to Gaolify</h1>
            <h2>Please sign in to get started</h2>
          </div>
          <fieldset>
            <label htmlFor="inputEmail"> Email address </label>
            <input
              type="email"
              onChange={(evt) => setEmail(evt.target.value)}
              className="form-control"
              placeholder="Email address"
              required
              autoFocus
            />
          </fieldset>
          <fieldset>
            <button type="submit">Sign in</button>
          </fieldset>
        </form>
      </section>
      <section className="link--register">
        <Link to="/register">Not a member yet?</Link>
      </section>
    </main>
  );
};
