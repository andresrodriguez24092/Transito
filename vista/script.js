var mySocket = new WebSocket("ws://localhost:8080");
function setup()
 {
    // Socket events
    mySocket.onopen = mySocketOpen;
    mySocket.onmessage = mySocketShowData;

    // Callbacks
    function mySocketOpen()
    {
         
    }

    

}

function mySocketShowData(result){
  alert(result.data);
}

function getRegUsuario(){
     // Selecting the input element and get its value 
     var datosRegUsuario =[];
     //el primer valor del vector es una clave que indica la procedencia de los datos
     datosRegUsuario.push("regUsuario");
     var radios = document.getElementsByName('tipoUsuario');
     for (var i = 0, length = radios.length; i < length; i++) {
          if (radios[i].checked) {
            // do whatever you want with the checked radio
            //alert(radios[i].value);
            datosRegUsuario.push(radios[i].value) //agrega el valor del radiobutton
        
            // only one radio can be logically checked, don't check the rest
            break;
          }
        }
        //agrega los demas campos
     datosRegUsuario.push(document.getElementById("nombre").value);
     datosRegUsuario.push(document.getElementById("ident").value);
     datosRegUsuario.push(document.getElementById("dir").value+",,");
     //datosRegUsuario.push(",");
     // Displaying the value
     //alert(datosRegUsuario[0]);
     // Se construye un Objeto msg que contiene la información que el servidor necesita procesar de ese cliente.
     mySocket.send(datosRegUsuario);
 }

  function getRegVehiculo(){

    var datosRegVehiculo =[];
     //el primer valor del vector es una clave que indica la procedencia de los datos
     datosRegVehiculo.push("regVehiculo");
     datosRegVehiculo.push(document.getElementById("placa").value);
     datosRegVehiculo.push(document.getElementById("idVehiculo").value);
     datosRegVehiculo.push(document.getElementById("marca").value);
     var radios2 = document.getElementsByName('tipoVehiculo');
     for (var i = 0, length = radios2.length; i < length; i++) {
          if (radios2[i].checked) {
            // do whatever you want with the checked radio
            //alert(radios[i].value);
            datosRegVehiculo.push(radios2[i].value) //agrega el valor del radiobutton
        
            // only one radio can be logically checked, don't check the rest
            break;
          }
        }
        datosRegVehiculo.push(document.getElementById("fecha1").value+",");
     
     mySocket.send(datosRegVehiculo);

  }

  function getRegInfraccion(){
    var datosRegInfraccion =[];
     //el primer valor del vector es una clave que indica la procedencia de los datos
     datosRegInfraccion.push("regInfraccion");
     datosRegInfraccion.push(document.getElementById("placaInfraccion").value);
     var radios3 = document.getElementsByName('tipoInfraccion');
     for (var i = 0, length = radios3.length; i < length; i++) {
          if (radios3[i].checked) {
            // do whatever you want with the checked radio
            //alert(radios[i].value);
            datosRegInfraccion.push(radios3[i].value) //agrega el valor del radiobutton
        
            // only one radio can be logically checked, don't check the rest
            break;
          }
        }
        datosRegInfraccion.push(document.getElementById("fecha2").value+",,,");
        mySocket.send(datosRegInfraccion);
  }
  
  function getConsultar(){
    var datosRegConsultar =[];
    datosRegConsultar.push("getConsultar");
    datosRegConsultar.push(document.getElementById("idConsulta").value+",,,,,");
    mySocket.send(datosRegConsultar);
  }

  function getConsultar2(){
    var datosRegConsultar =[];
    datosRegConsultar.push("getConsultar2");
    datosRegConsultar.push(document.getElementById("idConsulta2").value+",,,,,");
    mySocket.send(datosRegConsultar);
  }

  function getConsultar3(){
    var datosRegConsultar =[];
    datosRegConsultar.push("getConsultar3");
    datosRegConsultar.push(document.getElementById("idConsulta3").value+",,,,,");
    mySocket.send(datosRegConsultar);
  }

  function getActUsuario(){
    // Selecting the input element and get its value 
    var datosActUsuario =[];
    //el primer valor del vector es una clave que indica la procedencia de los datos
    datosActUsuario.push("actUsuario");
    var radios = document.getElementsByName('tipoUsuarioAct');
    for (var i = 0, length = radios.length; i < length; i++) {
         if (radios[i].checked) {
           // do whatever you want with the checked radio
           //alert(radios[i].value);
           datosActUsuario.push(radios[i].value) //agrega el valor del radiobutton
       
           // only one radio can be logically checked, don't check the rest
           break;
         }
       }
       //agrega los demas campos
       datosActUsuario.push(document.getElementById("nombreAct").value);
       datosActUsuario.push(document.getElementById("identAct").value);
       datosActUsuario.push(document.getElementById("dirAct").value+",,");
    //datosRegUsuario.push(",");
    // Displaying the value
    //alert(datosRegUsuario[0]);
    // Se construye un Objeto msg que contiene la información que el servidor necesita procesar de ese cliente.
    mySocket.send(datosActUsuario);
}

function getActVehiculo(){

  var datosActVehiculo =[];
   //el primer valor del vector es una clave que indica la procedencia de los datos
   datosActVehiculo.push("actVehiculo");
   datosActVehiculo.push(document.getElementById("placaAct").value);
   datosActVehiculo.push(document.getElementById("idVehiculoAct").value);
   datosActVehiculo.push(document.getElementById("marcaAct").value);
   var radios2 = document.getElementsByName('tipoVehiculoAct');
   for (var i = 0, length = radios2.length; i < length; i++) {
        if (radios2[i].checked) {
          // do whatever you want with the checked radio
          //alert(radios[i].value);
          datosActVehiculo.push(radios2[i].value) //agrega el valor del radiobutton
      
          // only one radio can be logically checked, don't check the rest
          break;
        }
      }
      datosActVehiculo.push(document.getElementById("fecha3").value+",");
   
   mySocket.send(datosActVehiculo);

}

 function getActInfraccion(){
   var datosActInfraccion =[];
    datosActInfraccion.push("actInfraccion");
    datosActInfraccion.push(document.getElementById("placaInfraccionAct").value);
    var radios3 = document.getElementsByName('tipoInfraccionAct');
    for (var i = 0, length = radios3.length; i < length; i++) {
         if (radios3[i].checked) {
           // do whatever you want with the checked radio
           //alert(radios[i].value);
           datosActInfraccion.push(radios3[i].value) //agrega el valor del radiobutton
       
           // only one radio can be logically checked, don't check the rest
           break;
         }
       }
       datosActInfraccion.push(document.getElementById("fecha4").value+",,,");
       mySocket.send(datosActInfraccion);
 }

 function getBorrUsuario(){
  var datosBorrUsuario =[];
  datosBorrUsuario.push("borrUsuario");
  datosBorrUsuario.push(document.getElementById("usuarioBorrar").value+",,,,,");
  mySocket.send(datosBorrUsuario);
}

function getBorrVehiculo(){
  var datosBorrVehiculo =[];
  datosBorrVehiculo.push("borrVehiculo");
  datosBorrVehiculo.push(document.getElementById("vehiculoBorrar").value+",,,,,");
  mySocket.send(datosBorrVehiculo);
}


function getBorrInfraccion(){
  var datosBorrInfraccion =[];
  datosBorrInfraccion.push("borrInfraccion");
  datosBorrInfraccion.push(document.getElementById("infraccionBorrar").value+",,,,,");
  mySocket.send(datosBorrInfraccion);
}