/**
* Crea el objeto xmlhttp usado por ajax.
* @return El objeto xmlhttp
*/
function createXMLHTTP(){ 
	var xmlhttp = false;
	
	try{
		// Otros navegadores
		xmlhttp=new ActiveXObject("Msxml2.XMLHTTP");
	}catch(e){
		try{
			// Navegador Internet Explorer
			xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		}catch(E){
			xmlhttp = false;
		}
	}
	if (!xmlhttp && typeof XMLHttpRequest!='undefined'){
		xmlhttp=new XMLHttpRequest();
	}
	return xmlhttp; 
}

/**
* Manda una peticion Ajax y almacena el resultado en un elemento concreto.
* @param url URL a la que hacer la petici&oacute;n as&iacute;ncrona
* @param contentElement Elemento del formulario para almacenar el contenido
* @param changeElementID Identificador del elemento en el que se
*        escribir&aacute; un mensaje de "cambiando contenido..." o un mensaje
*        en blanco cuando termine la carga
* @param changeMessage Mensaje a mostrar para indicar que se est&aacute;
*        cargando la informaci&oacute;n
* @param noExistsMessage Mensaje a mostrar cuando la url invocada no existe
* @param errorMessage Mensaje a mostrar cuando hay alg&uacute;n error
* @param functionOnLoad Funcion a ejecutar al recibirse la respuesta ajax
* @param functionCheckAfterLoad Funcion para comprobar errores tras la carga
		 del contenido XML (en ese caso se advierte al usuario)
*/
function send(url, changeElementID, changeMessage, noExistsMessage, 
		errorMessage, functionOnLoad, functionAfterLoad){
	var xmlhttp = createXMLHTTP();
	var contenedor = document.getElementById(changeElementID);
	if (contenedor != null){
		contenedor.innerHTML=changeMessage;
	}
	xmlhttp.open("POST", url, true);
	xmlhttp.onreadystatechange=function(){ 
		if (xmlhttp.readyState==4){
			var contenedor = document.getElementById(changeElementID);
			var response9 = xmlhttp.responseText;
			if(xmlhttp.status==0 || xmlhttp.status==200){//Todo OK
                var response = xmlhttp.responseText;
				functionOnLoad(response);
				if (contenedor != null){
					contenedor.innerHTML = "&nbsp;";
				}
				functionAfterLoad();
            }else if(xmlhttp.status==404){//La pagina no existe
                if (contenedor != null){
					contenedor.innerHTML = noExistsMessage;
				}
            }else{
                if (contenedor != null){
					contenedor.innerHTML = errorMessage + xmlhttp.status;
				}
            }
		} 
	}
	xmlhttp.send(null);
}
