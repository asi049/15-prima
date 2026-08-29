/* =========================================
   ABRIR INVITACIÓN
========================================= */

function abrirInvitacion() {

    const invitacion =
        document.getElementById(
            "invitacion"
        );


    invitacion.classList.remove(
        "oculto"
    );


    setTimeout(() => {

        cambiarSeccion(
            "seccion1",
            "avanzar",
            null
        );

    }, 120);

}


/* =========================================
   FECHA DEL EVENTO

   26 DE SEPTIEMBRE DE 2026
   6:00 PM
========================================= */

const fechaEvento =
    new Date(
        2026,
        8,
        26,
        18,
        0,
        0
    );


/* =========================================
   ACTUALIZAR CONTADOR
========================================= */

function actualizarContador() {

    const ahora =
        new Date();


    const diferencia =
        fechaEvento.getTime()
        -
        ahora.getTime();


    if (diferencia <= 0) {

        document
            .getElementById("dias")
            .textContent =
            "00";


        document
            .getElementById("horas")
            .textContent =
            "00";


        document
            .getElementById("minutos")
            .textContent =
            "00";


        document
            .getElementById("segundos")
            .textContent =
            "00";


        return;
    }


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


    const segundos =
        Math.floor(
            diferencia
            /
            1000
        )
        %
        60;


    document
        .getElementById("dias")
        .textContent =
        dias;


    document
        .getElementById("horas")
        .textContent =
        horas
            .toString()
            .padStart(
                2,
                "0"
            );


    document
        .getElementById("minutos")
        .textContent =
        minutos
            .toString()
            .padStart(
                2,
                "0"
            );


    document
        .getElementById("segundos")
        .textContent =
        segundos
            .toString()
            .padStart(
                2,
                "0"
            );

}


/* INICIAR CONTADOR */

actualizarContador();


setInterval(
    actualizarContador,
    1000
);


/* =========================================
   CONTROL DEL CAMBIO DE PANTALLAS
========================================= */

let cambiando =
    false;


function cambiarSeccion(
    destinoId,
    direccion,
    boton
) {

    /*
       EVITA DOBLE CLICK
       DURANTE LA TRANSICIÓN
    */

    if (cambiando) {
        return;
    }


    cambiando =
        true;


    /* =====================================
       DESTELLOS

       AHORA SE USAN EN LAS DOS FLECHAS:

       - AVANZAR
       - VOLVER
    ====================================== */

    if (boton) {

        crearDestellos(
            boton
        );

    }


    /* INICIAR ONDA */

    iniciarTransicion();


    /* =====================================
       CAMBIAR DE SECCIÓN CUANDO
       LA ONDA CUBRA LA PANTALLA
    ====================================== */

    setTimeout(() => {

        const destino =
            document.getElementById(
                destinoId
            );


        if (!destino) {

            cambiando =
                false;

            return;
        }


        destino.scrollIntoView({

            behavior:
                "auto",

            block:
                "start"

        });


        animarContenido(
            destino
        );


    }, 460);


    /* =====================================
       HABILITAR SIGUIENTE CLICK
    ====================================== */

    setTimeout(() => {

        cambiando =
            false;

    }, 1200);

}


/* =========================================
   TRANSICIÓN DE ONDA
========================================= */

function iniciarTransicion() {

    const transicion =
        document.getElementById(
            "transicion"
        );


    transicion.classList.remove(
        "activo"
    );


    /*
       FORZAMOS REINICIO
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


/* =========================================
   ANIMACIÓN DEL CONTENIDO
========================================= */

function animarContenido(
    seccion
) {

    /*
       PORTADA NO TIENE
       class="seccion"
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


/* =========================================
   CREAR DESTELLOS

   FUNCIONAN EN:
   - FLECHA DERECHA
   - FLECHA IZQUIERDA
========================================= */

function crearDestellos(
    boton
) {

    const contenedor =
        document.getElementById(
            "contenedor-particulas"
        );


    /*
       OBTENER POSICIÓN DEL BOTÓN
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
       MENOS PARTÍCULAS EN
       CELULARES PEQUEÑOS
    */

    const cantidad =
        window.innerWidth < 380
        ?
        12
        :
        18;


    /*
       CREAR CADA DESTELLO
    */

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
           TAMAÑO ALEATORIO
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
           AGREGAR A PANTALLA
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


/* =========================================
   OPTIMIZACIÓN PARA PANTALLAS TÁCTILES
========================================= */

document.addEventListener(

    "touchstart",

    function () {},

    {
        passive: true
    }

);