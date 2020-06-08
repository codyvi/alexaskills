const fetch = require('node-fetch');

module.exports.findHorario = async function findHorario(slotUsuario) {
  let data = await getPlace();
  let horario = '';
      for ( let i = 0; i < data.length; i ++ ){
          if (data[i].vp === slotUsuario) {
              horario = data[i].horario;
          }
      }
console.log(horario);
return horario;
}



async function getPlace() {
  let url =
    "https://horarios-api-db.herokuapp.com/api/horario";
  let settings = {
    method: 'GET'
  };
  let response = await fetch(url, settings);
  let data = await response.json();
  console.log(data);
  return data;
}