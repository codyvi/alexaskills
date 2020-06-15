const fetch = require('node-fetch');

module.exports.findgastosjd19 = async function findServiciosPresupuesto(slotUsuario) {
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