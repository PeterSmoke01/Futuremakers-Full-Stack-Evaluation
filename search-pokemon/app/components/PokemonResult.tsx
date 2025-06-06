import React from "react";
import { ApolloError } from "@apollo/client";

// 1. กำหนด Type/Interface สำหรับข้อมูลที่จะรับเข้ามาให้ครบถ้วน
// ซึ่งต้องตรงกับโครงสร้างของ GraphQL Query ที่เราเขียนไว้
interface SpecialAttack {
  name: string;
  type: string;
  damage: number;
}

interface Evolution {
  id: string;
  name: string;
  image: string;
}

interface Pokemon {
  id: string;
  name: string;
  image: string;
  types: string[];
  attacks: {
    special: SpecialAttack[];
  };
  evolutions: Evolution[];
}

interface PokemonData {
  pokemon: Pokemon | null;
}

interface PokemonResultProps {
  loading: boolean;
  error?: ApolloError;
  data?: PokemonData;
  onEvolutionClick: (pokemonName: string) => void;
}

const PokemonResult: React.FC<PokemonResultProps> = ({
  loading,
  error,
  data,
  onEvolutionClick,
}) => {
  // 2. จัดการสถานะ Loading
  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  // 3. จัดการสถานะ Error หรือ หาไม่เจอ (API จะ trả về data.pokemon เป็น null)
  if (error || !data?.pokemon) {
    return (
      <div className="text-center text-red-500">
        Could not find that Pokémon. Please try another one.
      </div>
    );
  }

  // 4. ถ้าทุกอย่างปกติ ให้แสดงข้อมูลโปเกมอน
  const { pokemon } = data;

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
      {/* ส่วนรูปและชื่อ */}
      <div className="flex-shrink-0 text-center">
        <h2 className="text-3xl font-bold mb-2">{pokemon.name}</h2>
        <div className="flex justify-center gap-2 mb-2">
          {pokemon.types.map((type) => (
            <span key={type} className="px-2 py-1 bg-gray-200 text-sm rounded">
              {type}
            </span>
          ))}
        </div>
        <img src={pokemon.image} alt={pokemon.name} className="w-48 h-48 mx-auto" />
      </div>

      <div className="w-full">
        {/* ส่วนท่าโจมตีพิเศษ */}
        {pokemon.attacks.special.length > 0 && (
          <div className="mb-6">
            <h3 className="text-2xl font-semibold border-b mb-2">Special Attacks</h3>
            <ul className="list-disc list-inside">
              {pokemon.attacks.special.map((attack) => (
                <li key={attack.name}>
                  {attack.name} ({attack.type}) - Damage: {attack.damage}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ส่วนร่างพัฒนา */}
        {pokemon.evolutions?.length > 0 && (
          <div>
            <h3 className="text-2xl font-semibold border-b mb-2">Evolutions</h3>
            <div className="flex gap-4">
              {pokemon.evolutions.map((evolution) => (
                <button
                  key={evolution.id}
                  onClick={() => onEvolutionClick(evolution.name.toLowerCase())}
                  className="text-center p-2 border rounded-lg hover:bg-gray-100 transition"
                >
                  <img src={evolution.image} alt={evolution.name} className="w-24 h-24" />
                  <p>{evolution.name}</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonResult;