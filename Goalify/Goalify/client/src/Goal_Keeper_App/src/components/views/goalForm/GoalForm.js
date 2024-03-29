// import { getByLabelText } from "@testing-library/react";
import React, { useState, useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { GoalCategory, GoalPriority, TimeFrame } from "../../ApiManager";
import "./GoalForm.css";

export const GoalForm = () => {
  const history = useHistory();
  const [goalDescription, setGoalDescription] = useState([]);
  const [goalObjectives, setGoalObjectives] = useState([]);
  const [notes, setGoalNotes] = useState([]);
  const [userId, setUserId] = useState([]);
  const [goalDate, setGoalDate] = useState([]);
  const [newGoal, setGoals] = useState({});
  // const [milestoneId, setMilestoneId] = useState([]);
  const [categoryId, setGoalCategory] = useState([]);
  //   goalCategory is the key on the new object that is being created coming from the event.target.value
  const [category, setCategory] = useState([]);
  //   setCategory is setting state for the useEffect (bringing in categories)
  // category is table in the the db
  const [priorityId, setGoalPriority] = useState([]);
  const [priority, setPriority] = useState([]);

  const [termId, setGoalTimeFrame] = useState([]);
  const [timeFrame, setTimeFrame] = useState([]);
  // const [notes, setNotes] = useState("");

  const [milestoneId, setMilestone] = useState({});

  const submitGoal = (captureEventToPreventDefaultBehavior) => {
    // This parameter "captureEventToPreventDefault" stops the default behavior of the
    // browser which in this case is to Submit the goal. By preventing the default browser behavior
    // the browser will display the other html.
    captureEventToPreventDefaultBehavior.preventDefault();

    const milestoneIdObj = {
      progressNotes: null,
      directionNotes: null,
      definedNotes: null,
      featuresNotes: null,
      attainedNotes: null,
      direction: null,
      defined: null,
      progress: null,
      features: null,
      attained: null,
    };

    setMilestone(milestoneIdObj);

    const fetchMilestoneObj = {
      // POST fetch call to send the new object to the API
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(milestoneIdObj),
      // the body of the fetch object has to be converted to JSON string
    };
    // return (
    //   fetch("https://localhost:5001/api/milestones", fetchMilestoneObj)
    //     // the fetchOption object is being sent to the url in the return fetch
    //       )};

    const goalObj = {
      // the goal object being updated with values from the state variable "goal"
      goalDescription,
      goalObjectives,
      goalDate,
      userId: parseInt(localStorage.getItem("goal_keeper")),
      // getting the userId value from localStorage
      categoryId,
      priorityId,
      termId,
      notes,
      // dot notation to create the value pairs on the new object keys
    };

    setGoals(goalObj);

    const fetchOption = {
      // POST fetch call to send the new object to the API
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(goalObj),
      // the body of the fetch object has to be converted to JSON string
    };

    console.log("fetchMilestoneObj:", fetchMilestoneObj);
    console.log("milestoneIdObj:", milestoneIdObj);

    return fetch(
      "https://localhost:5001/api/Milestones",
      fetchMilestoneObj
    ).then(() => {
      fetch("https://localhost:5001/api/Goals", fetchOption).then(() => {
        history.push("/mygoals");
      });
    });
  };

  // const formChecker = (newGoalObj) => {
  const toggleButton = (newGoal) => {
    const isEnabled =
      goalDescription.length > 0 &&
      goalObjectives.length > 0 &&
      notes.length > 0 &&
      goalDate.length > 0;

    // const booleanCheck = isEnabled
    // if (booleanCheck){
    //   return submitGoal(booleanCheck)
    // } else {
    //   submitGoal(alert("test"))
    // }

    return (
      <div className="btn-shift-right">
        <button
          disabled={!isEnabled}
          className="btn btn-primary"
          // onFocus={alert("test")}
          onClick={submitGoal}
        >
          TRACK GOAL
        </button>
      </div>
    );
  };

  useEffect(() => {
    GoalCategory().then((data) => {
      setCategory(data);
    });
  }, []);

  useEffect(() => {
    GoalPriority().then((data) => [setPriority(data)]);
  }, []);

  useEffect(() => {
    TimeFrame().then((data) => {
      setTimeFrame(data);
    });
  }, []);

  return (
    <Container className="container">
      <form className="goalForm">
        {/* np<h4 className="goalForm__title">Create A New Goal</h4> */}
        <fieldset>
          <div className="form-group">
            <label htmlFor="description">Enter a new goal to start:</label>
            <input
              // The input tag holds all of the logic for capturing the
              // user input for the description field
              required
              autoFocus
              type="textarea"
              // The code that tells what the form field will be (type="text")
              className="form-control"
              placeholder="Brief description of your goal"
              // The onChange event listener is used to capture the user input from the DOM
              onChange={(event) => {
                setGoalDescription(event.target.value);
              }}
            />
          </div>
        </fieldset>
        {/* </Container> */}
        {/* <Container> */}
        <fieldset>
          <div className="form-group">
            <label htmlFor="name">Goal Objectives:</label>
            <input
              required
              autoFocus
              type="textarea"
              className="form-control"
              placeholder="Brief description of goal objectives"
              onChange={(event) => {
                setGoalObjectives(event.target.value);
              }}
            />
          </div>
        </fieldset>
        {/* // </Container> */}
        {/* <Container> */}
        <fieldset>
          <div className="form-group">
            <label htmlFor="name">Goal Notes:</label>
            <input
              required
              autoFocus
              type="textarea"
              className="form-control"
              placeholder="Enter goal progress observations"
              onChange={(event) => {
                setGoalNotes(event.target.value);
              }}
            />
          </div>
        </fieldset>
        {/* </Container> */}
        {/* <Container> */}
        <fieldset>
          {/* <div className="form-date"> */}
          <div className="form-group">
            <label htmlFor="name">Projected Completion Date:</label>
            <input
              required
              autoFocus
              type="date"
              className="form-control"
              placeholder=""
              onChange={(event) => {
                setGoalDate(event.target.value);
              }}
            />
          </div>
        </fieldset>
        {/* </Container> */}
        <h6 className="goal-title">SELECT GOAL PARAMETERS</h6>
        {/* <Container> */}
        <fieldset>
          {/* <div className="drop-title">Select your goal options</div> */}
          <div className="form-group">
            {/* <div className="dropdown-group"> */}
            <label htmlFor="name">Category:</label>
            <select
              onChange={(event) => {
                // select.options[select.selectedIndex].value;
                // if ([event.target.selectedIndex] === event.categories. );
                setGoalCategory(parseInt([event.target.selectedIndex]));
              }}
            >
              <option className="option-font" value="0" key="category">
                Select a category...
              </option>
              {category.map((catObj) => {
                return (
                  <option className="opdrop" key={catObj.id}>
                    {catObj.category}
                  </option>
                );
              })}
            </select>
          </div>
        </fieldset>
        {/* </Container> */}
        {/* <Container> */}
        <fieldset>
          <div className="form-group">
            {/* <div className="dropdown-group"> */}
            <label htmlFor="name">Priority level: </label>
            <select
              onChange={(event) => {
                setGoalPriority(parseInt([event.target.selectedIndex]));
              }}
            >
              <option className="option-font" value="0" key="priority">
                Select a priority...
              </option>

              {priority.map((priorityObj) => {
                return (
                  <option className="opdrop" key={priorityObj.id}>
                    {priorityObj.priority}
                  </option>
                );
              })}
            </select>
          </div>
        </fieldset>
        {/* </Container> */}
        {/* <Container> */}
        <fieldset>
          <div className="form-group">
            {/* <div className="dropdown-group"> */}
            <label htmlFor="name">Goal term: </label>
            <select
              onChange={(event) => {
                setGoalTimeFrame(parseInt([event.target.selectedIndex]));
              }}
            >
              <option className="option-font" value="0" key="location">
                Select a term...
              </option>

              {timeFrame.map((data) => {
                return (
                  <option className="opdrop" key={data.id}>
                    {data.term}
                  </option>
                );
              })}
            </select>
          </div>
        </fieldset>
        {/* </Container> */}
        <div className="form-group">
          {/* <div className="form-group"> */}
          {/*  {formChecker(newGoal)} */}
          {toggleButton(newGoal)}
          {/* invoking the function responsible for disableing the submit button untill all 
        form boxes have been filled.
        */}
        </div>
      </form>
    </Container>
  );
};
