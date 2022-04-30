let historicoInflacion = [
  { "mes": "Marzo 2021", "inflacion": 4.8 },
  { "mes": "Abril 2021", "inflacion": 4.1 },
  { "mes": "Mayo 2021	", "inflacion": 3.3 },
  { "mes": "Junio 2021", "inflacion": 3.2 },
  { "mes": "Julio 2021", "inflacion": 3.0 },
  { "mes": "Agosto 2021	", "inflacion": 2.5 },
  { "mes": "Septiembre 2021	", "inflacion": 3.6 },
  { "mes": "Octubre 2021	", "inflacion": 3.5 },
  { "mes": "Noviembre 2021", "inflacion": 2.5 },
  { "mes": "Diciembre 2021", "inflacion": 3.8 },
  { "mes": "Enero 2022", "inflacion": 3.9 },
  { "mes": "Febrero 2022", "inflacion": 4.7 },
  { "mes": "Marzo 2022", "inflacion": 6.7 }
]

let objeto = {
  nombre:"",
  precioContado:"",
  precioCuotas:""
}

let financiacion = {
  inflacionMensualPromedio:"",
  cantidadMeses:""
}

objeto.nombre = prompt("Cual es el nombre del objeto?")
objeto.precioContado = prompt("Cual es el precio al contado?")
objeto.precioCuotas = prompt("Cual es el precio en cuotas?")

financiacion.inflacionMensualPromedio = prompt("Cual es la inflacion mensual estimada?")
financiacion.cantidadMeses = prompt("En cuantas cuotas? - Ingresar numeros solamente")

//variable para almacenar el valor total a pagar ajustado por inflacion luego de las cuotas
let contadorTotalCuotas = 0;

//variable temporal a usar en el for para almacenar el valor de la ultima cuota
let contadorTemporal = objeto.precioCuotas/financiacion.cantidadMeses;

var info = document.getElementById('info');

if (objeto.precioContado != null) {
  var entry = document.createElement('p');
  entry.appendChild(document.createTextNode("El precio al contado es: " + objeto.precioContado));
  info.appendChild(entry);       
}

if (objeto.precioCuotas != null) {
  var entry = document.createElement('p');
  entry.appendChild(document.createTextNode("El precio en cuotas es: " + objeto.precioCuotas));
  info.appendChild(entry);       
}

if (financiacion.inflacionMensualPromedio != null) {
  var entry = document.createElement('p');
  entry.appendChild(document.createTextNode("La inflacion mensual es: " + financiacion.inflacionMensualPromedio));
  info.appendChild(entry);       
}

if (financiacion.cantidadMeses != null) {
  var entry = document.createElement('p');
  entry.appendChild(document.createTextNode("La cantidad de cuotas es: " + financiacion.cantidadMeses));
  info.appendChild(entry);       
}

let btn = document.createElement("button");
btn.setAttribute("onclick","verInfo()");
btn.innerHTML = "Ver más informacion";
document.body.appendChild(btn);


function verInfo(){
  
  // Muestra la informacion mes a mes

  for(let i= 0; i< financiacion.cantidadMeses; i++){
  
    //muestro en consola el numero de cuotas
    //console.log("Cuota numero : " + (i+1))
    
    //tomo la cuota actual, le resto el porcentaje de inflacion mensual
    let cuotaAjustadaInflacion = contadorTemporal - (contadorTemporal * (financiacion.inflacionMensualPromedio/100));
    //muestro en consola el monto de esa cuota restado el monto por inflacion
    //console.log("Monto de la cuota ajustada a inflacion: " + cuotaAjustadaInflacion)
    
    
    var entry = document.createElement('p');
    entry.appendChild(document.createTextNode("Cuota numero : " + (i+1)));
    info.appendChild(entry);  


    var entry2 = document.createElement('p');
    entry2.appendChild(document.createTextNode("Monto de la cuota ajustada a inflacion: " + cuotaAjustadaInflacion));
    info.appendChild(entry2);  

    
    var entry3 = document.createElement('hr');
    info.appendChild(entry3);  



    //sumo al almacen la cuota actual ya calculada
    contadorTotalCuotas += cuotaAjustadaInflacion;
    
    //reseteo el contador temporal con la cuota actual
    contadorTemporal = cuotaAjustadaInflacion;
    
  }

  // Muestra una tabla de inflacion ultimos 12 meses


    var col = [];
    for (var i = 0; i < historicoInflacion.length; i++) {
        for (var key in historicoInflacion[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    var table = document.createElement("table");

    var tr = table.insertRow(-1);                   // TABLE ROW.

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");      // TABLE HEADER.
        th.innerHTML = col[i];
        tr.appendChild(th);
    }


    for (var i = 0; i < historicoInflacion.length; i++) {

      tr = table.insertRow(-1);

      for (var j = 0; j < col.length; j++) {
          var tabCell = tr.insertCell(-1);
          tabCell.innerHTML = historicoInflacion[i][col[j]];
      }
    }


    var divContainer = document.getElementById("showData");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);

      btn.style.visibility="hidden";
}

