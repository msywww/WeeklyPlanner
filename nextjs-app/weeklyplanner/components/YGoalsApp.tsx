import React, { useEffect, useState} from "react";
// import { addYearGoals, getYearGoals, deleteYearGoals } from "../utils/supabaseFunctions";
import * as supabaseFunctions from "../utils/supabaseFunctions";
import { FaPlus, FaCheck, FaTimes, FaTrash } from "react-icons/fa";

type YGoalsAppProps = {
  type: 'year' | 'week' | 'month';
};
// interface YGoalsAppProps {
//   type: string;
// }

// ... 既存のインポートと型定義 ...

function YGoalsApp({ type }: YGoalsAppProps) {
  interface Goal {
    id: number;
    title: string;
    description: string;
    complete: boolean;
    date: string; // 日付の形式に応じて型を変更してください
    text: string;
    goal: Text;
    // 他のプロパティを追加
  }

  const [goal, setGoal] = useState<Goal | null>(null);
  const [goals, setGoals] = useState<Goal[]>([]);

  // const [goal, setGoal] = useState<any>([]);
  // const [goals, setGoals] = useState<any[]>([]);
  
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
    if (goal === null || goal.text === "") return; // 'text' は 'Todo' 型のプロパティ名の例です

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
      setGoal(null);
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
      setGoal(null);
    }
  };
  

  const handleComplete = async (id: number) => { 
    let completeGoalFunction;
    switch (type) {
      case 'year':
        completeGoalFunction = supabaseFunctions.completeYearGoals;
        break;
      case 'month':
        completeGoalFunction = supabaseFunctions.completeMonthGoals;
        break;
      case 'week':
        completeGoalFunction = supabaseFunctions.completeWeekGoals;
        break;
    }

    if (completeGoalFunction) {
      await completeGoalFunction(id);
      await fetchGoals(); // fetchGoals を直接呼び出す
      setGoal(null);
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
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-3 text-indigo-700">{getTitle()}</h3>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex mb-4"
      >
        <input 
          type="text"
          onChange={(e) => setGoal(e.target.value as unknown as Goal)}
          value={typeof goal === 'string' ? goal : goal?.toString() ?? ''}
          placeholder={`新しい${getTitle()}`}
          className="flex-grow border-b-2 border-indigo-200 p-1 focus:outline-none focus:border-indigo-500 transition-colors duration-300 text-gray-800 placeholder-gray-400"
        />
        <button className="ml-2 bg-indigo-600 text-white p-2 hover:bg-indigo-700 transition duration-300">
          <FaPlus />
        </button>
      </form>
      <ul className="space-y-2">
        {goals.sort((a, b) => a.id - b.id).map((goal: Goal) => (
          <li key={goal.id} className={`flex items-center p-2 rounded-lg transition-all duration-300 ${goal.complete ? 'bg-gray-100' : 'bg-green-100'}`}>
          <button
            onClick={() => handleComplete(goal.id)}
            className={`mr-2 p-1 transition-colors duration-300 ${goal.complete ? 'bg-gray-400 text-white' : 'bg-green-600 text-white'}`}
          >
            {goal.complete ? <FaTimes /> : <FaCheck />}
          </button>
          <span className={`flex-grow ${goal.complete ? 'line-through text-gray-500' : 'text-gray-800 font-medium'}`}>
            {String(goal.goal)}
          </span>
          <button
            onClick={() => handleDelete(goal.id)}
            className="p-1 text-red-500 hover:text-red-700 transition-colors duration-300"
          >
            <FaTrash />
          </button>
          </li>
        ))}
      </ul>
    </div>


  )
}

export default YGoalsApp;
