import React, { useEffect, useState } from "react";
import { ListOfGoals } from "../../ApiManager";
import { useHistory } from "react-router-dom";

export const FilterByMonth = () => {
  const [goalList, setGoalList] = useState([]);
  const history = useHistory();

  useEffect(() => {
    ListOfGoals().then((data) => {
      setGoalList(data);
    });
  }, []);

  //     const filterByMonth = () => {
  //         return (
  //           <div>
  //             {goalList.filter(goal => goal.includes("p")).map(filteredGoal => (
  //             <li>
  //               {filteredGoal}
  //               </li>
  //             ))}
  //           </div>
  //         )
  //       }

  let date = new Date();
  date.setDate(date.getDate() + 30);
  return (
    <>
      <button
        className="btn btn-primary"
        onClick={() => {
          history.push("/goals");
        }}
      >
        Back
      </button>
      <div key="filter-month">
        {<h4 className="title">This Months goals</h4>}
        {goalList
          .filter((goal) => {
            const goalDate = new Date(goal.goalDate);
            const isInRange = goalDate <= date;
            return isInRange;
          })
          .map((filteredGoal) => (
            <div
              style={{ whiteSpace: "pre-line" }}
              className="goal"
              key={filteredGoal.id}
            >
              <p className="goal">
                {filteredGoal.goalDescription}
                {filteredGoal.goalDate}
              </p>
            </div>
          ))}
      </div>
      {console.log()}
    </>
  );
};
