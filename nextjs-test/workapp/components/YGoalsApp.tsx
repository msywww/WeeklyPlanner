import React, { useEffect, useState} from "react";
import { addYearGoals, getYearGoals } from "../utils/supabaseFunctions";
import {ygoals} from '../utils/interface';
import YGoalslist from "./YGoalsList";


// type Props = {
//   yeargoals: ygoals[];
// }


const YGoalsApp = () => {
  const [goal, setGoal] = useState<any>([]);
  const [yeargoals, setYGoals] = useState<any>([]);
  
  useEffect(() => {
    const getYGoals = async() => {
      const yeargoals = await getYearGoals();
      setYGoals(yeargoals);
      console.log(yeargoals);
    }
    getYGoals();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
  
    if(goal === "") return;

    await addYearGoals(goal);
    let yeargoals =  await getYearGoals();
    setYGoals(yeargoals);

    setGoal("");

  };

  return(
    <div>
      <h1>TodoList</h1>
      <ul>
        {yeargoals.map((ygoal:any) =>(
          <li key={ygoal.id}>{ygoal.goal}</li>
        ))}
      </ul>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="text" onChange={(e) => setGoal(e.target.value)} value={goal}/>
        <button>Add</button>
      </form>
      <YGoalslist ygoals={goal} setYGoals={setGoal}/>
    </div>
  )
}


export default YGoalsApp;