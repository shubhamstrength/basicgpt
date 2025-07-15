import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

async function askRAG(question: string): Promise<string> {
  const res = await axios.post("http://127.0.0.1:8000/ask", { question });
  return res.data.answer;
}

export default function AskRag() {
  const [question, setQuestion] = useState("");

  const { mutate, data, isPending, isError } = useMutation({
    mutationFn: askRAG,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) {
      mutate(question);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl mb-4 font-semibold">Ask Shubham’s Knowledge Assistant</h2>
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="flex-1 border p-2 rounded"
          placeholder="Ask about Shubham's skills, experience, etc."
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Ask
        </button>
      </form>

      {isPending && <p className="mt-4">Loading answer...</p>}
      {isError && <p className="mt-4 text-red-500">Something went wrong. Try again.</p>}
      {data && (
        <div className="mt-4 bg-gray-100 p-4 rounded">
          <h4 className="font-semibold mb-2">Answer:</h4>
          <p>{data}</p>
        </div>
      )}
    </div>
  );
}
