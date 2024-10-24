import React, { useEffect, useState} from "react";
import * as supabaseFunctions from "../utils/supabaseFunctions";
import { FaPlus, FaCheck, FaTimes, FaTrash } from "react-icons/fa";


type TodoAppProps = {
  date: string;
};

function formatDate(dateString: string) {
  try {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const dayOfWeek = ['日', '月', '火', '水', '木', '金', '土'][date.getDay()];

    return `${year}/${month}/${day}(${dayOfWeek})`;
  } catch {
    return "無効な日付";
  }
}




function TodosApp({ date }: TodoAppProps) {
  interface Todo {
    id: number;
    title: string;
    complete: boolean;
    text: string;
    todo: Text;
    date: Date;
  }

  const [todo, setTodo] = useState<Todo | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  
  const fetchTodos = async () => {
    const fetchFunction = supabaseFunctions.getTodos;
    
    if (fetchFunction) {
      const fetchedTodos = await fetchFunction();
      if (fetchedTodos) {
        setTodos(fetchedTodos);
      }
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [date]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (todo === null || todo.text === "") return; // 'text' は 'Todo' 型のプロパティ名の例です
    const addTodoFunction = supabaseFunctions.addTodos;

    if (addTodoFunction) {
      await addTodoFunction(todo, date);
      await fetchTodos(); // fetchGoals を直接呼び出す
      setTodo(null);
    }
  };


  const handleDelete = async (id: number) => {
    const deleteTodoFunction = supabaseFunctions.deleteTodos;
    
    if (deleteTodoFunction) {
      await deleteTodoFunction(id);
      await fetchTodos(); // fetchGoals を直接呼び出す
      setTodo(null);
    }
  };

  const handleComplete = async (id: number) => { 
    const completeTodoFunction = supabaseFunctions.completeTodos;
  
    if (completeTodoFunction) {
      await completeTodoFunction(id);
      await fetchTodos(); // fetchGoals を直接呼び出す
      setTodo(null);
    }
  };

  return(
    <div>
      <h3 className="text-lg font-semibold mb-2 text-indigo-700">{formatDate(date)}</h3>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex mb-4"
      >
        <input 
          type="text"
          onChange={(e) => setTodo(e.target.value as unknown as Todo)}
          value={typeof todo === 'string' ? todo : todo?.toString() ?? ''}
          // onChange={(e) => setTodo(e.target.value)}
          // value={todo}
          placeholder={`新しいTodo`}
          className="flex-grow border-b-2 border-indigo-200 p-1 focus:outline-none focus:border-indigo-500 transition-colors duration-300 text-gray-800 placeholder-gray-400"
        />
        <button className="ml-2 bg-indigo-600 text-white p-2 hover:bg-indigo-700 transition duration-300">
          <FaPlus />
        </button>
      </form>
      <ul className="space-y-2">
        {todos
        .sort((a, b) => a.id - b.id)
        .filter((todo) => {
          const todoDate = new Date(todo.date);
          const target = new Date(date);
          return todoDate.toDateString() === target.toDateString();
        })
        .map((todo: Todo) =>  (
          <li key={todo.id} className={`flex items-center p-2 rounded-lg transition-all duration-300 ${todo.complete ? 'bg-gray-100' : 'bg-green-100'}`}>
            <button
              onClick={() => handleComplete(todo.id)}
              className={`mr-2 p-1 transition-colors duration-300 ${todo.complete ? 'bg-gray-400 text-white' : 'bg-green-600 text-white'}`}
            >
              {todo.complete ? <FaTimes /> : <FaCheck />}
            </button>
            <span className={`flex-grow ${todo.complete ? 'line-through text-gray-500' : 'text-gray-800 font-medium'}`}>
              {String(todo.todo)}
            </span>
            <button
              onClick={() => handleDelete(todo.id)}
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

export default TodosApp;
