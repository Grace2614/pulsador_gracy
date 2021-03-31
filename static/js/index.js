//https://www.eclipse.org/paho/clients/js/

// Create a client instance
  //client = new Paho.MQTT.Client("postman.cloudmqtt.com", 14970);
  
  client = new Paho.MQTT.Client("maqiatto.com", 8883, "web_" + parseInt(Math.random() * 100, 10));

  // set callback handlers
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;
  var options = {
   useSSL: false,
    userName: "grace.bonilla@unach.edu.ec",
    password: "Nataly16",
    onSuccess:onConnect,
    onFailure:doFail
  }

  // connect the client
  client.connect(options);
   
  // called when the client connects
  function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("Conectado...");
	
    client.subscribe("grace.bonilla@unach.edu.ec/pulsador");
    message = new Paho.MQTT.Message("Datos del sensor");
    message.destinationName = "grace.bonilla@unach.edu.ec/pulsador";
    client.send(message);
	
  }

  function doFail(e){
    console.log(e);
	
  }

  // called when the client loses its connection
  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:"+responseObject.errorMessage);
    }
  }

  // called when a message arrives
  function onMessageArrived(message) {
    console.log("onMessageArrived:"+message.payloadString);
	  document.getElementById("sensor").innerHTML=message.payloadString;
	  
	  
  }

var i;
var pulsador;
while (i<=10){
	i++;
	pulsador = open('static/datos.txt','a')
	pulsador.write(str(i))
	pulsador.write(',')
	pulsador.write(str(sensor))
	pulsador.write('\n')
	pulsador.close()
}

function control(){	
	f=open('pulsador.txt','r')
 	lineas=f.readline()
	f.close()
	document.write(lineas);
	document.write("<br>");
	}

	//setTimeout(control,3000);
		//UpdateElement(message.payloadString) 

	//console.log(message.payloadString);




