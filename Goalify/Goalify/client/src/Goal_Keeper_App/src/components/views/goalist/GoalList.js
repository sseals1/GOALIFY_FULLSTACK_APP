// import React, { useState, useEffect } from "react";
// import { getMilestones, ListOfGoals } from "../../ApiManager";
// import "./GoalList.css";
// // import { format } from 'date-fns'
// import { Link, useParams, useHistory } from "react-router-dom";
// import { Col, Container, Row } from "react-bootstrap";
// // import { FilterByWeek } from "../filteredGoals/FilterByWeek";
// // import { FilterByMonth } from "../filteredGoals/FilterByMonth";

// export const GoalList = () => {
//   const history = useHistory();
//   const [goallist, setGoalList] = useState([]);
//   const { goalsId } = useParams();
//   // const [categories, setCategories] = useState([]);
//   const [milestone, setMilestone] = useState({});

//   // useEffect(() => {
//   //   getCategories()
//   //   .then((data) => {
//   //     setCategories(data);
//   //   });
//   // }, []);

//   useEffect(() => {
//     ListOfGoals().then((data) => {
//       setGoalList(
//         data.filter((item) => {
//           return item.userId === parseInt(localStorage.getItem("goal_keeper"));
//         })
//       );
//     });
//   }, []);

//   useEffect(() => {
//     getMilestones().then((data) => {
//       setMilestone(data);
//     });
//   }, []);

//   const unixTime = (time) => {
//     const myDate = new Date(time);
//     const myDateString = `${
//       myDate.getDate() + 1
//     }/${myDate.getMonth()}/${myDate.getFullYear()}`;
//     return myDateString;
//   };

//   const saveMilestone = () => {
//     const milestoneChecker = milestone.find((mileObj) => {
//       return (
//         mileObj.userId === parseInt(localStorage.getItem("goal_keeper")) &&
//         mileObj.goalId === parseInt(goalsId)
//       );
//     });

//     if (milestoneChecker) {
//       history.push("/milefilled");
//     }
//   };

//   return (
//     <>
//       <div className="container">
//         <div className="myGoals">
//           <h4 className="title-myGoals">My Goals</h4>
//           <div className="goalLinks">
//             <button
//               className="create_goal-btn"
//               onClick={() => {
//                 history.push("/goalform");
//               }}
//             >
//               Create a goal
//             </button>

//             <button
//               className="create_goal-btn"
//               onClick={() => {
//                 history.push("/filterbyweek");
//               }}
//             >
//               This week's goals
//             </button>

//             <button
//               className="create_goal-btn"
//               onClick={() => {
//                 history.push("/filterbymonth");
//               }}
//             >
//               This month's goals
//             </button>
//           </div>
//           {goallist
//             .map((goal) => {
//               return (
//                 <div key={goal.id} className="goal_list">
//                   <Container>
//                     <Row xs={12}>
//                       <Col className="goal_list1" md={8}>
//                         <Link onClick={saveMilestone} to={`/goals/${goal.id}`}>
//                           <div className="goal_props">
//                             <div>Goal description: {goal.goalDescription}</div>
//                             <div>Goal objectives: {goal.goalObjective}</div>
//                             <div>Notes: {goal.goalNotes}</div>
//                             <div>Note updates: {goal.notes}</div>
//                             <div>
//                               Completion Date: {unixTime(goal.goalDate)}
//                             </div>
//                           </div>
//                         </Link>
//                         <button
//                           className="edit_goal-btn"
//                           onClick={() => {
//                             history.push(`/goalnotes/${goal.id}`);
//                           }}
//                         >
//                           Edit Notes
//                         </button>
//                         <button
//                           className="drop-btn"
//                           style={{ background: `${goal.category?.color}` }}
//                           // onClick={editNotes}
//                         >
//                           {goal.category?.category}
//                         </button>
//                       </Col>
//                     </Row>
//                   </Container>
//                 </div>
//               );
//             })
//             .reverse()}
//         </div>
//       </div>
//     </>
//   );
// };

import React, { useState, useEffect } from "react";
import { getMilestones, ListOfGoals } from "../../ApiManager";
import "./GoalList.css";
import { Link, useParams, useHistory } from "react-router-dom";
import { Col, Container, Row, Button } from "react-bootstrap";

export const GoalList = () => {
  const history = useHistory();
  const [goallist, setGoalList] = useState([]);
  const { goalsId } = useParams();
  const [milestone, setMilestone] = useState({});

  useEffect(() => {
    ListOfGoals().then((data) => {
      setGoalList(
        data.filter((item) => {
          return item.userId === parseInt(localStorage.getItem("goal_keeper"));
        })
      );
    });
  }, []);

  useEffect(() => {
    getMilestones().then((data) => {
      setMilestone(data);
    });
  }, []);

  const unixTime = (time) => {
    const myDate = new Date(time);
    const myDateString = `${
      myDate.getDate() + 1
    }/${myDate.getMonth()}/${myDate.getFullYear()}`;
    return myDateString;
  };

  const saveMilestone = () => {
    const milestoneChecker = milestone.find((mileObj) => {
      return (
        mileObj.userId === parseInt(localStorage.getItem("goal_keeper")) &&
        mileObj.goalId === parseInt(goalsId)
      );
    });

    if (milestoneChecker) {
      history.push("/milefilled");
    }
  };

  return (
    <>
      <div className="container">
        <div className="myGoals">
          <h4 className="title-myGoals">My Goals</h4>
          <div className="goalLinks">
            <Button
              className="create_goal-btn btn btn-primary"
              onClick={() => {
                history.push("/goalform");
              }}
            >
              Create a goal
            </Button>

            <Button
              className="create_goal-btn btn btn-outline-secondary"
              onClick={() => {
                history.push("/filterbyweek");
              }}
            >
              This week's goals
            </Button>

            <Button
              className="create_goal-btn btn btn-outline-secondary"
              onClick={() => {
                history.push("/filterbymonth");
              }}
            >
              This month's goals
            </Button>
          </div>
          {goallist
            .map((goal) => {
              return (
                <div key={goal.id} className="goal_list">
                  <Container>
                    <Row xs={12}>
                      <Col className="goal_list1" md={8}>
                        <Link onClick={saveMilestone} to={`/goals/${goal.id}`}>
                          <div className="goal_props">
                            <div>Goal description: {goal.goalDescription}</div>
                            <div>Goal objectives: {goal.goalObjectives}</div>
                            <div>Notes: {goal.notes}</div>
                            {/* {console.log(goal)} */}
                            <div>Note updates: {goal.goalNotes}</div>
                            <div>
                              Completion Date: {unixTime(goal.goalDate)}
                            </div>
                          </div>
                        </Link>
                        <Button
                          className="edit_goal-btn btn btn-secondary"
                          onClick={() => {
                            history.push(`/goalnotes/${goal.id}`);
                          }}
                        >
                          EDIT
                        </Button>
                        <Button
                          className="drop-btn"
                          style={{ background: `${goal.categoryid?.color}` }}
                          disabled
                        >
                          {goal.category?.category}
                        </Button>
                      </Col>
                    </Row>
                  </Container>
                </div>
              );
            })
            .reverse()}
        </div>
      </div>
    </>
  );
};
