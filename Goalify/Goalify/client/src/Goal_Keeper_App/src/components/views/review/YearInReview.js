import React, { useEffect, useState } from "react";
import {
  getMilestones,
  GoalCategory,
  GoalPriority,
  ListOfGoals,
  TimeFrame,
} from "../../ApiManager";
import { Container, Row, Col } from "react-bootstrap";
import "./YearInReview.css";

export const YearInReview = () => {
  const [goals, setGoals] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [categories, setCategories] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [terms, setTerms] = useState([]);

  const getFilteredGoals = () => {
    ListOfGoals().then((data) => {
      setGoals(
        data.filter((item) => {
          return item.userId === parseInt(localStorage.getItem("goal_keeper"));
        })
      );
    });
  };

  useEffect(() => {
    getFilteredGoals();
  }, []);

  const getFilteredMilestones = () => {
    getMilestones().then((data) => {
      const filteredMilestones = data.filter((item) => {
        return item.id === goals.milestoneId;
      });
      setMilestones(filteredMilestones);
    });
  };

  useEffect(() => {
    getFilteredMilestones();
  }, []);

  const getPriorities = () => {
    GoalPriority().then((data) => {
      return setPriorities(data);
    });
  };

  useEffect(() => {
    getPriorities();
  }, []);

  const getCategories = () => {
    GoalCategory().then((data) => {
      return setCategories(data);
    });
  };

  useEffect(() => {
    getCategories();
  }, []);

  const getTerms = () => {
    TimeFrame().then((data) => {
      return setTerms(data);
    });
  };

  useEffect(() => {
    getTerms();
  }, []);

  const deleteGoal = (id) => {
    fetch(`/api/goals/${id}`, {
      method: "DELETE",
    }).then(() => {
      deleteMilestone(id);
      getFilteredGoals();
    });
  };

  const deleteMilestone = (id) => {
    fetch(`api/milestones/${id}`, {
      method: "DELETE",
    });
  };

  const unixTime = (time) => {
    const myDate = new Date(time);
    const myDateString = `${
      myDate.getDate() + 1
    }/${myDate.getMonth()}/${myDate.getFullYear()}`;
    return myDateString;
  };

  const milestoneChecker = (goalsId) =>
    milestones.find((mileObj) => {
      return (
        mileObj.userId === parseInt(localStorage.getItem("goal_keeper")) &&
        mileObj.goalId === parseInt(goalsId)
      );
    });

  return (
    <>
      {goals
        .map((goalObj) => {
          const currentMilestone = milestoneChecker(goalObj.id);

          return (
            <>
              <div className="goal_list" key={goalObj.id} goalobj={goalObj}>
                <Container>
                  <Row>
                    <Col md={12}>
                      {/* <Link
                        className="goal_list"
                        style={{ background: `${goals.category?.color}` }}
                        key={"key2"}
                        to={`/goals/${goalObj.id}`}
                      > */}
                      Goal description: {goalObj.goalDescription}
                      Goal objectives: {goalObj.goalObjective}
                      Notes: {goalObj.goalNotes}
                      Note updates: {goalObj.notes}
                      Start Date: {unixTime(goalObj.goalDate)}
                      {/* </Link> */}
                      <button
                        className="delete-btn"
                        key={"key3"}
                        onClick={() => deleteGoal(goalObj.id)}
                        // When clicked, it invokes the DELETE fetch call for deleteGoal and then invokes the DELETE fetch call for deleteMilestone.
                      >
                        DELETE
                      </button>
                    </Col>

                    <Col className="parent-drop">
                      Goal Category:
                      <button
                        className="drop-btn-2"
                        //style={{ background: `${categories}` }}
                      >
                        {categories.map((data) => {
                          if (goalObj.categoryId === data.id) {
                            return <div>{data.category}</div>;
                          }
                        })}
                      </button>
                      Goal Priority:
                      <button
                        key={"key5"}
                        className="drop-btn-2"
                        style={{ background: `${goalObj.priority?.color}` }}
                      >
                        {priorities.map((data) => {
                          if (goalObj.priorityId === data.id)
                            return <div>{data.priority}</div>;
                        })}
                      </button>
                      Goal Term:
                      <button
                        key={"key6"}
                        className="drop-btn-2"
                        style={{ background: `${goalObj.term?.color}` }}
                      >
                        {terms.map((data) => {
                          if (goalObj.termId === data.id)
                            return <div>{data.term}</div>;
                        })}
                      </button>
                    </Col>
                    {/* </Col> */}
                    <div className="milestone-Container">
                      <Col className="milestones">
                        <label>Overall Direction</label>
                        {currentMilestone ? (
                          <input
                            className="dirbx"
                            type="checkbox"
                            label="Overall Direction"
                            checked={
                              currentMilestone
                                ? currentMilestone.direction
                                : false
                            }
                            disabled
                          />
                        ) : (
                          <></>
                        )}
                      </Col>

                      <Col className="milestones">
                        <label>Flushed And Difined</label>
                        {currentMilestone ? (
                          <input
                            className="dirbx"
                            type="checkbox"
                            label="Overall Direction"
                            checked={
                              currentMilestone
                                ? currentMilestone.direction
                                : false
                            }
                            disabled
                          />
                        ) : (
                          <></>
                        )}
                      </Col>

                      <Col className="milestones">
                        <label>Tangible Progress Made</label>
                        {currentMilestone ? (
                          <input
                            className="dirbx"
                            type="checkbox"
                            label="Overall Direction"
                            checked={
                              currentMilestone
                                ? currentMilestone.direction
                                : false
                            }
                            disabled
                          />
                        ) : (
                          <></>
                        )}
                      </Col>

                      <Col className="milestones">
                        <label>Features Completed</label>
                        {currentMilestone ? (
                          <input
                            className="dirbx"
                            type="checkbox"
                            label="Overall Direction"
                            checked={
                              currentMilestone
                                ? currentMilestone.direction
                                : false
                            }
                            disabled
                          />
                        ) : (
                          <></>
                        )}
                      </Col>

                      <Col className="milestones">
                        <label>Goal Objective Attained</label>
                        {currentMilestone ? (
                          <input
                            className="dirbx"
                            type="checkbox"
                            label="Overall Direction"
                            checked={
                              currentMilestone
                                ? currentMilestone.direction
                                : false
                            }
                            disabled
                          />
                        ) : (
                          <></>
                        )}
                      </Col>
                    </div>
                  </Row>
                </Container>
              </div>
            </>
          );
        })
        .reverse()}
    </>
  );
};
