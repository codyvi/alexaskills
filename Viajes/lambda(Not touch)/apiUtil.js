const fetch = require('node-fetch');

module.exports.findVP = async function findVP(slotUsuario) {
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