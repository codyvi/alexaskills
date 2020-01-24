const fetch = require('node-fetch');

module.exports.findgastosjd19 = async function findgastosjd19(slotUsuario) {
    let data = await getVP();
    let gastos = '';
        for ( let i = 0; i < data.length; i ++ ){
            if (data[i].vp === slotUsuario) {
                gastos = data[i].gastosjd19;
            }
        }
  console.log(gastos);
  return gastos;
}

module.exports.findvpName = async function findvpName(slotUsuario) {
    let data = await getVP();
    let gastos = '';
        for ( let i = 0; i < data.length; i ++ ){
            if (data[i].vp === slotUsuario) {
                gastos = data[i].vpName;
            }
        }
  console.log(gastos);
  return gastos;
}

module.exports.findplanjd19 = async function findplanjd19(slotUsuario) {
    let data = await getVP();
    let gastos = '';
        for ( let i = 0; i < data.length; i ++ ){
            if (data[i].vp === slotUsuario) {
                gastos = data[i].planjd19;
            }
        }
  console.log(gastos);
  return gastos;
}

module.exports.findvarvsplan2019 = async function findvarvsplan2019(slotUsuario) {
    let data = await getVP();
    let gastos = '';
        for ( let i = 0; i < data.length; i ++ ){
            if (data[i].vp === slotUsuario) {
                gastos = data[i].varvsplan2019;
            }
        }
  console.log(gastos);
  return gastos;
}

module.exports.findgastosjd18 = async function findgastosjd18(slotUsuario) {
    let data = await getVP();
    let gastos = '';
        for ( let i = 0; i < data.length; i ++ ){
            if (data[i].vp === slotUsuario) {
                gastos = data[i].gastosjd18;
            }
        }
  console.log(gastos);
  return gastos;
}

module.exports.findvarvsplan2018 = async function findvarvsplan2018(slotUsuario) {
    let data = await getVP();
    let gastos = '';
        for ( let i = 0; i < data.length; i ++ ){
            if (data[i].vp === slotUsuario) {
                gastos = data[i].varvsplan2018;
            }
        }
  console.log(gastos);
  return gastos;
}

module.exports.findgastosjd14 = async function findgastosjd14(slotUsuario) {
    let data = await getVP();
    let gastos = '';
        for ( let i = 0; i < data.length; i ++ ){
            if (data[i].vp === slotUsuario) {
                gastos = data[i].gastosjd14;
            }
        }
  console.log(gastos);
  return gastos;
}

module.exports.findvarvsplan2014 = async function findvarvsplan2014(slotUsuario) {
    let data = await getVP();
    let gastos = '';
        for ( let i = 0; i < data.length; i ++ ){
            if (data[i].vp === slotUsuario) {
                gastos = data[i].varvsplan2014;
            }
        }
  console.log(gastos);
  return gastos;
}

async function getVP() {
  let url =
    "https://voice-stats-20.herokuapp.com/api/gastosVP";
  let settings = {
    method: 'GET'
  };
  let response = await fetch(url, settings);
  let data = await response.json();
  console.log(data);
  return data;
}