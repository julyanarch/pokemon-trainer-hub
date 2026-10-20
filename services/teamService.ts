import { Team } from "../types/team";

// Troque pelo IP do computador que executa o JSON Server.
// No Expo Go, localhost refere-se ao próprio celular.
const API_URL = "http://192.168.10.11:3001";

export async function listarEquipes(): Promise<Team[]> {
  const response = await fetch(`${API_URL}/equipes`);

  // QUESTÃO 3: validar response.ok e retornar a lista de equipes.
  if (!response.ok) {
    throw new Error(`Erro ao listar equipes (status ${response.status}).`);
  }
  const equipes: Team[] = await response.json();
  return equipes;
}

export async function cadastrarEquipe(equipe: Team): Promise<Team> {
  const response = await fetch(`${API_URL}/equipes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(equipe)
  });

  // QUESTÃO 2: validar response.ok e retornar equipe cadastrada.
  if (!response.ok) {
    throw new Error(`Erro ao cadastrar equipe (status ${response.status}).`);
  }
  const equipeCadastrada: Team = await response.json();
  return equipeCadastrada;
}
