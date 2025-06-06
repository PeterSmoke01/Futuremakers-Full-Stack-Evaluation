import { ApolloError } from "@apollo/client";

export interface SpecialAttack {
  name: string;
  type: string;
  damage: number;
}

export interface Evolution {
  id: string;
  name: string;
  image: string;
}

export interface Pokemon {
  id: string;
  name: string;
  image: string;
  types: string[];
  attacks: {
    special: SpecialAttack[];
  };
  evolutions: Evolution[];
}

export interface PokemonData {
  pokemon: Pokemon | null;
}

export interface PokemonResultProps {
  loading: boolean;
  error?: ApolloError;
  data?: PokemonData;
  onEvolutionClick: (pokemonName: string) => void;
  searchedTerm: string | null;
}