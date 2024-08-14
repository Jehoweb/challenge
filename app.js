/*  La "a" remplazada por "ai"; La "e" remplazada por "enter"; La "i" remplazada por "imes"; La "o" remplazada por "ober"; La "u" remplazada por "ufat"  */
const llaves = [["e","enter"], ["i","imes"], ["a","ai"], ["o","ober"], ["u","ufat"]];
const textAreaEntrada = document.querySelector(".texto__entrada");
const textAreaSalida = document.querySelector(".texto__salida");
const botonCopiar = document.querySelector(".boton__trasladar");
const mensajeVacio = document.querySelector(".infoayuda");

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
        
        botonCopiar.style.visibility = "hidden";
        textAreaSalida.style.backgroundImage = "url(/img/inspector.png)";
        mensajeVacio.style.visibility = "visible";
        textAreaSalida.value="";
    }

}

function extraer(){
    let cadenaEvolucion = textAreaEntrada.value;
    cadenaEvolucion = cadenaEvolucion.toLowerCase();
    return cadenaEvolucion;
}

function proyectarResultados(texto){
    textAreaSalida.value=texto;
    textAreaEntrada.value="";
    textAreaSalida.style.backgroundImage = "none";
    botonCopiar.style.visibility = "visible";
    mensajeVacio.style.visibility = "hidden";
}

function copiar(){
    textAreaSalida.select();
    resguardoEnMemoriaTemporal(); 
}

async function resguardoEnMemoriaTemporal() {
    try {
      await navigator.clipboard.writeText(textAreaSalida.value);
      console.log('Contenido copiado al portapapeles');     
    } catch (err) {
      console.error('Error al copiar: ', err);      
    }
}


