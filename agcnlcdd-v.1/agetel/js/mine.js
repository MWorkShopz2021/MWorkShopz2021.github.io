// For localstorage

// Constructor function for Customer objects
function Customer(id, telefono, nombre, importe, pagado, cobrar) {
	this.id = id;
	this.phoneNumber = telefono;
	this.firstName = nombre;
	this.cashPay = importe;
	this.payDone = pagado;
	this.thePay = cobrar;
}

var clientes;

// Create a Customer object
function CreaUnCliente() {
	var telefono = 'telefono';
	var nombres = 'cliente';
	var importe = 'importe';
	var pagado = 'checked';
	var elcliente = new Customer(0, telefono, nombres, importe, pagado, 0);
	clientes = [];
	clientes.push(elcliente);
}

function GetLosClientes() {
	if (typeof (Storage) !== "undefined") {
		clientes = JSON.parse(localStorage.getItem("clientes"));
		if (clientes == null) {
			CreaUnCliente();
			//document.getElementById("forTest").innerHTML = "FROM FirstTime: " + JSON.stringify(clientes);
		} else {
		//document.getElementById("forTest").innerHTML = "FROM localStorage: " + JSON.stringify(clientes);
		}
	} else {
		CreaUnCliente();
		alert("Nota importante: Como este equipo no permite algunas caracteristicas necesarias, todos los usuarios y sus datos seran borrados si Ud. cierra esta aplicacion. Probablemente si actualiza a nueva version de Android ...");
		//document.getElementById("forTest").innerHTML = "ALWAYS FROM default: " + JSON.stringify(clientes);
	}
	fillTable();
	return clientes;
}

function SaveLosClientes() {
	if (typeof (Storage) !== "undefined") {
		localStorage.setItem("clientes", JSON.stringify(clientes));
	} else {
		alert("Nota importante: Como este equipo no permite algunas caracteristicas necesarias, todos los usuarios y sus datos seran borrados si Ud. cierra esta aplicacion. Probablemente si actualiza a nueva version de Android ...");
	}
}

function openAdd() {
  document.getElementById('addmodal').style.display = "block";
}

function closeAdd() {
  document.getElementById('addmodal').style.display = "none";
}

function aceptAdd() {
	agregarCliente();
	closeAdd();
	GetLosClientes();
}

function openMenu() {
	document.getElementById("mySidebar").style.display = "block";
}

function closeMenu() {
	document.getElementById("mySidebar").style.display = "none";	
}

function openImport() {
	document.getElementById("importmodal").style.display = "block";
	closeMenu();
}

function closeImport() {
	document.getElementById("importmodal").style.display = "none";	
}

function openSeleccionar() {
	document.getElementById("seleccionarmodal").style.display = "block";
	closeMenu();
	document.getElementById("mainTable").style.display = "none";
}

function closeSeleccionar() {
	document.getElementById("seleccionarmodal").style.display = "none";
	document.getElementById("mainTable").style.display = "block";
}

function agregarCliente() {
	var telefono = document.getElementById('eltelefono').value;
	var nombres = document.getElementById('elcliente').value;
	var importe = 23;
	var pagado = "checked";
	var callid = document.getElementById('elcallid').value;
	var elcliente = new Customer(0, telefono, nombres, importe, pagado, callid);
	if (nombres != "" && telefono != "" && callid != "") {
		clientes.push(elcliente);
		//continuarAgregar();
	}
	SaveLosClientes();
}
/*function validar(){
	var todoOK = confirm("¿Quiere ir a la tabla?");
	if(!todoOK){
		continuarAgregar();
	}
	return todoOK;
}
function continuarAgregar(){
	var decide = confirm("¿Quiere seguir agregando otro cliente?");
	if (decide){
		alert("has aceptado seguir");
		limpiarAgregar();
		agregarCliente();
	}
}
function limpiarAgregar(){
	telefono.value = "";
	nombres.value = "";
	callid.value = "";
}*/
// Leer fichero JSON y pasar a var clientes

dbfile.onchange = () => {
	var f = dbfile.files[0];
	var reader = new FileReader();
	reader.onload = function () {
		var text = reader.result;
		clientes = JSON.parse(text);
		SaveLosClientes();
	};
	reader.readAsText(f);
};

