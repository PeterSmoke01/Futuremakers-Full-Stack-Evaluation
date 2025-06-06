"use client"; // ต้องมี เพราะเราจะใช้ useState และ event handling

import React, { useState } from "react";
import type { SearchInputProps } from "../types";


const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // ป้องกันหน้าเว็บรีเฟรชตอนกดปุ่ม
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim().toLowerCase());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center gap-2 p-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter Pokémon name..."
        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
      />
      <button
        type="submit"
        className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
};

export default SearchInput;