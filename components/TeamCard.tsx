import { View, Text, StyleSheet } from "react-native";
import { Team } from "../types/team";

export default function TeamCard({ equipe }: { equipe: Team }) {
  return <View style={styles.card}>
    <Text style={styles.name}>{equipe.nome}</Text>
    <Text>Treinador: {equipe.treinador}</Text>
    <Text>Pokémon: {equipe.pokemons.length}</Text>
  </View>;
}
const styles = StyleSheet.create({
  card: { padding: 12, borderBottomWidth: 1 },
  name: { fontWeight: "bold", fontSize: 16 }
});
