"use client"; // Component นี้เป็น Client Component เพราะใช้ hook

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@apollo/client";
import { GET_POKEMON_QUERY } from "../graphql/queries"; // import query ที่เราสร้างไว้

import SearchInput from "./SearchInput";
import PokemonResult from "./PokemonResult";

export default function PokemonSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pokemonName = searchParams.get("name");

  const { data, loading, error } = useQuery(GET_POKEMON_QUERY, {
    variables: { name: pokemonName },
    skip: !pokemonName,
  });

  const handleSearch = (name: string) => {
    router.push(`/?name=${name}`);
  };

  return (
    <>
      <SearchInput onSearch={handleSearch} />

      <div className="w-full max-w-2xl mt-4 border-t pt-4">
          <PokemonResult
            loading={loading}
            error={error}
            data={data}
            onEvolutionClick={handleSearch}
            searchedTerm={pokemonName}
          />
      </div>
    </>
  );
}