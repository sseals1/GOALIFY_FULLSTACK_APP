// import React, { useRef, useState, useEffect } from "react";
// import { Link, useHistory } from "react-router-dom";
// import "./Login.css";

// export const Login = () => {
//   const [email, set] = useState("");
//   const existDialog = useRef();
//   const history = useHistory();

//   const existingUserCheck = () => {
//     return fetch(`/api/users?email=${email}`)
//       .then((res) => res.json())
//       .then((user) => (user.length ? user[0] : false));
//   };

//   const handleLogin = (e) => {
//     e.preventDefault();
//     existingUserCheck().then((exists) => {
//       if (exists) {
//         localStorage.setItem("goal_keeper", exists.id);
//         history.push("/goalform");
//       } else {
//         existDialog.current.showModal();
//       }
//     });
//   };

//   useEffect(() => {
//     const handleUnload = () => {
//       localStorage.removeItem("goal_keeper");
//     };
//     window.addEventListener("beforeunload", handleUnload);
//     return () => {
//       window.removeEventListener("beforeunload", handleUnload);
//     };
//   }, []);

//   return (
//     <main className="container--login">
//       <dialog className="dialog dialog--auth" ref={existDialog}>
//         <div>User does not exist</div>
//         <button
//           className="button--close"
//           onClick={(e) => existDialog.current.close()}
//         >
//           Close
//         </button>
//       </dialog>

//       <section>
//         <form className="form--login" onSubmit={handleLogin}>
//           <div className="form-title">
//             <h1>Welcome to Gaolify</h1>
//             <h2>Please sign in to get started</h2>
//           </div>
//           <fieldset>
//             <label htmlFor="inputEmail"> Email address </label>
//             <input
//               type="email"
//               onChange={(evt) => set(evt.target.value)}
//               className="form-control"
//               placeholder="Email address"
//               required
//               autoFocus
//             />
//           </fieldset>
//           <fieldset>
//             <button type="submit">Sign in</button>
//           </fieldset>
//         </form>
//       </section>
//       <section className="link--register">
//         <Link to="/register">Not a member yet?</Link>
//       </section>
//     </main>
//   );
// };

import React, { useRef, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Login.css";

export const Login = () => {
  const [email, set] = useState("");
  const existDialog = useRef();
  const history = useHistory();

  const existingUserCheck = () => {
    return fetch(`/api/users?email=${email}`)
      .then((res) => res.json())
      .then((user) => (user.length ? user[0] : false));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    existingUserCheck().then((exists) => {
      if (exists) {
        localStorage.setItem("goal_keeper", exists.id);
        history.push("/goalform");
      } else {
        existDialog.current.showModal();
      }
    });
  };

  useEffect(() => {
    const handleUnload = () => {
      console.log("Unloading app...");
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
              onChange={(evt) => set(evt.target.value)}
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
