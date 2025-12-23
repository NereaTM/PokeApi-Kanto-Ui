import type { Pokemon, PokemonListResponse, PokemonListResult, PokemonSpecies } from '../types/pokemon';

const API_BASE = 'https://pokeapi.co/api/v2';

async function fetchJson<T>(url: string, errorMessage: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`${errorMessage} (HTTP ${response.status})`);
  }

  return response.json() as Promise<T>;
}

export async function fetchPokemonList(limit = 20, offset = 0): Promise<PokemonListResult[]> {
  const data = await fetchJson<PokemonListResponse>(
    `${API_BASE}/pokemon?limit=${limit}&offset=${offset}`,
    'Error al cargar la lista de Pokémon'
  );
  return data.results;
}

export function fetchPokemon(nameOrId: string | number): Promise<Pokemon> {
  return fetchJson<Pokemon>(`${API_BASE}/pokemon/${nameOrId}`, 'Error al cargar el Pokémon');
}

export function fetchPokemonSpecies(id: number): Promise<PokemonSpecies> {
  return fetchJson<PokemonSpecies>(`${API_BASE}/pokemon-species/${id}`, 'Error al cargar la especie del Pokémon');
}
