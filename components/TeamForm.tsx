import { View, Text, TextInput, Button, StyleSheet } from "react-native";

interface Props {
  nome: string;
  treinador: string;
  quantidade: number;
  onNome: (valor: string) => void;
  onTreinador: (valor: string) => void;
  onSalvar: () => void;
  salvando: boolean;
}

export default function TeamForm(props: Props) {
  return <View style={styles.box}>
    <Text style={styles.title}>Cadastrar equipe</Text>
    <TextInput style={styles.input} placeholder="Nome da equipe"
      value={props.nome} onChangeText={props.onNome} />
    <TextInput style={styles.input} placeholder="Nome do treinador"
      value={props.treinador} onChangeText={props.onTreinador} />
    <Text>Pokémon selecionados: {props.quantidade}</Text>
    <Button title="Salvar equipe (POST)" onPress={props.onSalvar}
      disabled={props.salvando} />
  </View>;
}
const styles = StyleSheet.create({
  box: { marginVertical: 14, padding: 10, borderWidth: 1, borderRadius: 8 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
  input: { borderWidth: 1, padding: 10, marginBottom: 8, borderRadius: 6 }
});
