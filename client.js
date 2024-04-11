const axios = require("axios");
const config = {
  headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
  }
}

// Exercício 0: obter o token
async function get_token(){
    return axios
        .post("https://tecweb-js.insper-comp.com.br/token", { username: "pedronas" }, config)
        .then((response) => response.data.accessToken);
}

// Exercício 0: obter os exercícios
async function get_exercises(config){
  return axios
        .get("https://tecweb-js.insper-comp.com.br/exercicio", config)
        .then((response) => response.data)
}

// Exercício 1: soma
async function exercicio_1(exercises, config){
  ex1 = exercises['soma']
  num1 = ex1['entrada']['a']
  num2 = ex1['entrada']['b']
  return axios
      .post("https://tecweb-js.insper-comp.com.br/exercicio/soma", {'resposta': num1 + num2}, config)
      .then((response) => response.data)
      // para ver o sucesso: console.log(response.data)
}

// Exercício 2
async function exercicio_2(exercises, config){
  ex2 = exercises['tamanho-string']
  return axios
      .post("https://tecweb-js.insper-comp.com.br/exercicio/tamanho-string", {'resposta': ex2['entrada']['string'].length}, config)
      .then((response) => response.data)
}

// Exercício 3
async function exercicio_3(exercises, config){
  ex3 = exercises['nome-do-usuario'];
  email = ex3['entrada']['email'];
  arroba = email.search("@")
  return axios
      .post("https://tecweb-js.insper-comp.com.br/exercicio/nome-do-usuario", {'resposta': email.slice(0, arroba)}, config)
      .then((response) => response.data)
}

async function main(){
    let token = await get_token();
    config["headers"]["Authorization"] = `Bearer ${token}`;
    let exercises = await get_exercises(config);
    await exercicio_1(exercises, config);
    await exercicio_2(exercises, config);
    await exercicio_3(exercises, config);
    console.log(exercises);
}

main();