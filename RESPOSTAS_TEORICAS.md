# Pokémon Trainer Hub — Respostas Teóricas (Questão 6)

**Trabalho** _[Julyana Silva da Rocha]_

## (a) Diferença entre GET e POST

O método **GET** é usado para **consultar/obter** dados de um servidor, sem alterar nada. Os parâmetros vão na própria URL (por exemplo, `https://pokeapi.co/api/v2/pokemon/pikachu`) e a requisição não possui corpo. No projeto, usamos GET para buscar um Pokémon na PokéAPI e para listar as equipes em `GET /equipes` no JSON Server.

O método **POST** é usado para **enviar dados e criar um novo recurso** no servidor. Os dados vão no **corpo (body)** da requisição. No projeto, usamos POST em `/equipes` para cadastrar uma nova equipe, que o JSON Server grava no arquivo `server/db.json`, gerando um `id` automaticamente. Ou seja: GET lê, POST cria (altera o estado do servidor).

## (b) Por que usar `JSON.stringify()` no POST

O corpo de uma requisição HTTP é transmitido como **texto**, e não como um objeto JavaScript. `JSON.stringify()` converte o objeto da equipe (`{ nome, treinador, pokemons }`) em uma **string no formato JSON**. Junto com o cabeçalho `"Content-Type": "application/json"`, isso informa ao JSON Server que o corpo é JSON, permitindo que ele interprete e salve os dados corretamente. Sem a conversão, o objeto seria enviado como `"[object Object]"` e o cadastro falharia.

## (c) Finalidade de `response.ok`

O `fetch` só lança erro em falhas de rede; respostas como **404** (não encontrado) ou **500** (erro do servidor) são consideradas requisições "concluídas". A propriedade `response.ok` é `true` apenas quando o status HTTP está entre **200 e 299** (sucesso). Por isso verificamos `if (!response.ok)` e lançamos um erro manualmente — assim conseguimos tratar, por exemplo, um Pokémon inexistente (status 404) e exibir uma mensagem amigável ao usuário, em vez de tentar usar dados inválidos.

## (d) Como `useEffect` e `useState` atualizam a interface

O **`useState`** cria uma variável de estado e uma função para alterá-la (ex.: `const [equipes, setEquipes] = useState<Team[]>([])`). Sempre que a função `setEquipes` é chamada com um novo valor, o React **renderiza o componente novamente**, e a tela passa a mostrar os dados atualizados.

O **`useEffect`** executa efeitos colaterais (como chamadas à API) em momentos específicos. Com o array de dependências vazio `[]`, ele roda **uma única vez, quando o componente é montado**. No projeto, ele chama `carregarEquipes()` ao abrir o app; essa função faz o GET e chama `setEquipes(dados)`, o que dispara a nova renderização e exibe a lista. Da mesma forma, após um POST bem-sucedido, `setEquipes(atuais => [...atuais, cadastrada])` adiciona a nova equipe e a lista é atualizada sem reiniciar o aplicativo.
