$(document).ready(function(){
   

    
    
    //Lo siguiente es para poder marcar con una línea cuando una tarea ya esté hecha (en sección Hoy Toca)
    var list = document.getElementsByTagName("li");
    for(var i=0; i<list.length; i++){
     list[i].addEventListener("click", liClick);
    }
    function liClick(){
      this.classList.toggle("done");
    }







});


