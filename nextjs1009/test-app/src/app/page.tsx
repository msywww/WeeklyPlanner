import Image from "next/image";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todoリスト</h1>
      <div className="mb-4">
        <input
          type="text"
          className="border p-2 mr-2"
          placeholder="新しいタスクを入力"
        />
        <button className="bg-blue-500 text-white p-2 rounded">追加</button>
      </div>
      <ul className="list-disc pl-5">
        <li className="mb-2">タスク1</li>
        <li className="mb-2">タスク2</li>
        <li className="mb-2">タスク3</li>
      </ul>
      <div className="mt-4">
        <a href="/login" className="bg-green-500 text-white p-2 rounded hover:bg-green-600">
          ログインページへ
        </a>
      </div>
    </div>
  );
}
