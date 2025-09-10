# Abrigo de Animais

Projeto desenvolvido para simular a adoção de animais em um abrigo, aplicando regras de compatibilidade e limite de adoção.

## Descrição

Este projeto implementa a lógica de um abrigo de animais onde cada pessoa pode adotar animais conforme regras específicas de brinquedos e limites de adoção. Animais que não se encaixam nas regras permanecem no abrigo.

## Tecnologias

- Node.js
- JavaScript (ES6+)
- Jest (para testes automatizados)

## Regras Implementadas

- Cada pessoa pode adotar **até 3 animais**.
- **Gatos não podem compartilhar os mesmos brinquedos**.
- O animal **Loco** (jabuti) **não pode ficar sozinho**.
- Animais com brinquedos inválidos não podem ser adotados.
- Em caso de conflito, o animal **fica no abrigo**.

## Como Rodar

1. Clone o repositório:
   ```bash
   https://github.com/MalikLaet/desafio-MalikLaet-2025.git
   cd abrigo-animais
Instale as dependências:

2. npm install
Rode os testes:

3. npm test


Exemplo de Uso
import { AbrigoAnimais } from './abrigo-animais';

const abrigo = new AbrigoAnimais();

const resultado = abrigo.encontraPessoas(
  'BOLA,LASER,RATO', // brinquedos da pessoa 1
  'RATO,BOLA,LASER', // brinquedos da pessoa 2
  'Mimi,Fofo'        // lista de animais
);

console.log(resultado);
/*
{
  erro: 'Brinquedo inválido', // se houver conflito
  lista: undefined            // ou a lista de atribuições
}
*/

 Regras básicas de validação de brinquedos e limites implementadas.

Autor
Malik Laet