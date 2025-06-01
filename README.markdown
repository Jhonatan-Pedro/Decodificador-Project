# Enigma Decoder

## Sobre o Projeto

O **Enigma Decoder** é um projeto desenvolvido como atividade em grupo para o curso do Senac, inspirado no filme *O Jogo da Imitação*, que retrata a vida de Alan Turing e sua contribuição na decodificação da máquina Enigma durante a Segunda Guerra Mundial. Nosso objetivo foi criar uma ferramenta interativa e educativa que permite codificar e decodificar mensagens usando a **Cifra de César**, uma técnica clássica de criptografia.

A aplicação oferece uma interface intuitiva, com suporte a histórico de mensagens, animações suaves e um design moderno com estética retrofuturista, utilizando HTML, CSS e JavaScript.

### Equipe de Desenvolvimento
- **Jhonatan Pedro**
- **Guilherme Oliveira**
- **Pedro Paulo**

## Funcionalidades

- **Codificação e Decodificação**: Insira uma mensagem e um deslocamento (chave) para codificar ou decodificar usando a Cifra de César.
- **Histórico de Mensagens**: Visualize mensagens codificadas/decodificadas anteriormente, com horário e chave usada.
- **Validação de Entrada**: Exibe mensagens de erro para entradas inválidas (ex.: deslocamento fora do intervalo 1-25).
- **Interface Responsiva**: Design adaptável para diferentes tamanhos de tela.
- **Efeitos Visuais**: Animações suaves para transições e interações, com um fundo dinâmico em gradiente.

## Tecnologias Utilizadas

- **HTML5**: Estrutura das páginas.
- **CSS3**: Estilização com glassmorphism, gradientes animados e responsividade.
- **JavaScript**: Lógica da Cifra de César, manipulação do DOM e armazenamento no localStorage.
- **Fontes**: Roboto e Share Tech Mono (via Google Fonts).

## Como Usar

1. Acesse a página principal `index.html` para conhecer o projeto ou vá direto para `decodificador.html` para usar o decifrador.
2. Insira uma mensagem no campo "Mensagem".
3. Escolha um deslocamento (chave) entre 1 e 25.
4. Clique em "Codificar" ou "Decodificar" para processar a mensagem.
5. Veja o resultado e o histórico de mensagens abaixo.
6. Use o botão "Limpar" para resetar tudo (mensagem, resultado e histórico).

## Estrutura do Projeto

- `index.html`: Página inicial com apresentação do projeto.
- `decodificador.html`: Página do decifrador funcional.
- `style.css`: Estilização do decifrador.
- `apresentacao.css`: Estilização da página inicial.
- `script.js`: Lógica do decifrador (Cifra de César, histórico, validações).
- `imagens/`: Diretório com ícones e imagens usadas no projeto.

## Sobre a Cifra de César

A Cifra de César é uma técnica de criptografia onde cada letra do texto é deslocada por um número fixo de posições no alfabeto. Por exemplo, com deslocamento 3, 'A' vira 'D', 'B' vira 'E', e assim por diante. Apesar de simples, é uma ótima introdução aos conceitos de criptografia.

## Instalação

1. Clone o repositório ou baixe os arquivos.
2. Abra o arquivo `index.html` ou `decodificador.html` em um navegador moderno.
3. Não é necessária nenhuma configuração adicional, pois o projeto roda inteiramente no lado do cliente.

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE.txt](LICENSE.txt) para mais detalhes.

## Agradecimentos

Agradecemos ao Senac por proporcionar a oportunidade de desenvolver este projeto e ao filme *O Jogo da Imitação* por nos inspirar a explorar o fascinante mundo da criptografia.

---

© 2025 Enigma Decoder. Desenvolvido por Jhonatan Pedro, Guilherme Oliveira e Pedro Paulo.