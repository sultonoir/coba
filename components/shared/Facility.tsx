import React, { useState } from "react";

interface FacilityProps {
  value: string[];
  onChange: (value: string[]) => void;
}

const Facility: React.FC<FacilityProps> = ({ value, onChange }) => {
  const [todos, setTodos] = useState(value); // State untuk menyimpan daftar todos
  const [newTodo, setNewTodo] = useState(""); // State untuk nilai baru yang akan ditambahkan

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value); // Memperbarui nilai state newTodo saat input berubah
  };

  const handleAddTodo = () => {
    // Menambahkan nilai baru ke dalam array todos
    if (newTodo.trim() !== "") {
      const updatedTodos = [...todos, newTodo];
      setTodos(updatedTodos);
      onChange(updatedTodos);
      setNewTodo(""); // Mengosongkan nilai input setelah ditambahkan
    }
  };

  const handleDeleteTodo = (index: number) => {
    // Menghapus todo berdasarkan index
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    onChange(updatedTodos);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Mencegah aksi default saat menekan tombol "Enter"
      handleAddTodo(); // Menambahkan todo saat tombol "Enter" ditekan
    }
  };

  return (
    <div>
      <div className="mb-4 flex gap-2">
        <input
          className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-rose-500 w-full"
          placeholder="Tambakan fasilitas"
          type="text"
          value={newTodo}
          onChange={handleInputChange}
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
            <span>{todo}</span>
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

export default Facility;
