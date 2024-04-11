const axios = require("axios");
const config = {
  headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
  }
}
const radians = function(degrees) {
  return degrees * Math.PI / 180;
};

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

// Exercício 2: tamanho-string
async function exercicio_2(exercises, config){
  ex2 = exercises['tamanho-string']
  return axios
      .post("https://tecweb-js.insper-comp.com.br/exercicio/tamanho-string", {'resposta': ex2['entrada']['string'].length}, config)
      .then((response) => response.data)
}

// Exercício 3: nome-do-usuario
async function exercicio_3(exercises, config){
  ex3 = exercises['nome-do-usuario'];
  email = ex3['entrada']['email'];
  arroba = email.search("@")
  return axios
      .post("https://tecweb-js.insper-comp.com.br/exercicio/nome-do-usuario", {'resposta': email.slice(0, arroba)}, config)
      .then((response) => response.data)
}

// Exercício 4: jaca-wars
async function exercicio_4(exercises, config){
  ex4 = exercises['jaca-wars'];
  g = 9.8
  a = ex4['entrada']['theta'] 
  v = ex4['entrada']['v']
  a_rad = radians(a)
  d = (v**2*(Math.sin(2*a_rad)))/g

  if (d >= 98 && d <= 102){
    resposta = 0
  }
  else if (d < 98){
    resposta = -1
  }
  else{
    resposta = 1
  }

  return axios
      .post("https://tecweb-js.insper-comp.com.br/exercicio/jaca-wars", {'resposta': resposta}, config)
      .then((response) => response.data)
}

// Exercício 5: ano-bissexto
async function exercicio_5(exercises, config){
  ex5 = exercises['ano-bissexto'];
  ano = ex5['entrada']['ano'];
  if (ano % 4 == 0 && ano % 100 != 0 || ano % 400 == 0){
    bissexto = true
  }
  else{
    bissexto = false
  }
  return axios
      .post("https://tecweb-js.insper-comp.com.br/exercicio/ano-bissexto", {'resposta': bissexto}, config)
      .then((response) => response.data)
}

// Exercício 6: volume-da-pizza
async function exercicio_6(exercises, config){
  ex6 = exercises['volume-da-pizza'];
  z = ex6['entrada']['z'];
  a = ex6['entrada']['a'];
  return axios
      .post("https://tecweb-js.insper-comp.com.br/exercicio/volume-da-pizza", {'resposta': Math.round(Math.PI*(z**2)*a)}, config)
      .then((response) => console.log(response.data))
}

async function main(){
    let token = await get_token();
    config["headers"]["Authorization"] = `Bearer ${token}`;
    let exercises = await get_exercises(config);
    await exercicio_1(exercises, config);
    await exercicio_2(exercises, config);
    await exercicio_3(exercises, config);
    await exercicio_4(exercises, config);
    await exercicio_5(exercises, config);
    await exercicio_6(exercises, config);
    //console.log(exercises);
}

main();