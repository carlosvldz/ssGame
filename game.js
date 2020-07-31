const celeste = document.getElementById('celeste')
      const violeta = document.getElementById('violeta')
      const naranja = document.getElementById('naranja')
      const verde = document.getElementById('verde')
      const btnEmpezar = document.getElementById('btnEmpezar') //Esta función va recibir un string con el id del elemento que queremos obtener
      const ULTIMO_NIVEL = 10
      
    //Esta clase contiene toda la lógica del videojuego
      class Juego { 
        constructor() { //Definimos el constructor 
            this.inicializar = this.inicializar.bind(this)
            this.inicializar()
            this.generarSecuencia()
            setTimeout(this.siguienteNivel, 500)
        }

        inicializar() { //Esta función va a ocultar el botón de empezar
          this.elegirColor = this.elegirColor.bind(this) //Para que elegirColor este atado al juego y no al bóton
          this.siguienteNivel = this.siguienteNivel.bind(this)
          this.toggleBtnEmpezar()
          this.nivel = 1 //Indicamos que al inicializar el nivel es 1 
          this.colores = {  //guardamos los colores p/ hacer operaciones con ellos de manera más sencilla
              celeste,
              violeta,
              naranja,
              verde
          }
        }

        toggleBtnEmpezar() {
            if (btnEmpezar.classList.contains("hide")) {
                btnEmpezar.classList.remove("hide")
            } else {
                btnEmpezar.classList.add("hide")
            }
        }

        generarSecuencia() {   //Generamos un array indicando que contenga 10 elementos, fill para rellenar y vamos a retornar Math.random
            this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4)) //Math.random nos da un valor entre 0 y 1 y al * 4 obtenemos un valor entre 0 y 4
        }                                                                                  //sin que llegue a 4 (hasta 3.9) y nos quedaremos con la parte entera del resulta. 
                                                                                           //Con Math.floor redondeamos hacia abajo el número (si es 3.9 nos deja el 3)  
        
        siguienteNivel() {  //Para llamar al siguiente nivel 
            this.subnivel = 0
            this.iluminarSecuencia()  //Y cada vez que inicie un siguiente nivel se va a iluminar la secuencia
            this.agregarEventosClick() //Este metodo agregará los eventos de clic a los botones
        }   
        
        transformarNumeroAColor(numero) { //metodo para que a cada numero se le asigne un color 
            switch (numero) {             //no utilizamos un break, ya que nunca se ejecutará por el retur anterior
                case 0:
                    return "celeste"
                case 1:
                    return "violeta"
                case 2:
                    return "naranja"
                case 3:
                    return "verde"
            }
        }

        transformarColorANumero(color) { //metodo para que a cada color se le asigne un número 
            switch (color) {             //no utilizamos un break, ya que nunca se ejecutará por el retur anterior
                case "celeste":
                    return 0
                case "violeta":
                    return 1
                case "naranja":
                    return 2
                case "verde":
                    return 3
            }
        }

        iluminarSecuencia() {  //esta funcion va a recorrer el array de la secuencia hasta el nivel que este el usuario a medida que pase el nivel se va a incrementar
            for (let i = 0; i < this.nivel; i++) { 
                const color = this.transformarNumeroAColor(this.secuencia[i]) //obtener color para cada i e iluminar el color, pasando la secuencia en la que estamos 
                setTimeout(() => this.iluminarColor(color), 1000 * i) //funcion para iluminar color, pasandole el color que tiene que iluminar 
            }                                                         //con un delay entre cada color que se ilumine
        }

        iluminarColor(color) { //funcion para iluminar color
            this.colores[color].classList.add("light")  //pasamos el color que tiene que iluminar agregando la clase light en CSS para que se ilumine
            setTimeout(() => this.apagarColor(color), 350) //utilizamos una funcion en el tiempo para que se apagues despues del tiempo
        }

        apagarColor(color) { //función para remover la iluminación
            this.colores[color].classList.remove("light")
        }

        agregarEventosClick() { //este metodo le pasamos cada uno de los colores, agregando el evento clic y decirle al navegador que funcion ejecutar 
            this.colores.celeste.addEventListener("click", this.elegirColor)
            //c/uno de los botones en el DOM//p/ agregar el manejador de un evento//funcion a ejecutar
            this.colores.verde.addEventListener("click", this.elegirColor)
            this.colores.violeta.addEventListener("click", this.elegirColor)
            this.colores.naranja.addEventListener("click", this.elegirColor)
        }

        eliminarEventosClick() {
            this.colores.celeste.removeEventListener("click", this.elegirColor)
            this.colores.verde.removeEventListener("click", this.elegirColor)
            this.colores.violeta.removeEventListener("click", this.elegirColor)
            this.colores.naranja.removeEventListener("click", this.elegirColor)
        }

        elegirColor(ev) { //esta funcion el navegador indica a JS que la llame cuando suceda ese evento, con el parametro ev
            const nombreColor = ev.target.dataset.color
            const numeroColor = this.transformarColorANumero(nombreColor)
            this.iluminarColor(nombreColor)
            if (numeroColor === this.secuencia[this.subnivel]) {
                this.subnivel++
                if (this.subnivel === this.nivel) {
                  this.nivel++
                  this.eliminarEventosClick()
                  if(this.nivel === (ULTIMO_NIVEL + 1)) {
                    this.ganoElJuego()
                  } else {
                    setTimeout(this.siguienteNivel, 1500)
                  }
                }  
            } else {
                this.perdioElJuego()
            }
        }

        ganoElJuego() {
            swal("Platzi", "Felicitaciones, ganaste el juego!", "success")
                .then(this.inicializar)
        }

        perdioElJuego() {
            swal("Platzi", "Lo lamentamos, perdiste :(", "error")
                .then(() => {
                    this.eliminarEventosClick()
                    this.inicializar()   
                })
        }

      }

      function empezarJuego() {
        //Creamos la variable var juego para iniciar el juego  
        var juego = new Juego()
      }