function ExportarClientes() {
	var blob = new Blob([JSON.stringify(clientes)], {
		type: "text/plain;charset=utf-8"
	});
	saveAs(blob, "clientes.json");
}

// Fill tabla
/*var contador = document.getElementById("contador");
var telefono = document.getElementById("telefono");
var cobrar = document.getElementById("cobrar");
var cliente = document.getElementById("cliente");
var pagado = document.getElementById("pagado");
var callid = document.getElementById("callid");

alert("lo que trae la variable clientes es " + clientes);
if (clientes == undefined){
	alert("clientes es true undefined");
}
if (clientes == null){
	alert("clientes es true null");
}
if (clientes == ""){
	alert("la variable cliente es true vacia");
}*/

function fillTable() {
	// Numeros de clientes que hay
	var cantidadClientes = clientes.length;
	//alert("cantidad de clientes " + cantidadClientes);
	document.getElementById("total").innerHTML = cantidadClientes;
	// Returns all object's properties as an array
	var cantidadPropiedadClientes = Object.getOwnPropertyNames(clientes[0]);
	var contadorClientes = cantidadPropiedadClientes.length;

	for (var i=0; i<cantidadClientes; i++){
		// Crear nodo de tipo Element
		var tr0 = document.createElement("tr");
		// Añadir el nodo Element como hijo de la pagina
		document.getElementById("id01").appendChild(tr0);
		for (var j=0; j<contadorClientes; j++){
			// si el que se está dibujando es el primero
			switch (j) {
				case 0:
					var td0 = document.createElement("td");
					var contenidoTd0 = document.createTextNode(parseInt(i+1));
					td0.appendChild(contenidoTd0);
					tr0.appendChild(td0);
				break;
				case 1:
					var td1 = document.createElement("td");
					var contenidoTd1 = document.createTextNode(clientes[i].phoneNumber);
					td1.appendChild(contenidoTd1);
					tr0.appendChild(td1);
				break;
				case 2:
					// Crear nodo de tipo Element
					var td2 = document.createElement("td");
					// Crear nodo de tipo input Element
					var input2 = document.createElement("input");
					// Añadir atributos with value al nodo de tipo input Element
					input2.setAttribute("type", "text");
					input2.setAttribute("class", "w3-input inputabla fecha");
					input2.setAttribute("style", "width:90%");
					input2.setAttribute("value", clientes[i].cashPay);
					// Añadir el nodo input como hijo de su nodo td element padre
					td2.appendChild(input2);
					// Añadir el nodo td Element como hijo de su nodo tr element padre
					tr0.appendChild(td2);
				break;
				case 3:
					var td3 = document.createElement("td");
					var contenidoTd3 = document.createTextNode(clientes[i].firstName);
					td3.appendChild(contenidoTd3);
					tr0.appendChild(td3);
				break;
				case 4:
					// Crear nodo de tipo Element
					var td4 = document.createElement("td");
					// Crear nodo de tipo input Element
					var input4 = document.createElement("input");
					// Añadir atributos with value al nodo de tipo input Element
					input4.setAttribute("type", "checkbox");
					input4.setAttribute("class", "w3-check");
					input4.setAttribute(clientes[i].payDone, "");
					//var attrcheck4 = document.createAttribute(clientes[i].payDone);
					//input4.appendChild(attrcheck4);
					// Añadir el nodo input Element como hijo de su nodo td element padre
					td4.appendChild(input4);
					// Añadir el nodo td Element como hijo de su nodo tr element padre
					tr0.appendChild(td4);
				break;
				case 5:
					// Crear nodo de tipo td Element
					var td5 = document.createElement("td");
					// Crear nodo de tipo input Element
					var input5 = document.createElement("input");
					// Añadir atributos with value al nodo de tipo input Element
					input5.setAttribute("type", "text");
					input5.setAttribute("class", "w3-input inputabla fecha");
					input5.setAttribute("style", "width:90%");
					input5.setAttribute("value", clientes[i].thePay);
					// Añadir el nodo input Element como hijo de su nodo td element padre
					td5.appendChild(input5);
					// Añadir el nodo td Element como hijo de su nodo tr element padre
					tr0.appendChild(td5);
				break;
				default:
					alert("Desconocido");
			}
		}
	}
}
