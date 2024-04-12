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
const eh_primo = function(n){
  if (n === 0 || n === 1 || n < 0){
    return false;
  }
  else if (n === 2){
    return true;
  }
  let i = 2
  while (i != n){
    if (n % i == 0){
      return false
    }
    i++
  }
  return true
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
  let ex1 = exercises['soma']
  let num1 = ex1['entrada']['a']
  let num2 = ex1['entrada']['b']
  return axios
      .post("https://tecweb-js.insper-comp.com.br/exercicio/soma", {'resposta': num1 + num2}, config)
      .then((response) => response.data)
      // para ver o sucesso: console.log(response.data)
}

// Exercício 2: tamanho-string
async function exercicio_2(exercises, config){
  let ex2 = exercises['tamanho-string']
  return axios
      .post("https://tecweb-js.insper-comp.com.br/exercicio/tamanho-string", {'resposta': ex2['entrada']['string'].length}, config)
      .then((response) => response.data)
}

// Exercício 3: nome-do-usuario
async function exercicio_3(exercises, config){
  let ex3 = exercises['nome-do-usuario'];
  let email = ex3['entrada']['email'];
  let arroba = email.search("@")
  return axios
      .post("https://tecweb-js.insper-comp.com.br/exercicio/nome-do-usuario", {'resposta': email.slice(0, arroba)}, config)
      .then((response) => response.data)
}

// Exercício 4: jaca-wars
async function exercicio_4(exercises, config){
  let ex4 = exercises['jaca-wars'];
  let g = 9.8
  let a = ex4['entrada']['theta'] 
  let v = ex4['entrada']['v']
  let a_rad = radians(a)
  let d = (v**2*(Math.sin(2*a_rad)))/g

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
  let ex5 = exercises['ano-bissexto'];
  let ano = ex5['entrada']['ano'];
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
  let ex6 = exercises['volume-da-pizza'];
  let z = ex6['entrada']['z'];
  let a = ex6['entrada']['a'];
  return axios
      .post("https://tecweb-js.insper-comp.com.br/exercicio/volume-da-pizza", {'resposta': Math.round(Math.PI*(z**2)*a)}, config)
      .then((response) => response.data)
}

// Exercício 7: mru
async function exercicio_7(exercises, config){
  let ex7 = exercises['mru']
  let s0 = ex7['entrada']['s0']
  let v = ex7['entrada']['v']
  let t = ex7['entrada']['t']
  return axios
      .post("https://tecweb-js.insper-comp.com.br/exercicio/mru", {'resposta': s0 + v*t}, config)
      .then((response) => response.data)
}

// Exercício 8: inverte-string
async function exercicio_8(exercises, config){
  let ex8 = exercises['inverte-string']
  let str = ex8['entrada']['string']
  let split = str.split("")
  let reverse = split.reverse()
  return axios
      .post("https://tecweb-js.insper-comp.com.br/exercicio/inverte-string", {'resposta': reverse.join("")}, config)
      .then((response) => response.data)
}

// Exercício 9: soma-valores
async function exercicio_9(exercises, config){
  let ex9 = exercises['soma-valores']
  let obj = ex9['entrada']['objeto']
  let valores = Object.values(obj);
  return axios
      .post("https://tecweb-js.insper-comp.com.br/exercicio/soma-valores", {'resposta': valores.reduce((a, b) => a + b)}, config)
      .then((response) => response.data)
}

// Exercício 10: n-esimo-primo 
async function exercicio_10(exercises, config){
  let ex10 = exercises['n-esimo-primo']
  let num = ex10['entrada']['n']
  let i = 0
  let lista_primos = []
  while (lista_primos.length < num){
    if (eh_primo(i) == true){
      lista_primos.push(i);
    }
    i++
  }
  return axios
      .post("https://tecweb-js.insper-comp.com.br/exercicio/n-esimo-primo", {'resposta': lista_primos[lista_primos.length - 1]}, config)
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
    await exercicio_7(exercises, config);
    await exercicio_8(exercises, config);
    await exercicio_9(exercises, config);
    await exercicio_10(exercises, config);
    //console.log(exercises);
}

main();