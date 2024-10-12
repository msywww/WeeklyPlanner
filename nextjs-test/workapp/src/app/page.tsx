"use client";

import { useState } from "react";
import { FaPlus, FaCheck, FaTimes, FaCalendarAlt, FaBullseye, FaTrash } from "react-icons/fa";

interface Todo {
  id: number;
  text: string;
  dueDate: Date;  // 文字列ではなくDate型を使用
  completed: boolean;
}

interface Goal {
  id: number;
  text: string;
  type: "年間" | "月間" | "週間";
  achieved: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [newTodoDueDate, setNewTodoDueDate] = useState("");
  const [newGoal, setNewGoal] = useState("");
  const [newGoalType, setNewGoalType] = useState<"年間" | "月間" | "週間">("年間");

  const addTodo = () => {
    if (newTodo.trim() !== "" && newTodoDueDate !== "") {
      setTodos([...todos, { 
        id: Date.now(), 
        text: newTodo, 
        dueDate: newTodoDueDate,  // 文字列をそのまま使用
        completed: false 
      }]);
      setNewTodo("");
      setNewTodoDueDate("");
    }
  };

  const addGoal = () => {
    if (newGoal.trim() !== "") {
      setGoals([...goals, { id: Date.now(), text: newGoal, type: newGoalType, achieved: false }]);
      setNewGoal("");
    }
  };

  const toggleTodoCompletion = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const toggleGoalAchievement = (id: number) => {
    setGoals(goals.map(goal => 
      goal.id === id ? { ...goal, achieved: !goal.achieved } : goal
    ));
  };

  const deleteGoal = (id: number) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-12 text-center text-indigo-900">
          タスク＆目標管理アプリ
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
            <h2 className="text-2xl font-semibold mb-6 text-indigo-800 flex items-center">
              <FaBullseye className="mr-2" /> 目標設定
            </h2>
            
            <div className="flex mb-4">
              <input
                type="text"
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                placeholder="新しい目標"
                className="flex-grow border-b-2 border-indigo-200 p-2 focus:outline-none focus:border-indigo-500 transition-colors duration-300 text-gray-800 placeholder-gray-400"
              />
              <select
                value={newGoalType}
                onChange={(e) => setNewGoalType(e.target.value as "年間" | "月間" | "週間")}
                className="border-b-2 border-indigo-200 p-2 ml-2 focus:outline-none focus:border-indigo-500 transition-colors duration-300 text-gray-800"
              >
                <option value="年間">年間</option>
                <option value="月間">月間</option>
                <option value="週間">週間</option>
              </select>
              <button onClick={addGoal} className="ml-2 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition duration-300">
                <FaPlus />
              </button>
            </div>

            <ul className="space-y-3">
              {goals.map((goal) => (
                <li key={goal.id} className={`flex items-center p-3 rounded-lg transition-all duration-300 ${goal.achieved ? 'bg-gray-100' : 'bg-green-100'}`}>
                  <button
                    onClick={() => toggleGoalAchievement(goal.id)}
                    className={`mr-3 p-1 rounded-full transition-colors duration-300 ${goal.achieved ? 'bg-gray-400 text-white' : 'bg-green-600 text-white'}`}
                  >
                    {goal.achieved ? <FaTimes /> : <FaCheck />}
                  </button>
                  <span className={`flex-grow ${goal.achieved ? 'line-through text-gray-500' : 'text-gray-800 font-medium'}`}>
                    {goal.text}
                  </span>
                  <span className="text-sm text-indigo-700 font-medium mr-2">
                    {goal.type}
                  </span>
                  <button
                    onClick={() => deleteGoal(goal.id)}
                    className="p-1 text-red-500 hover:text-red-700 transition-colors duration-300"
                  >
                    <FaTrash />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
            <h2 className="text-2xl font-semibold mb-6 text-indigo-800 flex items-center">
              <FaCalendarAlt className="mr-2" /> TODOリスト
            </h2>
            
            <div className="flex mb-4">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="新しいTODO"
                className="flex-grow border-b-2 border-indigo-200 p-2 focus:outline-none focus:border-indigo-500 transition-colors duration-300 text-gray-800 placeholder-gray-400"
              />
              <input
                type="date"
                value={newTodoDueDate}
                onChange={(e) => setNewTodoDueDate(e.target.value)}
                className="border-b-2 border-indigo-200 p-2 ml-2 focus:outline-none focus:border-indigo-500 transition-colors duration-300 text-gray-800"
              />
              <button onClick={addTodo} className="ml-2 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition duration-300">
                <FaPlus />
              </button>
            </div>

            <ul className="space-y-3">
              {todos.map((todo) => (
                <li key={todo.id} className={`flex items-center p-3 rounded-lg transition-all duration-300 ${todo.completed ? 'bg-gray-100' : 'bg-green-100'}`}>
                  <button
                    onClick={() => toggleTodoCompletion(todo.id)}
                    className={`mr-3 p-1 rounded-full transition-colors duration-300 ${todo.completed ? 'bg-gray-400 text-white' : 'bg-green-600 text-white'}`}
                  >
                    {todo.completed ? <FaTimes /> : <FaCheck />}
                  </button>
                  <span className={`flex-grow ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800 font-medium'}`}>
                    {todo.text}
                  </span>
                  <span className="text-sm text-indigo-700 mr-2">
                    {todo.dueDate}
                  </span>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="p-1 text-red-500 hover:text-red-700 transition-colors duration-300"
                  >
                    <FaTrash />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
