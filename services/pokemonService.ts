import { Pokemon } from "../types/pokemon";

export async function buscarPokemon(nome: string): Promise<Pokemon> {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(nome.toLowerCase().trim())}`
  );

  // QUESTÃO 1: verificar response.ok e lançar erro em caso de falha.
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Pokémon não encontrado. Verifique o nome ou número.");
    }
    throw new Error(`Erro ao consultar a PokéAPI (status ${response.status}).`);
  }

  // QUESTÃO 1: converter response.json() e retornar o Pokemon.
  const dados: Pokemon = await response.json();
  return dados;
}
