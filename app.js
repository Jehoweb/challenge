/*  La "a" remplazada por "ai"; La "e" remplazada por "enter"; La "i" remplazada por "imes"; La "o" remplazada por "ober"; La "u" remplazada por "ufat"  */
const llaves = [["e","enter"], ["i","imes"], ["a","ai"], ["o","ober"], ["u","ufat"]];
const textAreaEntrada = document.querySelector(".texto__entrada");
const textAreaSalida = document.querySelector(".texto__salida");
const botonCopiar = document.querySelector(".boton__trasladar");
const mensajeVacio = document.querySelector(".infoayuda");
const pregunta = document.querySelector(".acertijo");
const principal = document.querySelector("main");
const piepag = document.querySelector(".piepaginador");
var invisible = 0;

textAreaEntrada.addEventListener("input", e => {
    textAreaEntrada.style.height = '38px';
    textAreaEntrada.style.height = (textAreaEntrada.scrollHeight + 2) + 'px';
});

function verAreaDeTragajo(){

    if(invisible === 0){
        principal.style.visibility = "visible";
        piepag.style.visibility = "visible";
        mensajeVacio.style.visibility = "visible";
        invisible = 1;
    } else {
        principal.style.visibility = "hidden";
        piepag.style.visibility = "hidden";
        noHayInformacion();
        mensajeVacio.style.visibility = "hidden";
        
        invisible = 0;
    }
}

function cifrarDescifrar(numero, leyenda){
    let proceso = numero;
    let cadena = extraer();
    if(cadena.length > 0){
        let orientacion = (proceso==0 ? 1 : 0);
        for(let pos=0; pos < llaves.length; pos++){
            if(cadena.includes(llaves[pos][proceso])){
                cadena = cadena.replaceAll(llaves[pos][proceso],  llaves[pos][orientacion]);
            }
        }
        proyectarResultados(cadena);
        console.log(`la operacion es ${leyenda} `);
    } else if(cadena.length === 0){
        noHayInformacion();
    }
}

function extraer(){
    let cadenaEvolucion = textAreaEntrada.value;
    cadenaEvolucion = cadenaEvolucion.toLowerCase();
    return cadenaEvolucion;
}

function proyectarResultados(texto){
    pregunta.style.visibility = "visible";
    pregunta.style.color = colorAleatorio();
    textAreaSalida.value=  texto;
    textAreaEntrada.value="";
    textAreaEntrada.style.height = '54px';
    textAreaSalida.style.backgroundImage = "none";
    botonCopiar.style.visibility = "visible";
    mensajeVacio.style.visibility = "hidden";
}

function noHayInformacion(){
    pregunta.style.visibility = "hidden";
    botonCopiar.style.visibility = "hidden";
    textAreaSalida.style.backgroundImage = "url(/img/inspector.png)";
    mensajeVacio.style.visibility = "visible";
    textAreaSalida.value="";
}

function copiar(){
    textAreaSalida.select();
    resguardoEnMemoriaTemporal(); 
}

/*
   tecla 8 = borrar hacia atras   tecla 32 = espacio   tecla 13 = enter   tecla 45 = insert   tecla 46 = delete
   tecla del 48 al 57 = (0 al 9)   tecla 65 al 90 = (A hasta Z)   tecla 97 al 122 = (a hasta z) 
*/   
function filtroCaracter(letra) {
    let tecla = (document.getElementById("textoPreparado")) ? letra.keyCode : letra.which;
    if ( tecla == 8 || tecla == 32 || (tecla >= 97 && tecla <= 122)) {
        return true;
    } else return false;
}
    /* 
        let patron = /[A-Za-z0-9]/;  // letras y numeros  
                    /[A-Za-z]/;     // solo letras        
        let cadena = String.fromCharCode(tecla);
        return patron.test(cadena);   
    */

async function resguardoEnMemoriaTemporal() {
    try {
      await navigator.clipboard.writeText(textAreaSalida.value);
      console.log('Contenido copiado al portapapeles');     
    } catch (err) {
      console.error('Error al copiar: ', err);      
    }
}

function colorAleatorio() {
    let hexdec = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];
    let codcolor = "#";
    for(let k=1; k <= 6; k++ ){
        codcolor = codcolor + hexdec[ Math.floor(Math.random() * 16) ];
    }
    return codcolor;
}
