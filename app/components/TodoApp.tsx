"use client";

import { useState } from "react";
import { Todo } from "@/types/todo";

type Filter = "all" | "active" | "completed";

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const addTodo = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setTodos((prev) => [
      ...prev,
      { id: crypto.randomUUID(), title: trimmed, completed: false, createdAt: new Date() },
    ]);
    setInput("");
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const filtered = todos.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  const filters: { label: string; value: Filter }[] = [
    { label: "すべて", value: "all" },
    { label: "未完了", value: "active" },
    { label: "完了済み", value: "completed" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-center text-gray-800 tracking-tight">
            TODO App
          </h1>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-2xl mx-auto px-3 py-4 space-y-4 sm:px-4 sm:py-8 sm:space-y-6">
        <button
          className="error-button px-6 py-3 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-base rounded-lg shadow-md transition-colors"
          onClick={() => { throw new Error("Test error from error-button"); }}
        >
          エラー発生
        </button>
        {/* Input Form */}
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
            placeholder="新しいTODOを入力..."
            className="flex-1 px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm sm:text-base"
          />
          <button
            onClick={addTodo}
            aria-label="追加"
            className="px-3 py-2 sm:px-5 sm:py-2.5 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center flex-shrink-0"
          >
            {/* モバイル: + アイコンのみ / タブレット以上: テキスト */}
            <span className="sm:hidden text-xl leading-none">+</span>
            <span className="hidden sm:inline">追加</span>
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-1 bg-gray-200 rounded-lg p-1">
          {filters.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`flex-1 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors ${
                filter === value
                  ? "bg-white text-gray-800 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* TODO List */}
        <div className="space-y-2">
          {filtered.length === 0 ? (
            <div className="py-16 text-center text-gray-400">
              <p className="text-4xl mb-3">📋</p>
              <p className="text-sm">
                {filter === "all"
                  ? "TODOがありません。最初のTODOを追加してみましょう！"
                  : filter === "active"
                  ? "未完了のTODOはありません"
                  : "完了済みのTODOはありません"}
              </p>
            </div>
          ) : (
            filtered.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center gap-2 sm:gap-3 px-3 py-2.5 sm:px-4 sm:py-3 bg-white border border-gray-200 rounded-lg shadow-sm group"
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="w-4 h-4 accent-blue-500 cursor-pointer flex-shrink-0"
                />
                <span
                  className={`flex-1 text-sm ${
                    todo.completed ? "line-through text-gray-400" : "text-gray-700"
                  }`}
                >
                  {todo.title}
                </span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-gray-300 hover:text-red-500 transition-colors opacity-100 sm:opacity-0 sm:group-hover:opacity-100 text-lg leading-none flex-shrink-0"
                  aria-label="削除"
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>

        {/* Count */}
        {todos.length > 0 && (
          <p className="text-xs text-gray-400 text-right">
            {todos.filter((t) => !t.completed).length} 件残り / 合計 {todos.length} 件
          </p>
        )}
      </main>
    </div>
  );
}
