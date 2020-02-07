const fetch = require('node-fetch');



async function getVP() {
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