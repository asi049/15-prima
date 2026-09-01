/* =========================================================
   BLOQUEAR DESPLAZAMIENTO MANUAL

   EL USUARIO SOLO PODRÁ CAMBIAR DE ESCENA
   UTILIZANDO LAS MUESCAS.
========================================================= */


/*
   Evita el movimiento mediante
   rueda del mouse / trackpad.
*/

window.addEventListener(

    "wheel",

    function (evento) {

        evento.preventDefault();

    },

    {
        passive:
            false
    }

);



/*
   Evita arrastrar la página
   con el dedo en celular.
*/

window.addEventListener(

    "touchmove",

    function (evento) {

        evento.preventDefault();

    },

    {
        passive:
            false
    }

);



/*
   Evita teclas que normalmente
   desplazan una página.
*/

window.addEventListener(

    "keydown",

    function (evento) {

        const teclasBloqueadas = [

            "ArrowUp",

            "ArrowDown",

            "PageUp",

            "PageDown",

            "Home",

            "End",

            " "

        ];


        if (
            teclasBloqueadas.includes(
                evento.key
            )
        ) {

            evento.preventDefault();

        }

    }

);



/* =========================================================
   ABRIR INVITACIÓN
========================================================= */

function abrirInvitacion() {

    const invitacion =
        document.getElementById(
            "invitacion"
        );


    /* =====================================================
       MÚSICA
    ===================================================== */

    const musica =
        document.getElementById(
            "musicaFondo"
        );


    if (musica) {

        /*
           VOLUMEN AL 80 %
        */

        musica.volume =
            0.8;


        /*
           Si ya está sonando no
           volvemos a iniciarla.
        */

        if (musica.paused) {

            const reproduccion =
                musica.play();


            /*
               Algunos navegadores devuelven
               una Promise en play().
            */

            if (
                reproduccion !== undefined
            ) {

                reproduccion.catch(

                    function (error) {

                        console.log(
                            "No se pudo iniciar la música:",
                            error
                        );

                    }

                );

            }

        }

    }


    /* =====================================================
       MOSTRAR INVITACIÓN
    ===================================================== */

    invitacion.classList.remove(
        "oculto"
    );


    /*
       Esperamos un momento para permitir
       que el navegador calcule correctamente
       las dimensiones del contenido.
    */

    setTimeout(() => {

        cambiarSeccion(
            "seccion1",
            "avanzar",
            null
        );

    }, 120);

}



/* =========================================================
   FECHA DEL EVENTO

   26 DE SEPTIEMBRE DE 2026
   6:00 PM
========================================================= */

const fechaEvento =
    new Date(

        2026,

        8,

        26,

        18,

        0,

        0

    );



/* =========================================================
   ACTUALIZAR CONTADOR
========================================================= */

function actualizarContador() {

    const ahora =
        new Date();


    const diferencia =
        fechaEvento.getTime()
        -
        ahora.getTime();



    /* =====================================================
       SI YA LLEGÓ LA FECHA
    ===================================================== */

    if (
        diferencia <= 0
    ) {

        document
            .getElementById(
                "dias"
            )
            .textContent =
            "00";


        document
            .getElementById(
                "horas"
            )
            .textContent =
            "00";


        document
            .getElementById(
                "minutos"
            )
            .textContent =
            "00";


        document
            .getElementById(
                "segundos"
            )
            .textContent =
            "00";


        return;

    }



    /* =====================================================
       DÍAS
    ===================================================== */

    const dias =
        Math.floor(

            diferencia
            /
            (
                1000
                *
                60
                *
                60
                *
                24
            )

        );



    /* =====================================================
       HORAS
    ===================================================== */

    const horas =
        Math.floor(

            diferencia
            /
            (
                1000
                *
                60
                *
                60
            )

        )
        %
        24;



    /* =====================================================
       MINUTOS
    ===================================================== */

    const minutos =
        Math.floor(

            diferencia
            /
            (
                1000
                *
                60
            )

        )
        %
        60;



    /* =====================================================
       SEGUNDOS
    ===================================================== */

    const segundos =
        Math.floor(

            diferencia
            /
            1000

        )
        %
        60;



    /* =====================================================
       MOSTRAR DATOS
    ===================================================== */

    document
        .getElementById(
            "dias"
        )
        .textContent =
        dias;


    document
        .getElementById(
            "horas"
        )
        .textContent =
        horas
            .toString()
            .padStart(
                2,
                "0"
            );


    document
        .getElementById(
            "minutos"
        )
        .textContent =
        minutos
            .toString()
            .padStart(
                2,
                "0"
            );


    document
        .getElementById(
            "segundos"
        )
        .textContent =
        segundos
            .toString()
            .padStart(
                2,
                "0"
            );

}



/* =========================================================
   INICIAR CONTADOR
========================================================= */

actualizarContador();


setInterval(

    actualizarContador,

    1000

);



/* =========================================================
   CONTROL DE CAMBIO DE ESCENAS
========================================================= */

let cambiando =
    false;


