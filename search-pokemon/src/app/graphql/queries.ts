import { gql } from "@apollo/client";

export const GET_POKEMON_QUERY = gql`
  query GetPokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      image
      types  # <--- เพิ่ม field นี้เข้ามา
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