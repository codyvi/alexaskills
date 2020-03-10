const fetch = require('node-fetch');

module.exports.findnivel = async function findnivel(slotUsuario) {
    let data = await getVP();
    let Pnivel = '';
        for ( let i = 0; i < data.length; i ++ ){
            if (data[i].nombre === slotUsuario) {
                Pnivel = data[i].nivel;
            }
        }
  console.log(Pnivel);
  return Pnivel;
}

module.exports.UpdateHora = async function UpdateHora(slotUsuario, hora){
  var id  = slotUsuario;
		var tIni = hora;

		let url2 = 'https://ejercicio-api.herokuapp.com/api/EjerecioAn'
		let settings2 = {
			method: 'POST',
			body: JSON.stringify({
				id: id,
				tiempoInicio: parseInt(tIni)
			}),
			headers: {
				'Content-Type': 'application/json'
			},
		}

		fetch(url2, settings2)
		.then( response => {
			if ( response.ok ){
				return response.json();
			}

			throw new Error ( response.statusText );
		})
		.then( responseJSON => {

			console.log(responseJSON);
		})
		.catch( err => {
			console.log( err );
		})
}

module.exports.UpdateHoraFinal = async function UpdateHoraFinal(slotUsuario, horaFinal){
	var id  = slotUsuario;
	var tFin = horaFinal;

	let url2 = 'https://ejercicio-api.herokuapp.com/api/EjercicioAn2'
	let settings2 = {
		method: 'POST',
		body: JSON.stringify({
			id: id,
			tiempoFinal: parseInt(tFin)
		}),
		headers: {
			'Content-Type': 'application/json'
		},
	}

	fetch(url2, settings2)
	.then( response => {
		if ( response.ok ){
			return response.json();
		}

		throw new Error ( response.statusText );
	})
	.then( responseJSON => {

		console.log(responseJSON);
	})
	.catch( err => {
		console.log( err );
	})
}

module.exports.UpdateNivel = async function UpdateNivel(slotUsuario, nivel){
		var id  = slotUsuario;
		var nIvel = nivel;

		let url2 = '/api/EjercicioAn3'
		let settings2 = {
			method: 'POST',
			body: JSON.stringify({
				id: id,
				nivel: parseInt(nIvel)
			}),
			headers: {
				'Content-Type': 'application/json'
			},
		}

		fetch(url2, settings2)
		.then( response => {
			if ( response.ok ){
				return response.json();
			}

			throw new Error ( response.statusText );
		})
		.then( responseJSON => {

			console.log(responseJSON);
		})
		.catch( err => {
			console.log( err );
		})
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