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

  module.exports.findGastadoServicios = async function findGastadoServicios(slotUsuario) {
    let data = await getVP();
    let gastos = '';
        for ( let i = 0; i < data.length; i ++ ){
            if (data[i].name === slotUsuario) {
                gastos = data[i].ServiciosGastado;
            }
        }
  console.log(gastos);
  return gastos;
  }


  module.exports.findGastadoConsultoria = async function findGastadoConsultoria(slotUsuario) {
    let data = await getVP();
    let gastos = '';
        for ( let i = 0; i < data.length; i ++ ){
            if (data[i].name === slotUsuario) {
                gastos = data[i].ConsultoríaGastado;
            }
        }
  console.log(gastos);
  return gastos;
  }

  module.exports.findGastadoSExternos = async function findGastadoSExternos(slotUsuario) {
    let data = await getVP();
    let gastos = '';
        for ( let i = 0; i < data.length; i ++ ){
            if (data[i].name === slotUsuario) {
                gastos = data[i].ServiciosExternosGastado;
            }
        }
  console.log(gastos);
  return gastos;
  }

  module.exports.findGastadoOp = async function findGastadoOp(slotUsuario) {
    let data = await getVP();
    let gastos = '';
        for ( let i = 0; i < data.length; i ++ ){
            if (data[i].name === slotUsuario) {
                gastos = data[i].GastosOperativosGastado;
            }
        }
  console.log(gastos);
  return gastos;
  } 

  module.exports.findGastadoSerPu = async function findGastadoSerPu(slotUsuario) {
    let data = await getVP();
    let gastos = '';
        for ( let i = 0; i < data.length; i ++ ){
            if (data[i].name === slotUsuario) {
                gastos = data[i].ServiciosPúblicosGastado;
            }
        }
  console.log(gastos);
  return gastos;
  } 

  module.exports.findGastadoSuelySal = async function findGastadoSuelySal(slotUsuario) {
    let data = await getVP();
    let gastos = '';
        for ( let i = 0; i < data.length; i ++ ){
            if (data[i].name === slotUsuario) {
                gastos = data[i].SueldosYSalariosGastado;
            }
        }
  console.log(gastos);
  return gastos;
  } 

  
  module.exports.findPresupuestoTotal = async function findPresupuestoTotal(slotUsuario) {
    let data = await getVP();
    let gastos = '';
        for ( let i = 0; i < data.length; i ++ ){
            if (data[i].name === slotUsuario) {
                gastos = data[i].TotalPresupuestoOpex;
            }
        }
  console.log(gastos);
  return gastos;
  } 

  module.exports.findGastadoProyecto = async function findGastadoProyecto(slotUsuario) {
    let data = await getVP();
    let gastos = '';
        for ( let i = 0; i < data.length; i ++ ){
            if (data[i].name === slotUsuario) {
                gastos = data[i].TotalGastadoProyecto;
            }
        }
  console.log(gastos);
  return gastos;
  } 

  module.exports.findPlanProyecto = async function findPlanProyecto(slotUsuario) {
    let data = await getVP();
    let gastos = '';
        for ( let i = 0; i < data.length; i ++ ){
            if (data[i].name === slotUsuario) {
                gastos = data[i].TotalPlanificadoProyecto;
            }
        }
  console.log(gastos);
  return gastos;
  } 

  module.exports.findPresupuestoProy = async function findPresupuestoProy(slotUsuario) {
    let data = await getVP();
    let gastos = '';
        for ( let i = 0; i < data.length; i ++ ){
            if (data[i].name === slotUsuario) {
                gastos = data[i].TotalPresupuestoProyecto;
            }
        }
  console.log(gastos);
  return gastos;
  } 

  module.exports.findCompAFech = async function findCompAFech(slotUsuario) {
    let data = await getVP();
    let gastos = '';
        for ( let i = 0; i < data.length; i ++ ){
            if (data[i].name === slotUsuario) {
                gastos = data[i].ComprometidoALaFecha;
            }
        }
  console.log(gastos);
  return gastos;
  } 

  module.exports.findConsuProyecto = async function findConsuProyecto(slotUsuario) {
    let data = await getVP();
    let gastos = '';
        for ( let i = 0; i < data.length; i ++ ){
            if (data[i].name === slotUsuario) {
                gastos = data[i].ConsultoríaGastadoProyecto;
            }
        }
  console.log(gastos);
  return gastos;
  } 

  module.exports.findSueldosYSalariosProyecto = async function findSueldosYSalariosProyecto(slotUsuario) {
    let data = await getVP();
    let gastos = '';
        for ( let i = 0; i < data.length; i ++ ){
            if (data[i].name === slotUsuario) {
                gastos = data[i].SueldosYSalariosGastadoProyecto;
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