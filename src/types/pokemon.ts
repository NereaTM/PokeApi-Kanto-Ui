export interface PokemonListResult {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  results: PokemonListResult[];
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
  };
}

export interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
    front_shiny?: string;
    other?: {
      'official-artwork'?: {
        front_default: string;
      };
    };
  };
  types: PokemonType[];
  stats: PokemonStat[];

}

export interface PokemonSpecies {
  id: number;
  name: string;
  flavor_text_entries: FlavorText[];
  habitat: {
    name: string;
  } | null;
  generation: {
    name: string;
  };
  is_legendary: boolean;
  is_mythical: boolean;
}

export interface FlavorText {
  flavor_text: string;
  language: {
    name: string;
  };
  version: {
    name: string;
  };
}
