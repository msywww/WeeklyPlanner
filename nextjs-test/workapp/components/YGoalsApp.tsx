import React, { useEffect, useState} from "react";
// import { addYearGoals, getYearGoals, deleteYearGoals } from "../utils/supabaseFunctions";
import * as supabaseFunctions from "../utils/supabaseFunctions";
import {ygoals} from '../utils/interface';
import YGoalslist from "./YGoalsList";

type YGoalsAppProps = {
  type: 'year' | 'week' | 'month';
};
// interface YGoalsAppProps {
//   type: string;
// }

// ... 既存のインポートと型定義 ...

function YGoalsApp({ type }: YGoalsAppProps) {
  const [goal, setGoal] = useState<any>([]);
  const [goals, setGoals] = useState<any[]>([]);
  
  const fetchGoals = async () => {
    let fetchFunction;
    switch (type) {
      case 'year':
        fetchFunction = supabaseFunctions.getYearGoals;
        break;
      case 'month':
        fetchFunction = supabaseFunctions.getMonthGoals;
        break;
      case 'week':
        fetchFunction = supabaseFunctions.getWeekGoals;
        break;
    }
    if (fetchFunction) {
      const fetchedGoals = await fetchFunction();
      if (fetchedGoals) {
        setGoals(fetchedGoals);
      }
    }
  };

  useEffect(() => {
    fetchGoals();
  }, [type]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (goal === "") return;

    let addGoalFunction;
    switch (type) {
      case 'year':
        addGoalFunction = supabaseFunctions.addYearGoals;
        break;
      case 'month':
        addGoalFunction = supabaseFunctions.addMonthGoals;
        break;
      case 'week':
        addGoalFunction = supabaseFunctions.addWeekGoals;
        break;
    }

    if (addGoalFunction) {
      await addGoalFunction(goal);
      await fetchGoals(); // fetchGoals を直接呼び出す
      setGoal("");
    }
  };

  const handleDelete = async (id: number) => {
    let deleteGoalFunction;
    switch (type) {
      case 'year':
        deleteGoalFunction = supabaseFunctions.deleteYearGoals;
        break;
      case 'month':
        deleteGoalFunction = supabaseFunctions.deleteMonthGoals;
        break;
      case 'week':
        deleteGoalFunction = supabaseFunctions.deleteWeekGoals;
        break;
    }

    if (deleteGoalFunction) {
      await deleteGoalFunction(id);
      await fetchGoals(); // fetchGoals を直接呼び出す
      setGoal("");
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'year':
        return '年間目標';
      case 'month':
        return '月間目標';
      case 'week':
        return '週間目標';
    }
  };

  // ... 既存のreturn文 ...
  return(
    <div>
      <h1>{getTitle()}</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="text" onChange={(e) => setGoal(e.target.value)} value={goal}/>
        <button>Add</button>
      </form>
      <ul className="mx-auto">
          {goals.map((goal:any) => (
            <div
              key={goal.id}
              className="flex bg-orange-200 rounded-md mt-2 mb-2 p-2 justify-between"
            >
              <li className="font-medium">✅ {goal.goal}</li>
              <span
                className="cursor-pointer"
                onClick={() => handleDelete(goal.id)}
              >
                ✖
              </span>
            </div>
          ))}
        </ul>
    </div>
  )
}

export default YGoalsApp;
