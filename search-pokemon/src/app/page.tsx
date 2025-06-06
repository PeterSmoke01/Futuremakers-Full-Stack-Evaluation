import React, { Suspense } from "react";
import PokemonSearch from "./components/PokemonSearch";

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen p-8">
      <h1 className="text-4xl font-bold">Pokémon Search</h1>

      <Suspense fallback={<div className="text-center p-8">Loading...</div>}>
        <PokemonSearch />
      </Suspense>

    </main>
  );
}