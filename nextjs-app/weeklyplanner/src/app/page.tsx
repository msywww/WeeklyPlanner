"use client";

import React, { useState, useEffect } from 'react';
import { FaMarker, FaCalendarAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import YGoalsApp from '../../components/YGoalsApp';
import TodoApp from '../../components/TodoApp';


interface Goal {
  id: number;
  text: string;
  type: "年間" | "月間" | "週間";
  achieved: boolean;
}

interface WeekData {
  startDate: string;
  todos: { [date: string]: Goal[] };
  goals: Goal[];
}

export default function Home() {
  const [currentWeek, setCurrentWeek] = useState<WeekData>(() => {
    const today = new Date();
    const monday = getMonday(today);
    return {
      startDate: monday.toISOString().split('T')[0],
      todos: {},
      goals: []
    };
  });
  const [currentMonth, setCurrentMonth] = useState(new Date());
  // const [newYearlyGoal, setNewYearlyGoal] = useState("");
  // const [newMonthlyGoal, setNewMonthlyGoal] = useState("");
  // const [newWeeklyGoal, setNewWeeklyGoal] = useState("");
  // const [selectedDate, setSelectedDate] = useState("");
  // const [newTodo, setNewTodo] = useState("");
  const [today] = useState(new Date());

  useEffect(() => {
    const today = new Date();
    const monday = new Date(today.setDate(today.getDate() - today.getDay() + 1));
    const startDate = monday.toISOString().split('T')[0];
    
    if (currentWeek.startDate !== startDate) {
      const newWeekData = {
        startDate,
        todos: {},
        goals: []
      };

      // ローカルストレージから新しい週のデータを読み込む
      const storedWeekData = localStorage.getItem(`week_${newWeekData.startDate}`);
      if (storedWeekData) {
        Object.assign(newWeekData, JSON.parse(storedWeekData));
      }

      setCurrentWeek(newWeekData);
    }
  }, []);

  useEffect(() => {
    // ローカルストレージにデータを保存する処理
    localStorage.setItem(`week_${currentWeek.startDate}`, JSON.stringify(currentWeek));
  }, [currentWeek]);

  const changeWeek = (delta: number) => {
    const newStartDate = new Date(currentWeek.startDate);
    newStartDate.setDate(newStartDate.getDate() + delta * 7);
    
    const newWeekData = {
      startDate: newStartDate.toISOString().split('T')[0],
      todos: {},
      goals: []
    };

    // ローカルストレージから新しい週のデータを読み込む
    const storedWeekData = localStorage.getItem(`week_${newWeekData.startDate}`);
    if (storedWeekData) {
      Object.assign(newWeekData, JSON.parse(storedWeekData));
    }

    setCurrentWeek(newWeekData);
    setCurrentMonth(newStartDate);
  };

  // const addGoal = (type: "年間" | "月間" | "週間") => {
  //   let newGoal = "";
  //   switch (type) {
  //     case "年間":
  //       newGoal = newYearlyGoal;
  //       setNewYearlyGoal("");
  //       break;
  //     case "月間":
  //       newGoal = newMonthlyGoal;
  //       setNewMonthlyGoal("");
  //       break;
  //     case "週間":
  //       newGoal = newWeeklyGoal;
  //       setNewWeeklyGoal("");
  //       break;
  //   }
  //   if (newGoal.trim() !== "") {
  //     const updatedWeek = {
  //       ...currentWeek,
  //       goals: [...currentWeek.goals, { id: Date.now(), text: newGoal, type: type, achieved: false }]
  //     };
  //     updateCurrentWeek(updatedWeek);
  //   }
  // };

  const getWeekDates = (startDateString: string): string[] => {
    const start = new Date(startDateString);
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      return date.toISOString().split('T')[0];
    });
  };

  // 現在の週の開始日がしいフォーマットであることを確認
  const safeStartDate = (() => {
    try {
      return new Date(currentWeek.startDate).toISOString().split('T')[0];
    } catch {
      return new Date().toISOString().split('T')[0];
    }
  })();

  const weekDates = getWeekDates(safeStartDate);

  // const addTodo = () => {
  //   if (newTodo.trim() !== "" && selectedDate !== "") {
  //     const updatedWeek = {
  //       ...currentWeek,
  //       todos: {
  //         ...currentWeek.todos,
  //         [selectedDate]: [
  //           ...(currentWeek.todos[selectedDate] || []),
  //           { id: Date.now(), text: newTodo, date: selectedDate, completed: false }
  //         ]
  //       }
  //     };
  //     updateCurrentWeek(updatedWeek);
  //     setNewTodo("");
  //   }
  // };

  // const toggleGoalAchievement = (id: number) => {
  //   const updatedWeek = {
  //     ...currentWeek,
  //     goals: currentWeek.goals.map(goal =>
  //       goal.id === id ? { ...goal, achieved: !goal.achieved } : goal
  //     )
  //   };
  //   updateCurrentWeek(updatedWeek);
  // };

  // const toggleTodoCompletion = (date: string, id: number) => {
  //   const updatedWeek = {
  //     ...currentWeek,
  //     todos: {
  //       ...currentWeek.todos,
  //       [date]: currentWeek.todos[date].map(todo =>
  //         todo.id === id ? { ...todo, completed: !todo.completed } : todo
  //       )
  //     }
  //   };
  //   updateCurrentWeek(updatedWeek);
  // };

  // const deleteGoal = (id: number) => {
  //   const updatedWeek = {
  //     ...currentWeek,
  //     goals: currentWeek.goals.filter(goal => goal.id !== id)
  //   };
  //   updateCurrentWeek(updatedWeek);
  // };

  // const deleteTodo = (date: string, id: number) => {
  //   const updatedWeek = {
  //     ...currentWeek,
  //     todos: {
  //       ...currentWeek.todos,
  //       [date]: currentWeek.todos[date].filter(todo => todo.id !== id)
  //     }
  //   };
  //   updateCurrentWeek(updatedWeek);
  // };

  // const updateCurrentWeek = (updatedWeek: WeekData) => {
  //   setCurrentWeek(updatedWeek);
  // };

  // const renderGoalInputSection = (type: "年間" | "月間" | "週間") => {
  //   let value = "";
  //   let setValue: React.Dispatch<React.SetStateAction<string>>;
  //   switch (type) {
  //     case "年間":
  //       value = newYearlyGoal;
  //       setValue = setNewYearlyGoal;
  //       break;
  //     case "月間":
  //       value = newMonthlyGoal;
  //       setValue = setNewMonthlyGoal;
  //       break;
  //     case "週間":
  //       value = newWeeklyGoal;
  //       setValue = setNewWeeklyGoal;
  //       break;
  //   }
  //   return (
  //     <div className="flex mb-4">
  //       <input
  //         type="text"
  //         value={value}
  //         onChange={(e) => setValue(e.target.value)}
  //         placeholder={`新しい${type}目標`}
  //         className="flex-grow border-b-2 border-indigo-200 p-2 focus:outline-none focus:border-indigo-500 transition-colors duration-300 text-gray-800 placeholder-gray-400"
  //       />
  //       <button onClick={() => addGoal(type)} className="ml-2 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition duration-300">
  //         <FaPlus />
  //       </button>
  //     </div>
  //   );
  // };

  // const renderGoalSection = (type: "年間" | "月間" | "週間") => {
  //   const filteredGoals = currentWeek.goals.filter(goal => goal.type === type);
  //   return (
  //     <div className="mb-6">
  //       <h3 className="text-xl font-semibold mb-3 text-indigo-700">{type}目標</h3>
  //       {renderGoalInputSection(type)}
  //       <ul className="space-y-2">
  //         {filteredGoals.map((goal) => (
  //           <li key={goal.id} className={`flex items-center p-2 rounded-lg transition-all duration-300 ${goal.achieved ? 'bg-gray-100' : 'bg-green-100'}`}>
  //             <button
  //               onClick={() => toggleGoalAchievement(goal.id)}
  //               className={`mr-2 p-1 rounded-full transition-colors duration-300 ${goal.achieved ? 'bg-gray-400 text-white' : 'bg-green-600 text-white'}`}
  //             >
  //               {goal.achieved ? <FaTimes /> : <FaCheck />}
  //             </button>
  //             <span className={`flex-grow ${goal.achieved ? 'line-through text-gray-500' : 'text-gray-800 font-medium'}`}>
  //               {goal.text}
  //             </span>
  //             <button
  //               onClick={() => deleteGoal(goal.id)}
  //               className="p-1 text-red-500 hover:text-red-700 transition-colors duration-300"
  //             >
  //               <FaTrash />
  //             </button>
  //           </li>
  //         ))}
  //       </ul>
  //     </div>
  //   );
  // };

  const generateCalendar = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    let startingDay = firstDay.getDay() - 1; // 月曜日を0とする
    if (startingDay === -1) startingDay = 6; // 日曜日の場合は6にする

    const calendar = [];
    let day = 1;

    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < startingDay) {
          const prevMonthLastDay = new Date(year, month, 0);
          week.push(new Date(year, month - 1, prevMonthLastDay.getDate() - (startingDay - j - 1)));
        } else if (day > daysInMonth) {
          week.push(new Date(year, month + 1, day - daysInMonth));
          day++;
        } else {
          week.push(new Date(year, month, day));
          day++;
        }
      }
      calendar.push(week);
      if (day > daysInMonth && week[6].getMonth() !== month) break;
    }

    return calendar;
  };

  // const calendar = generateCalendar(currentMonth);

  const isCurrentWeek = (date: Date) => {
    const weekStart = new Date(currentWeek.startDate);
    weekStart.setHours(0, 0, 0, 0);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 7);
    weekEnd.setHours(0, 0, 0, 0);
    return date >= weekStart && date < weekEnd;
  };

  const changeMonth = (delta: number) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + delta);
    setCurrentMonth(newMonth);
  };

  const isToday = (date: Date) => {
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  const getDayColor = (day: Date, index: number) => {
    if (day.getMonth() !== currentMonth.getMonth()) return 'text-gray-400';
    if (index === 5) return 'text-blue-500'; // 土曜日
    if (index === 6) return 'text-red-500'; // 日曜日
    return 'text-gray-700';
  };

  const formatWeekRange = (startDate: string) => {
    const start = new Date(startDate);
    const end = new Date(start);
    end.setDate(end.getDate() + 6); // 日曜日まで

    const formatOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const startStr = start.toLocaleDateString('ja-JP', formatOptions);
    const endStr = end.toLocaleDateString('ja-JP', { month: 'long', day: 'numeric' });

    return `${startStr}〜${endStr}`;
  };

  // const onDragEnd = (result: DropResult) => {
  //   const { source, destination } = result;

  //   if (!destination) {
  //     return;
  //   }

  //   setCurrentWeek(prevWeek => {
  //     const newTodos = { ...prevWeek.todos };
  //     const sourceDate = source.droppableId;
  //     const destDate = destination.droppableId;

  //     if (!newTodos[sourceDate]) newTodos[sourceDate] = [];
  //     if (!newTodos[destDate]) newTodos[destDate] = [];

  //     const [movedTodo] = newTodos[sourceDate].splice(source.index, 1);
  //     newTodos[destDate].splice(destination.index, 0, movedTodo);

  //     return { ...prevWeek, todos: newTodos };
  //   });
  // };

  // const handleGoalSubmit = (e: FormEvent<HTMLFormElement>, goalType: 'yearly' | 'monthly' | 'weekly') => {
  //   e.preventDefault();
  //   const input = e.currentTarget.elements.namedItem('newGoal') as HTMLInputElement;
  //   if (input.value.trim()) {
  //     addGoal(goalType, input.value.trim());
  //     input.value = '';
  //   }
  // };

  // const handleTodoSubmit = (e: FormEvent<HTMLFormElement>, dateStr: string) => {
  //   e.preventDefault();
  //   const input = e.currentTarget.elements.namedItem('newTodo') as HTMLInputElement;
  //   if (input.value.trim()) {
  //     addTodo(dateStr, input.value.trim());
  //     input.value = '';
  //   }
  // };



  // type Props = {
  //   yeargoals: ygoals[];
  // }
  // const YGoal = (props: Props) => {
  //   const {yeargoals} = props;

  //   return(
  //     <ul>
  //       {yeargoals.map((ygoal) =>(
  //         <li key={ygoal.id}>{ygoal.goal}</li>
  //       ))}
  //     </ul>
  //   )
  // }
  
  // interface Todo {
  //   id: number;
  //   text: string;
  //   date: string;
  //   completed: boolean;
  // }



  // const [yeargoals, setYGoals] = useState<any>([]);
  // useEffect(() => {
  //   const getYGoals = async() => {
  //     const yeargoals = await getYearGoals();
  //     setYGoals(yeargoals);
  //     console.log(yeargoals);
  //   }
  //   getYGoals();
  // }, []);
  

  
  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-center text-indigo-800">週間プランナー</h1>
      {/* <div className="text-center mb-4">
        <p className="text-lg font-semibold text-gray-700">現在の日時: {today.toLocaleString('ja-JP')}</p>
      </div> */}
      <div className="flex justify-center items-center mb-4 space-x-4">
        <button onClick={() => changeWeek(-1)} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition duration-300">
          <FaChevronLeft className="inline mr-2" /> 前の週
        </button>
        <span className="text-lg font-semibold text-gray-500 font-medium">
          {formatWeekRange(currentWeek.startDate)}
        </span>
        <button onClick={() => changeWeek(1)} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition duration-300">
          次の週 <FaChevronRight className="inline ml-2" />
        </button>
      </div>
      
      <div className="flex flex-col lg:flex-row w-full max-w-7xl gap-8">
        {/* 左側：カレンダーと週間目標 */}
        <div className="w-full lg:w-1/2 space-y-8">
          {/* 月間カレンダー */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <button onClick={() => changeMonth(-1)} className="text-indigo-600 hover:text-indigo-800 transition-colors">
                <FaChevronLeft className="text-xl" />
              </button>
              <h2 className="text-2xl font-semibold text-indigo-800">
                {currentMonth.toLocaleString('ja-JP', { year: 'numeric', month: 'long' })}
              </h2>
              <button onClick={() => changeMonth(1)} className="text-indigo-600 hover:text-indigo-800 transition-colors">
                <FaChevronRight className="text-xl" />
              </button>
            </div>
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  {['月', '火', '水', '木', '金', '土', '日'].map(day => (
                    <th key={day} className="p-2 text-center font-semibold text-indigo-800 border-b-2 border-indigo-200">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {generateCalendar(currentMonth).map((week, i) => (
                  <tr key={i}>
                    {week.map((day, j) => (
                      <td key={j} className={`p-3 text-center border border-indigo-100
                        ${day.getMonth() === currentMonth.getMonth() ? 'hover:bg-indigo-50 transition-colors' : 'bg-gray-50'}
                        ${isCurrentWeek(day) ? 'bg-indigo-100' : ''}
                        ${isToday(day) ? 'bg-yellow-300 font-bold' : ''}
                        ${getDayColor(day, j)}
                      `}>
                        {day.getDate()}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 週間目標 */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-6 text-indigo-800 flex items-center">
              <FaMarker className="mr-2" />目標リスト
            </h2>
            <YGoalsApp type="year" />
            <YGoalsApp type="month" />
            <YGoalsApp type="week" />
          </div>
        </div>

        {/* 右側：TODO���ト */}
        <div className="w-full lg:w-1/2">
          <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
            <h2 className="text-2xl font-semibold mb-6 text-indigo-800 flex items-center">
              <FaCalendarAlt className="mr-2" /> TODOリスト
            </h2>
            {weekDates.map((date) => (
              <div key={date} className="mb-6">
                <TodoApp date={date} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

// function formatDate(dateString: string) {
//   try {
//     const date = new Date(dateString);
//     const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
//     return new Intl.DateTimeFormat('ja-JP', options).format(date);
//   } catch {
//     return "無効な日付";
//   }
// }

function getMonday(d: Date) {
  d = new Date(d);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // 日曜日の場合は前の月曜日
  return new Date(d.setDate(diff));
}