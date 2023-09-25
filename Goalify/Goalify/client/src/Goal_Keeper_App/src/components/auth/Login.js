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
  const [email, setEmail] = useState("");
  const existDialog = useRef();
  const history = useHistory();

  const existingUserCheck = (email) => {
    console.log("Checking for user with email:", email);
    const apiUrl = `https://localhost:5001/api/users/?email=${email}`;
    console.log(apiUrl);

    return fetch(apiUrl)
      .then((res) => {
        if (res.status === 404) {
          // User not found, handle this case appropriately
          throw new Error("User not found");
        }
        if (!res.ok) {
          throw new Error(`Fetch error: ${res.status} - ${res.statusText}`);
        }
        return res.json();
      })

      .then((user) => {
        console.log("User found:", user);
        return user.length ? user[0] : false;
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        // Handle the error as needed (e.g., display an error message to the user)
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    existingUserCheck(email).then((exists) => {
      if (exists) {
        console.log(exists);
        localStorage.setItem("goal_keeper", exists.id);
        console.log("Setting goal_keeper:", exists.id);
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
