import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../app/page';
import { MockedProvider } from '@apollo/client/testing';
import { GET_POKEMON_QUERY } from '../graphql/queries';

// Mock next/navigation
const mockUseSearchParams = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  useSearchParams: () => mockUseSearchParams(),
}));

// 2. เตรียมข้อมูล Mock สำหรับโปเกมอนแต่ละตัว
const bulbasaurMock = {
  request: {
    query: GET_POKEMON_QUERY,
    variables: { name: 'bulbasaur' },
  },
  result: {
    data: {
      pokemon: {
        id: 'UG9rZW1vbjowMDE=',
        name: 'Bulbasaur',
        image: 'https://img.pokemondb.net/artwork/bulbasaur.jpg',
        types: ['Grass', 'Poison'], // <-- ข้อมูลสำคัญที่ใช้เทส
        attacks: { special: [] },
        evolutions: [],
      },
    },
  },
};

const charmanderMock = {
  request: {
    query: GET_POKEMON_QUERY,
    variables: { name: 'charmander' },
  },
  result: {
    data: {
      pokemon: {
        id: 'UG9rZW1vbjowMDQ=',
        name: 'Charmander',
        image: 'https://img.pokemondb.net/artwork/charmander.jpg',
        types: ['Fire'], // <-- ข้อมูลสำคัญที่ใช้เทส
        attacks: { special: [] },
        evolutions: [],
      },
    },
  },
};

const squirtleMock = {
  request: {
    query: GET_POKEMON_QUERY,
    variables: { name: 'squirtle' },
  },
  result: {
    data: {
      pokemon: {
        id: 'UG9rZW1vbjowMDc=',
        name: 'Squirtle',
        image: 'https://img.pokemondb.net/artwork/squirtle.jpg',
        types: ['Water'], // <-- ข้อมูลสำคัญที่ใช้เทส
        attacks: { special: [] },
        evolutions: [],
      },
    },
  },
};

describe('Home Page - Pokémon Type Assertions', () => {

  // 3. เขียน Test case สำหรับแต่ละตัว
  it('should display "Grass" type for Bulbasaur', async () => {
    mockUseSearchParams.mockReturnValue({ get: () => 'bulbasaur' }); // จำลองว่า URL คือ ?name=bulbasaur

    render(
      <MockedProvider mocks={[bulbasaurMock]} addTypename={false}>
        <Home />
      </MockedProvider>
    );

    // ใช้ findByText เพราะข้อมูลมาแบบ async (รอโหลด)
    // แล้วเช็คว่ามีคำว่า "Grass" อยู่ในหน้าจอหรือไม่
    expect(await screen.findByText('Grass')).toBeInTheDocument();
  });

  it('should display "Fire" type for Charmander', async () => {
    mockUseSearchParams.mockReturnValue({ get: () => 'charmander' });

    render(
      <MockedProvider mocks={[charmanderMock]} addTypename={false}>
        <Home />
      </MockedProvider>
    );

    expect(await screen.findByText('Fire')).toBeInTheDocument();
  });

  it('should display "Water" type for Squirtle', async () => {
    mockUseSearchParams.mockReturnValue({ get: () => 'squirtle' });

    render(
      <MockedProvider mocks={[squirtleMock]} addTypename={false}>
        <Home />
      </MockedProvider>
    );

    expect(await screen.findByText('Water')).toBeInTheDocument();
  });
});