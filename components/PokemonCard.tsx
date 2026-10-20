import { View, Text, Image, Button, StyleSheet } from "react-native";
import { Pokemon } from "../types/pokemon";

interface Props {
  pokemon: Pokemon;
  onSelecionar: (pokemon: Pokemon) => void;
  selecionado: boolean;
}

export default function PokemonCard({ pokemon, onSelecionar, selecionado }: Props) {
  const hp = pokemon.stats.find(s => s.stat.name === "hp")?.base_stat ?? 0;
  return (
    <View style={styles.card}>
      {pokemon.sprites.front_default &&
        <Image source={{ uri: pokemon.sprites.front_default }} style={styles.img} />}
      <Text style={styles.name}>{pokemon.name.toUpperCase()}</Text>
      <Text>ID: {pokemon.id} | HP: {hp}</Text>
      <Text>Tipos: {pokemon.types.map(t => t.type.name).join(", ")}</Text>
      <Button title={selecionado ? "Selecionado" : "Adicionar à equipe"}
        onPress={() => onSelecionar(pokemon)} disabled={selecionado} />
    </View>
  );
}
const styles = StyleSheet.create({
  card: { padding: 12, borderWidth: 1, borderRadius: 8, marginVertical: 8, alignItems: "center" },
  img: { width: 96, height: 96 },
  name: { fontSize: 18, fontWeight: "bold" }
});
