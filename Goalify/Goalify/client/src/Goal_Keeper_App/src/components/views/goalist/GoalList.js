import React, { useState, useEffect } from "react";
import { getMilestones, ListOfGoals } from "../../ApiManager";
import "./GoalList.css";
import { Link, useParams, useHistory } from "react-router-dom";
import { Col, Container, Row, Button } from "react-bootstrap";

export const GoalList = () => {
  const history = useHistory();
  const [goallist, setGoalList] = useState([]);
  const { goalsId } = useParams();
  console.log(goalsId);
  const [milestone, setMilestone] = useState({});

  useEffect(() => {
    ListOfGoals().then((data) => {
      setGoalList(
        data.filter((item) => {
          console.log(item);
          console.log(localStorage.getItem("goal_keeper"));
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

  // const deleteMilestone = (id) => {
  //   fetch(`api/milestones/${id}`, {
  //     method: "DELETE",
  //   });
  // };

  const deleteGoal = (id) => {
    console.log("Deleting goal with id:", id);
    fetch(`/api/goals/${id}`, {
      method: "DELETE",
    }).then(() => {
      history.push("/mygoals");
    });
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
              style={{ backgroundColor: "blue", color: "white" }} // Change the color to your desired color
            >
              Create a goal
            </Button>

            <Button
              className="create_goal-btn btn btn-success"
              onClick={() => {
                history.push("/filterbyweek");
              }}
              style={{ backgroundColor: "green", color: "white" }} // Change the color to your desired color
            >
              This week's goals
            </Button>

            <Button
              className="create_goal-btn btn btn-warning"
              onClick={() => {
                history.push("/filterbymonth");
              }}
              style={{ backgroundColor: "orange", color: "white" }} // Change the color to your desired color
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
                            <div>Note updates: {goal.goalNotes}</div>
                            <div>
                              Projected Completion Date:{" "}
                              {unixTime(goal.goalDate)}
                            </div>
                          </div>
                        </Link>
                        <div className="edit-btn-container">
                          <Button
                            className="edit_goal-btn btn btn-secondary custom-margin" // Add the custom-margin class
                            onClick={() => {
                              history.push(`/goalnotes/${goal.id}`);
                            }}
                          >
                            EDIT
                          </Button>

                          <Button
                            className="edit_goal-btn btn btn-danger" // Keep class as "btn-danger" for red color
                            onClick={() => {
                              deleteGoal(goal.id);
                            }}
                          >
                            DELETE
                          </Button>
                        </div>

                        {/* <Button
                          className="drop-btn"
                          style={
                            {
                              background: `${
                                 goal.categoryid && goal.categoryid.color
                                  ? goal.categoryid.color
                                  : "#ccc"
                              }`,
                            }
                          }
                          disabled
                        >
                          {goal.category && goal.category.category}
                        </Button>

                        {console.log(goal.categoryid.color)} */}
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
