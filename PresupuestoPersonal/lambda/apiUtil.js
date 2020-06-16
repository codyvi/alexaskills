const fetch = require('node-fetch');

module.exports.findServiciosPresupuesto = async function findServiciosPresupuesto(slotUsuario) {
    let data = await getVP();
    let gastos = '';
        for ( let i = 0; i < data.length; i ++ ){
            if (data[i].name === slotUsuario) {
                gastos = data[i].ServiciosPresupuesto;
            }
        }
  console.log(gastos);
  return gastos;
}

module.exports.findGastadoAnterior = async function findGastadoAnterior(slotUsuario) {
    let data = await getVP();
    let gastos = '';
        for ( let i = 0; i < data.length; i ++ ){
            if (data[i].name === slotUsuario) {
                gastos = data[i].GastadoAñoAnterior;
            }
        }
  console.log(gastos);
  return gastos;
}

module.exports.findTotalOpex = async function findTotalOpex(slotUsuario) {
    let data = await getVP();
    let gastos = '';
        for ( let i = 0; i < data.length; i ++ ){
            if (data[i].name === slotUsuario) {
                gastos = data[i].TotalGastadoOpex;
            }
        }
  console.log(gastos);
  return gastos;
}

module.exports.findTotalPOpex = async function findTotalPOpex(slotUsuario) {
  let data = await getVP();
  let gastos = '';
      for ( let i = 0; i < data.length; i ++ ){
          if (data[i].name === slotUsuario) {
              gastos = data[i].TotalPlanificadoOpex;
          }
      }
console.log(gastos);
return gastos;
}

module.exports.findGastadoViajes = async function findGastadoViajes(slotUsuario) {
    let data = await getVP();
    let gastos = '';
        for ( let i = 0; i < data.length; i ++ ){
            if (data[i].name === slotUsuario) {
                gastos = data[i].GastosDeViajesGastado;
            }
        }
  console.log(gastos);
  return gastos;
  }





async function getVP() {
  let url =
    "https://finanzas-api-db.herokuapp.com/api/finanzas";
  let settings = {
    method: 'GET'
  };
  let response = await fetch(url, settings);
  let data = await response.json();
  console.log(data);
  return data;
}