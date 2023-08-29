import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import "./Login.css";

export const Register = (props) => {
  const [users, setUsers] = useState({});
  const conflictDialog = useRef();
  const history = useHistory();

  const existingUserCheck = () => {
    const apiUrl = `https://localhost:5001/api/users`;
    return fetch(apiUrl)
      .then((res) => res.json())
      .then((users) => !!users.length);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    existingUserCheck().then((userExists) => {
      console.log("userExists:", userExists); // checking the value of the userExists variable
      if (!userExists) {
        fetch("https://localhost:5001/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(users),
        })
          .then((res) => res.json())
          .then((createdUser) => {
            console.log("Response from POST:", createdUser); // Log the response
            if (createdUser.hasOwnProperty("id")) {
              localStorage.setItem("goal_keeper", createdUser.id);
              history.push("/");
            }
          });
      } else {
        // Now, only show the modal if userExists is true
        if (userExists) {
          conflictDialog.current.showModal();
        }
      }
    });
  };

  const updateUsers = (evt) => {
    const copy = { ...users };
    copy[evt.target.id] = evt.target.value;
    setUsers(copy);
  };

  return (
    <main style={{ textAlign: "center" }}>
      <dialog className="dialog dialog--password" ref={conflictDialog}>
        <div>Account with that email address already exists</div>
        <button
          className="button--close"
          onClick={(e) => conflictDialog.current.close()}
        >
          Close
        </button>
      </dialog>

      <form className="form--login" onSubmit={handleRegister}>
        <h1 className="reg-head">Please Register for Goal Keep</h1>
        <fieldset>
          <label htmlFor="name"> Full Name </label>
          <input
            onChange={updateUsers}
            type="text"
            id="name"
            className="form-control"
            placeholder="Enter your name"
            required
            autoFocus
          />
        </fieldset>
        <fieldset>
          <label htmlFor="address"> Address </label>
          <input
            onChange={updateUsers}
            type="text"
            id="address"
            className="form-control"
            placeholder="Street address"
            required
          />
        </fieldset>
        <fieldset>
          <label htmlFor="email"> Email address </label>
          <input
            onChange={updateUsers}
            type="email"
            id="email"
            className="form-control"
            placeholder="Email address"
            required
          />
        </fieldset>
        <fieldset>
          <button type="submit"> Register </button>
        </fieldset>
      </form>
    </main>
  );
};
