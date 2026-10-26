# Pokémon Trainer Hub 

## Executar

1. `npm install`
2. Terminal 1: `npm run api`
3. Terminal 2: `npx expo start`
4. Em `services/teamService.ts`, substitua `SEU_IP` pelo IPv4 do computador.
5. Para Expo Go, celular e computador devem estar na mesma rede.

## Endpoints

- `GET https://pokeapi.co/api/v2/pokemon/pikachu`
- `GET http://SEU_IP:3001/equipes`
- `POST http://SEU_IP:3001/equipes`

## Questões

1. Completar GET PokéAPI.
2. Completar POST e validações.
3. Completar GET equipes e useEffect.
4. Atualizar lista e limpar formulário após POST bem-sucedido.
5. Implementar filtro por treinador.
6. Responder às perguntas teóricas no documento de entrega.

**Nota:** o JSON Server é para desenvolvimento local. Não publicar o servidor na internet sem proteção.
