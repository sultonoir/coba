import axios from "axios";
import React, { useState } from "react";

interface NearTourProps {
  value: any[];
  onChange: (value: string[]) => void;
  delete?: boolean;
  id?: string;
}

const NearTour: React.FC<NearTourProps> = ({
  value,
  onChange,
  delete: shouldDelete,
  id,
}) => {
  const [todos, setTodos] = useState(value);
  const [cost, setCost] = useState("");
  const [newTodo, setNewTodo] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value);
  };

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      const newTodoObject = { name: newTodo, cost: cost };
      const updatedTodos = [...todos, newTodoObject];
      setTodos(updatedTodos);
      onChange(updatedTodos);
      setNewTodo("");
      setCost(""); // Mengatur ulang nilai cost setelah menambahkan todo
    }
  };

  const handleDeleteTodo = (index: number) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    onChange(updatedTodos);

    if (shouldDelete && id) {
      axios
        .delete(`/api/additional/${id}`)
        .then((response) => {
          console.log("Item dihapus dari endpoint", response.data);
        })
        .catch((error) => {
          console.error("Gagal menghapus item dari endpoint", error);
        });
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddTodo();
    }
  };

  return (
    <div>
      <div className="mb-4 flex gap-2">
        <input
          className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-rose-500 w-full"
          placeholder="Wisata terdekat"
          type="text"
          value={newTodo}
          onChange={handleInputChange}
        />
        <input
          className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-rose-500 w-20"
          placeholder="Cost"
          type="number"
          value={cost}
          onChange={(event) => setCost(event.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="bg-rose-500 hover:bg-rose-600 text-white font-bold px-2 py-1 rounded-md focus:outline-none"
          onClick={handleAddTodo}
        >
          Tambah
        </button>
      </div>

      <ul className="list-disc list-inside">
        {todos.map((todo, index) => (
          <li
            key={index}
            className="flex items-center mb-2 justify-between"
          >
            <span>{todo.name}</span>
            <span>{todo.cost}</span>
            <button
              className="ml-2 bg-rose-500 hover:bg-rose-600 text-white font-bold px-2 py-1 rounded-md focus:outline-none"
              onClick={() => handleDeleteTodo(index)}
            >
              Hapus
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NearTour;
``;
