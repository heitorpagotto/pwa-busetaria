# Pwa Bus Etária

Bus Etária é um projeto feito com o intuito de auxiliar usuários idosos a encontrar a melhor rota de ônibus para seu
destino escolhido.

---

## Tecnologias

- Angular 15.2.8
- HTML5
- CSS3
- TypeScript
- JSON

## Como compilar

### Node

É preciso obrigatoriamente do seguinte pacote para que o projeto possa compilar:

- Node JS ^14.20.0 || ^16.13.0 || ^18.10.0

### Angular CLI

Após a instalação do Node, rodar o seguinte comando:

`npm install --global @angular/cli@15`

### Projeto

Ao abrir o projeto, é preciso rodar o seguinte comando:

`npm i`

Após a instalação de todos os pacotes necessários é preciso rodar o seguinte comando:

`ng serve --o`

O servidor do Angular CLI será instanciado e o projeto vai abrir na url `localhost:4200`

### Deploy

Para realizar um build para deploy só é preciso rodar o seguinte comando:

`ng build --configuration=production`

O Angular CLI irá compilar o projeto e colocar todos os arquivos relevantes para publicação dentro de uma pasta
chamada `dist/pwa-busetaria`