function cambiarSeccion(
    destinoId,
    direccion,
    boton
) {

    /*
       Evitar doble toque mientras
       se realiza la transición.
    */

    if (
        cambiando
    ) {

        return;

    }


    cambiando =
        true;



    /* =====================================================
       DESTELLOS

       AVANZAR
       VOLVER
       INICIO
    ===================================================== */

    if (
        boton
    ) {

        crearDestellos(
            boton
        );

    }



    /* =====================================================
       TRANSICIÓN DE ONDA
    ===================================================== */

    iniciarTransicion();



    /* =====================================================
       CAMBIAR ESCENA
    ===================================================== */

    setTimeout(() => {

        const destino =
            document.getElementById(
                destinoId
            );


        if (
            !destino
        ) {

            cambiando =
                false;


            return;

        }



        /*
           CALCULAMOS LA POSICIÓN EXACTA
           DE LA ESCENA.

           Esto es más preciso que depender
           únicamente de scrollIntoView()
           en algunos navegadores móviles.
        */

        const posicionDestino =
            destino.getBoundingClientRect().top
            +
            window.scrollY;



        /*
           EL SCROLL MANUAL ESTÁ BLOQUEADO,
           PERO JAVASCRIPT SÍ PUEDE MOVERLO.
        */

        window.scrollTo({

            top:
                posicionDestino,

            left:
                0,

            behavior:
                "auto"

        });



        /*
           Segundo ajuste después de que
           el navegador haya recalculado
           el viewport móvil.

           Esto evita quedar unos píxeles
           entre dos escenas.
        */

        requestAnimationFrame(() => {

            const ajuste =
                destino.getBoundingClientRect().top
                +
                window.scrollY;


            window.scrollTo({

                top:
                    ajuste,

                left:
                    0,

                behavior:
                    "auto"

            });

        });



        animarContenido(
            destino
        );


    }, 460);



    /* =====================================================
       HABILITAR SIGUIENTE CLICK
    ===================================================== */

    setTimeout(() => {

        cambiando =
            false;

    }, 1200);

}



/* =========================================================
   TRANSICIÓN DE ONDA
========================================================= */

function iniciarTransicion() {

    const transicion =
        document.getElementById(
            "transicion"
        );


    transicion.classList.remove(
        "activo"
    );


    /*
       Fuerza el reinicio de
       la animación CSS.
    */

    void transicion.offsetWidth;


    transicion.classList.add(
        "activo"
    );


    setTimeout(() => {

        transicion.classList.remove(
            "activo"
        );

    }, 1300);

}



/* =========================================================
   ANIMACIÓN DEL CONTENIDO
========================================================= */

function animarContenido(
    seccion
) {

    /*
       La portada no utiliza
       class="seccion".
    */

    if (
        !seccion.classList.contains(
            "seccion"
        )
    ) {

        return;

    }


    seccion.classList.remove(
        "animar-entrada"
    );


    /*
       Reiniciar animación.
    */

    void seccion.offsetWidth;


    seccion.classList.add(
        "animar-entrada"
    );


    setTimeout(() => {

        seccion.classList.remove(
            "animar-entrada"
        );

    }, 950);

}



/* =========================================================
   CREAR DESTELLOS
========================================================= */

function crearDestellos(
    boton
) {

    const contenedor =
        document.getElementById(
            "contenedor-particulas"
        );


    /*
       Posición del botón.
    */

    const rect =
        boton.getBoundingClientRect();


    const centroX =
        rect.left
        +
        rect.width
        /
        2;


    const centroY =
        rect.top
        +
        rect.height
        /
        2;



    /*
       Menos partículas en
       celulares pequeños.
    */

    const cantidad =
        window.innerWidth < 380
        ?
        12
        :
        18;



    /* =====================================================
       CREAR DESTELLOS
    ===================================================== */

    for (
        let i = 0;
        i < cantidad;
        i++
    ) {

        const elemento =
            document.createElement(
                "span"
            );


        elemento.className =
            "destello";


        /*
           Alternar estrellas.
        */

        elemento.textContent =
            Math.random() > 0.5
            ?
            "✦"
            :
            "✧";



        /*
           Ángulo aleatorio.
        */

        const angulo =
            Math.random()
            *
            Math.PI
            *
            2;



        /*
           Distancia aleatoria.
        */

        const distancia =
            35
            +
            Math.random()
            *
            85;



        /* =================================================
           POSICIÓN INICIAL
        ================================================= */

        elemento.style.left =
            centroX
            +
            "px";


        elemento.style.top =
            centroY
            +
            "px";



        /* =================================================
           TAMAÑO
        ================================================= */

        elemento.style.fontSize =
            (
                10
                +
                Math.random()
                *
                15
            )
            +
            "px";



        /* =================================================
           MOVIMIENTO X
        ================================================= */

        elemento.style.setProperty(

            "--x",

            Math.cos(
                angulo
            )
            *
            distancia
            +
            "px"

        );



        /* =================================================
           MOVIMIENTO Y
        ================================================= */

        elemento.style.setProperty(

            "--y",

            Math.sin(
                angulo
            )
            *
            distancia
            +
            "px"

        );



        /* =================================================
           AGREGAR
        ================================================= */

        contenedor.appendChild(
            elemento
        );



        /* =================================================
           ELIMINAR DESPUÉS
        ================================================= */

        setTimeout(() => {

            elemento.remove();

        }, 1100);

    }

}



/* =========================================================
   EVITAR GESTOS DE ARRASTRE DEL NAVEGADOR
========================================================= */

document.addEventListener(

    "touchstart",

    function () {},

    {
        passive:
            true
    }

);