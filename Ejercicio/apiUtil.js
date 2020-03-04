const fetch = require('node-fetch');

module.exports.findnivel = async function findnivel(slotUsuario) {
    let data = await getVP();
    let nivel = '';
        for ( let i = 0; i < data.length; i ++ ){
            if (data[i].vp === slotUsuario) {
                nivel = data[i].nivel;
            }
        }
  console.log(nivel);
  return nivel;
}


async function getVP() {
  let url =
    "https://ejercicio-api.herokuapp.com/api/ejercicio";
  let settings = {
    method: 'GET'
  };
  let response = await fetch(url, settings);
  let data = await response.json();
  console.log(data);
  return data;
}