const fetch = require('node-fetch');

module.exports.findnivel = async function findnivel(slotUsuario) {
    let data = await getVP();
    let Pnivel = '';
        for ( let i = 0; i < data.length; i ++ ){
            if (data[i].vp === slotUsuario) {
                Pnivel = data[i].nivel;
            }
        }
  console.log(Pnivel);
  return Pnivel;
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