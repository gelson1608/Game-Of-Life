var turno=1;
/*El siguiente codigo generara nuestra tabla con las dimensiones que
determinemos de manera automatica*/
document.write("<table>");
for(var i = 0; i < 80; i++){
      document.write("<tr>");
      for(var j = 0; j < 60; j++){
              document.write("<td class='dead' id="+i+"_"+j+" nextState='default' onclick='seleccionarCelda(this);'></td>");
      }
      document.write("</tr>");
}
document.write("</table>");

/*La siguiente funcion nos permitira pintar las celdas para determinaran si
vivas o muertas para eso solo deberemos hacer click sobre ellas*/
var seleccionarCelda = function(target){
  console.log(target.id);
  if (target.className == '' || target.className== 'dead'){
    target.className = 'alive';
  }
  else if(target.className=='alive'){
    target.className='dead';
  }
};

/*La funcion reiniciar pondra todas las celdas en un estado de muerta para volver
a iniciar la simulacion en caso se desee*/
var reiniciar = function(){
  clearInterval(window.interv);
  turno=0
  for(var i=0; i<80; i++){
    for(var j=0; j<60; j++){
      var celda=document.getElementById(i+"_"+j);
      celda.className = 'dead';
    }
  }
}

/*Esta funcion dara inicio a la logica del juego; para eso se declaran 8 variables que
simularan las celdas que rodean a cada cuadrado en la tabla. Cuando se trate de los bordes,
la variable tomara el valor de nulo por lo que luego se agrega esta condicion en la
evaluacion del "if" que determinara si una celda esta viva o muerta*/
var beginlife = function(){
  for(var i=0; i<80; i++){
    for(var j=0; j<60; j++){
      var suma=0;
      var cc1=document.getElementById((i-1)+"_"+(j-1));
      var cc2=document.getElementById(i+"_"+(j-1));
      var cc3=document.getElementById((i+1)+"_"+(j-1));
      var cc4=document.getElementById((i-1)+"_"+j);
      var cc5=document.getElementById((i+1)+"_"+(j));
      var cc6=document.getElementById((i-1)+"_"+(j+1));
      var cc7=document.getElementById(i+"_"+(j+1));
      var cc8=document.getElementById((i+1)+"_"+(j+1));
      var celda=document.getElementById(i+"_"+j);
      if(cc1!= null && cc1.className=='alive'){
        suma=suma+1;
      }
      if(cc2!= null && cc2.className=='alive'){
        suma=suma+1;
      }
      if(cc3!= null && cc3.className=='alive'){
        suma=suma+1;
      }
      if(cc4!= null && cc4.className=='alive'){
        suma=suma+1;
      }
      if(cc5!= null && cc5.className=='alive'){
        suma=suma+1;
      }
      if(cc6!= null && cc6.className=='alive'){
        suma=suma+1;
      }
      if(cc7!= null && cc7.className=='alive'){
        suma=suma+1;
      }
      if(cc8!= null && cc8.className=='alive'){
        suma=suma+1;
      }
      /*Dependiendo si una celda esta viva o muerta se sumara el valor de 1 o 0
      a una variable numerica; luego dependiendo de este valor se determinara
      el estado de nuestra celda para el siguiente turno*/
      if(suma>3){
        celda.nextState='dead';
      }
      else if(suma==3){
        celda.nextState='alive';
      }
      else if(suma<2){
        celda.nextState='dead';
      }
      else{
        celda.nextState=celda.className;
      }
    }
  }
  /*Por ultimo se utiliza un bucle para pintar las celdas nuevamente dependiendo
  del estado que estas obtuvieron en el turno anterior*/
  for(var i=0; i<80; i++){
    for(var j=0; j<60; j++){
      var celdita = document.getElementById(i+"_"+j);
      if(celdita.nextState=='alive'){
        celdita.className='alive';
      }
      else if(celdita.nextState=='dead'){
        celdita.className='dead';
      }
    }
  }
}

/*Esta ultima funcion permite realizar nuestro algoritmo de manera repetida
a traves de un intervalo que es depurado al presionar el boton 'reset'*/
var beginGame = function(){
  window.interv = setInterval(function(){beginlife()},250);
}
