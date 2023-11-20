// import React from "react";
// import { Route, Redirect } from "react-router-dom";
// import { ApplicationViews } from "./ApplicationViews";
// import { NavBar } from "./nav/NavBar";
// import { Login } from "./auth/Login";
// import { Register } from "./auth/Register";
// import "./Goalify.css";
// import { NavigationBar } from "./nav/NavigationBar";
// import OpenAIChatbot from "./OpenAIChatBot/OpenAIChatBot";

// export const Goalify = () => (
//   <>
//     <Route
//       render={() => {
//         if (localStorage.getItem("goal_keeper")) {
//           return (
//             <>
//               <NavigationBar />
//               <div className="container d-flex flex-row-reverse">
//                 <OpenAIChatbot />
//                 <ApplicationViews />
//               </div>
//             </>
//           );
//         } else {
//           return <Redirect to="/login" />;
//         }
//       }}
//     />

//     <Route path="/login">
//       <Login />
//     </Route>

//     <Route path="/register">
//       <Register />
//     </Route>
//   </>
// );

import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ApplicationViews } from "./ApplicationViews";
import { NavBar } from "./nav/NavBar";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import "./Goalify.css";
import { NavigationBar } from "./nav/NavigationBar";
import OpenAIChatbot from "./OpenAIChatBot/OpenAIChatBot";

export const Goalify = () => (
  <>
    <Route
      render={() => {
        if (localStorage.getItem("goal_keeper")) {
          return (
            <>
              <NavigationBar />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "75% 25%",
                  height: "100vh",
                }}
              >
                <div style={{ gridColumn: "1 / 2", padding: "20px" }}>
                  <header
                    style={{ backgroundColor: "#f3f3f3", padding: "10px" }}
                  >
                    {/* <h1 style={{ margin: "50" }}>Goalify</h1> */}
                  </header>
                  <div style={{ padding: "20px" }}>
                    <ApplicationViews />
                  </div>
                </div>
                <div
                  className="chatbot-container"
                  style={{
                    backgroundColor: "#f3f3f3",
                    padding: "20px",
                    borderLeft: "1px solid #ddd",
                    gridColumn: "2 / 3",
                    width: "300px",
                  }}
                >
                  <OpenAIChatbot />
                </div>
              </div>
            </>
          );
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />

    <Route path="/login">
      <Login />
    </Route>

    <Route path="/register">
      <Register />
    </Route>
  </>
);
