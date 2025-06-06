"use client";

import React, { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery, gql } from "@apollo/client";

import SearchInput from "./components/SearchInput";
import PokemonResult from "./components/PokemonResult";

// 1. กำหนด GraphQL Query ที่จะใช้
// เราขอข้อมูลโปเกมอนด้วยชื่อ ($name) และระบุ field ที่ต้องการทั้งหมด
const GET_POKEMON_QUERY = gql`
  query GetPokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      image
      attacks {
        special {
          name
          type
          damage
        }
      }
      evolutions {
        id
        name
        image
      }
    }
  }
`;

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pokemonName = searchParams.get("name"); // 2. ดึงชื่อโปเกมอนจาก URL parameter (เช่น /?name=pikachu)

  // 3. ใช้ useQuery เพื่อดึงข้อมูล
  const { data, loading, error } = useQuery(GET_POKEMON_QUERY, {
    variables: { name: pokemonName },
    skip: !pokemonName, // 4. ถ้าไม่มีชื่อโปเกมอนใน URL ก็ไม่ต้องรัน query
  });

  // 5. ฟังก์ชันนี้จะถูกเรียกเมื่อมีการค้นหาใหม่
  const handleSearch = (name: string) => {
    router.push(`/?name=${name}`); // 6. เปลี่ยน URL เพื่อให้เกิดการค้นหาใหม่
  };

  return (
    <main className="flex flex-col items-center min-h-screen p-8">
      <h1 className="text-4xl font-bold">Pokémon Search</h1>
      
      <SearchInput onSearch={handleSearch} />
      
      <div className="w-full max-w-2xl mt-4 border-t pt-4">
        {/* 2. ครอบ PokemonResult ด้วย Suspense */}
        <Suspense fallback={<div className="text-center">Searching...</div>}>
          <PokemonResult
            loading={loading}
            error={error}
            data={data}
            onEvolutionClick={handleSearch}
          />
        </Suspense>
      </div>
    </main>
  );
}