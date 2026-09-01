/* =========================================================
   ABRIR INVITACIÓN
========================================================= */

function abrirInvitacion() {

    const invitacion =
        document.getElementById(
            "invitacion"
        );


    const musica =
        document.getElementById(
            "musicaFondo"
        );


    /* =====================================================
       MÚSICA DE FONDO
    ===================================================== */

    if (musica) {

        /*
           VOLUMEN AL 80 %
        */

        musica.volume =
            0.8;


        /*
           SOLO INICIAR SI
           TODAVÍA NO ESTÁ SONANDO
        */

        if (musica.paused) {

            const reproduccion =
                musica.play();


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


    /*
       MOSTRAR EL CONTENEDOR
       DE LA INVITACIÓN
    */

    invitacion.classList.remove(
        "oculto"
    );


    /*
       PASAR DE LA PORTADA
       A LA PRIMERA ESCENA
    */

    cambiarSeccion(
        "seccion1",
        "avanzar",
        null
    );

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
       SI EL EVENTO YA LLEGÓ
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
       CALCULAR DÍAS
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
       CALCULAR HORAS
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
       CALCULAR MINUTOS
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
       CALCULAR SEGUNDOS
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
   CONTROL DE NAVEGACIÓN
========================================================= */

let cambiando =
    false;



function cambiarSeccion(
    destinoId,
    direccion,
    boton
) {

    /*
       EVITAR DOBLE CLICK
       DURANTE LA TRANSICIÓN
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
    ===================================================== */

    if (
        boton
    ) {

        crearDestellos(
            boton
        );

    }



    /* =====================================================
       INICIAR ONDA
    ===================================================== */

    iniciarTransicion();



    /* =====================================================
       CAMBIAR DE ESCENA
       CUANDO LA ONDA CUBRA LA PANTALLA
    ===================================================== */

    setTimeout(() => {

        const portada =
            document.getElementById(
                "portada"
            );


        const invitacion =
            document.getElementById(
                "invitacion"
            );


        /*
           QUITAMOS LA ESCENA ACTIVA
           ANTERIOR.
        */

        const secciones =
            document.querySelectorAll(
                ".seccion"
            );


        secciones.forEach(

            function (seccion) {

                seccion.classList.remove(
                    "activa"
                );


                seccion.classList.remove(
                    "animar-entrada"
                );

            }

        );



        /* =================================================
           SI EL DESTINO ES LA PORTADA
        ================================================= */

        if (
            destinoId === "portada"
        ) {

            /*
               OCULTAR LAS ESCENAS
            */

            invitacion.classList.add(
                "oculto"
            );


            /*
               MOSTRAR PORTADA
            */

            portada.classList.remove(
                "portada-oculta"
            );


            cambiando =
                false;


            return;

        }



        /* =================================================
           SI EL DESTINO ES UNA ESCENA
        ================================================= */

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
           OCULTAR PORTADA
        */

        portada.classList.add(
            "portada-oculta"
        );



        /*
           ASEGURAR QUE EL MAIN
           ESTÉ VISIBLE
        */

        invitacion.classList.remove(
            "oculto"
        );



        /*
           MOSTRAR SOLO
           LA ESCENA DESTINO
        */

        destino.classList.add(
            "activa"
        );



        /*
           ANIMAR CONTENIDO
        */

        animarContenido(
            destino
        );


    }, 460);



    /* =====================================================
       PERMITIR NUEVO CLICK
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


    if (
        !transicion
    ) {

        return;

    }


    transicion.classList.remove(
        "activo"
    );


    /*
       FORZAR REINICIO
       DE LA ANIMACIÓN
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

    if (
        !seccion
    ) {

        return;

    }


    seccion.classList.remove(
        "animar-entrada"
    );


    /*
       REINICIAR ANIMACIÓN
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


    if (
        !contenedor
        ||
        !boton
    ) {

        return;

    }



    /* =====================================================
       POSICIÓN DEL BOTÓN
    ===================================================== */

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



    /* =====================================================
       CANTIDAD DE PARTÍCULAS
    ===================================================== */

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
           DOS TIPOS DE ESTRELLA
        */

        elemento.textContent =
            Math.random() > 0.5
            ?
            "✦"
            :
            "✧";



        /*
           ÁNGULO ALEATORIO
        */

        const angulo =
            Math.random()
            *
            Math.PI
            *
            2;



        /*
           DISTANCIA
        */

        const distancia =
            35
            +
            Math.random()
            *
            85;



        /*
           POSICIÓN INICIAL
        */

        elemento.style.left =
            centroX
            +
            "px";


        elemento.style.top =
            centroY
            +
            "px";



        /*
           TAMAÑO
        */

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



        /*
           MOVIMIENTO X
        */

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



        /*
           MOVIMIENTO Y
        */

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



        /*
           AGREGAR
        */

        contenedor.appendChild(
            elemento
        );



        /*
           ELIMINAR DESPUÉS
           DE LA ANIMACIÓN
        */

        setTimeout(() => {

            elemento.remove();

        }, 1100);

    }

}



/* =========================================================
   EVITAR MENÚS / GESTOS DE DESPLAZAMIENTO
   INNECESARIOS EN CELULAR
========================================================= */

document.addEventListener(

    "touchstart",

    function () {},

    {
        passive:
            true
    }

);