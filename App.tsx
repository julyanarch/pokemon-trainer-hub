import { useEffect, useState } from "react";
import {
  SafeAreaView, ScrollView, View, Text, TextInput,
  Button, ActivityIndicator, StyleSheet
} from "react-native";
import PokemonCard from "./components/PokemonCard";
import TeamCard from "./components/TeamCard";
import TeamForm from "./components/TeamForm";
import { Pokemon } from "./types/pokemon";
import { Team } from "./types/team";
import { buscarPokemon } from "./services/pokemonService";
import { listarEquipes, cadastrarEquipe } from "./services/teamService";

export default function App() {
  const [pesquisa, setPesquisa] = useState("");
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [selecionados, setSelecionados] = useState<Pokemon[]>([]);
  const [nome, setNome] = useState("");
  const [treinador, setTreinador] = useState("");
  const [equipes, setEquipes] = useState<Team[]>([]);
  const [filtro, setFiltro] = useState("");
  const [loading, setLoading] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [mensagem, setMensagem] = useState("");

  async function pesquisar() {
    if (!pesquisa.trim()) { setErro("Digite o nome de um Pokémon."); return; }
    try {
      setLoading(true); setErro(null); setPokemon(null);
      const resultado = await buscarPokemon(pesquisa);
      setPokemon(resultado);
    } catch (e) {
      // QUESTÃO 1: mostra a mensagem do serviço (ex.: Pokémon inexistente)
      setErro(e instanceof Error ? e.message : "Não foi possível consultar o Pokémon.");
    } finally { setLoading(false); }
  }

  function selecionar(p: Pokemon) {
    if (selecionados.some(item => item.id === p.id)) return;
    setSelecionados(atuais => [...atuais, p]);
  }

  async function carregarEquipes() {
    try {
      const dados = await listarEquipes();
      setEquipes(dados);
    } catch {
      setErro("Não foi possível consultar as equipes.");
    }
  }

  useEffect(() => {
    // QUESTÃO 3: chamar carregarEquipes() ao abrir o aplicativo.
    carregarEquipes();
  }, []);

  async function salvarEquipe() {
    setErro(null);
    setMensagem("");

    // QUESTÃO 2: validar nome, treinador e ao menos um Pokémon selecionado.
    if (!nome.trim()) { setErro("Informe o nome da equipe."); return; }
    if (!treinador.trim()) { setErro("Informe o nome do treinador."); return; }
    if (selecionados.length === 0) {
      setErro("Selecione ao menos um Pokémon para a equipe.");
      return;
    }

    const novaEquipe: Team = {
      nome: nome.trim(),
      treinador: treinador.trim(),
      pokemons: selecionados.map(p => p.id)
    };

    // QUESTÃO 4: chamar cadastrarEquipe, atualizar a lista,
    // limpar formulário somente em caso de sucesso e mostrar feedback.
    try {
      setSalvando(true);
      const cadastrada = await cadastrarEquipe(novaEquipe);
      setEquipes(atuais => [...atuais, cadastrada]); // atualiza sem reiniciar o app
      setNome("");
      setTreinador("");
      setSelecionados([]);
      setPokemon(null);
      setPesquisa("");
      setMensagem(`Equipe "${cadastrada.nome}" cadastrada com sucesso!`);
    } catch {
      // Em caso de falha, os dados do formulário são preservados.
      setErro("Não foi possível salvar a equipe. Verifique a API e tente novamente.");
    } finally {
      setSalvando(false);
    }
  }

  // QUESTÃO 5: filtro por nome do treinador (sem diferenciar maiúsculas/minúsculas).
  const termo = filtro.trim().toLowerCase();
  const equipesFiltradas = equipes.filter(e =>
    e.treinador.toLowerCase().includes(termo)
  );

  return <SafeAreaView style={styles.root}>
    <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Pokémon Trainer Hub</Text>
      <Text style={styles.heading}>Pesquisar Pokémon (GET)</Text>
      <TextInput style={styles.input} value={pesquisa} onChangeText={setPesquisa}
        autoCapitalize="none" placeholder="Ex.: pikachu" />
      <Button title="Buscar Pokémon" onPress={pesquisar} disabled={loading} />
      {loading && <ActivityIndicator size="large" />}
      {erro && <Text style={styles.error}>{erro}</Text>}
      {mensagem !== "" && <Text style={styles.success}>{mensagem}</Text>}
      {pokemon && <PokemonCard pokemon={pokemon} onSelecionar={selecionar}
        selecionado={selecionados.some(p => p.id === pokemon.id)} />}
      <Text>Selecionados: {selecionados.map(p => p.name).join(", ") || "Nenhum"}</Text>
      <TeamForm nome={nome} treinador={treinador} quantidade={selecionados.length}
        onNome={setNome} onTreinador={setTreinador}
        onSalvar={salvarEquipe} salvando={salvando} />
      <Text style={styles.heading}>Equipes cadastradas (GET)</Text>
      <TextInput style={styles.input} value={filtro} onChangeText={setFiltro}
        placeholder="Filtrar por treinador" />
      <Button title="Atualizar lista" onPress={carregarEquipes} />
      {equipesFiltradas.map(e => <TeamCard key={e.id ?? `${e.nome}-${e.treinador}`} equipe={e} />)}
      {equipesFiltradas.length === 0 && (
        <Text style={styles.empty}>
          {termo
            ? `Nenhuma equipe encontrada para o treinador "${filtro.trim()}".`
            : "Nenhuma equipe cadastrada."}
        </Text>
      )}
    </ScrollView>
  </SafeAreaView>;
}
const styles = StyleSheet.create({
  root: { flex: 1 },
  content: { padding: 18, paddingBottom: 50 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 15 },
  heading: { fontSize: 19, fontWeight: "bold", marginVertical: 12 },
  input: { borderWidth: 1, padding: 10, borderRadius: 6, marginBottom: 8 },
  error: { color: "red", marginVertical: 10 },
  success: { color: "green", marginVertical: 10, fontWeight: "bold" },
  empty: { fontStyle: "italic", marginTop: 8 }
});
