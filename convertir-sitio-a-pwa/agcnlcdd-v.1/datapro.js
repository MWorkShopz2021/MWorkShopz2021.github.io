// Carrito IVA usando seudo-codigo (es escribir el paso a paso de lo que va a ser el programa
//darle bienvenida al usuario "Bienvenido al calculador de iva"
//creamos contenedor de precios vacio
var precios=[];

//creamos objeto para guardar el precio de los iva
const preciosIva = {
	Argentina:18,
	Canada:15,
	España:20,
	Uruguay:25	
};

//preguntar al usuario cual es su pais, guardo el pais en una variable
var paisUsuario, valorDelIva, valor, suma, total;
function getCountry() {
  	paisUsuario=document.getElementById("sel1").value;
	return paisUsuario;
}
//accedo al valor del iva del usurio
function getIvaCountry() {
	valorDelIva=0;
	getCountry();
	for (var x in preciosIva) {
		if (x==paisUsuario){
			valorDelIva=preciosIva[x];
		}
	}
	return valorDelIva;
}

//preguntar al usuario si quiere agregar un precio al contenedor
valor=0;
function getPrecio() {
	valor=Number(document.getElementById("text1").value);
	return valor;
}
//preguntar al usuario si quiere agregar otro precio
function getOtroPrecio() {
	valor=Number(document.getElementById("text2").value);
	return valor;
}
//si no quiere le muestro el total con y sin iva
function getAction() {
	getIvaCountry();
	suma=0;
	for(var y in precios){
		suma+=precios[y];
	}
	total=valorDelIva+suma;
	document.getElementById("demo4").innerHTML="Su total sin iva es: "+suma;
	document.getElementById("demo5").innerHTML="Su total con iva es: "+total;
}

function getAge() {
  var age, voteable;
  age = Number(document.getElementById("age").value);
  if (isNaN(age)) {
    voteable = "Input is not a number";
  } else {
    voteable = (age < 18) ? "Too young" : "Old enough";
  }
  document.getElementById("demo").innerHTML = voteable;
  changeImage();
}
function putCountry() {
	getCountry();
	getIvaCountry();
	document.getElementById("demo1").innerHTML = "Haz seleccionado: " + paisUsuario + " y su IVA es: "+ valorDelIva;
	document.getElementById("bloque1").style.display="";
}  
//si quiere agregarlo se lo sumo al contenedor de precio
function putPrecio(){
	var numero=getPrecio();
	precios.push(numero);
	var tipo=typeof(numero);
	document.getElementById("demo2").innerHTML = "Haz agregado: $" + numero + " pesos al carrito de precios";
	document.getElementById("bloque2").style.display="";
}
function putOtroPrecio(){
	var numero=getOtroPrecio();
	precios.push(numero);
	var tipo=typeof(numero);
	document.getElementById("demo3").innerHTML = "Haz agregado: $" + numero + " pesos al carrito de precios";
	getAction();
}
function changeImage(){
	document.getElementById("image").src = "2.jpg";
}