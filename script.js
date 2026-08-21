/* =====================================================
   MENU
===================================================== */

const botoesMenu =
    document.querySelectorAll(".nav-button");

const secoes =
    document.querySelectorAll(".content-section");


botoesMenu.forEach((botao) => {

    botao.addEventListener("click", () => {

        const idSecao =
            botao.dataset.section;

        secoes.forEach((secao) => {
            secao.classList.remove("active");
        });

        botoesMenu.forEach((btn) => {
            btn.classList.remove("active");
        });

        botao.classList.add("active");

        const secao =
            document.getElementById(idSecao);

        if (!secao) {
            return;
        }

        secao.classList.add("active");

        const titulo =
            secao.querySelector("h2");

        if (titulo) {

            titulo.setAttribute(
                "tabindex",
                "-1"
            );

            titulo.focus();
        }

        /*
         * Se estiver lendo uma seção e trocar de página,
         * interrompe a leitura para não misturar textos.
         */

        if (lendo) {
            finalizarLeitura();
        }

    });

});


/* =====================================================
   TAMANHO DA FONTE
===================================================== */

let tamanhoFonte = 18;


const aumentarFonte =
    document.getElementById("aumentarFonte");

const diminuirFonte =
    document.getElementById("diminuirFonte");

const fonteNormal =
    document.getElementById("fonteNormal");


function atualizarFonte() {

    document.documentElement.style.setProperty(
        "--font-size",
        `${tamanhoFonte}px`
    );

}


if (aumentarFonte) {

    aumentarFonte.addEventListener(
        "click",
        () => {

            if (tamanhoFonte < 30) {

                tamanhoFonte += 2;

                atualizarFonte();
            }

        }
    );

}


if (diminuirFonte) {

    diminuirFonte.addEventListener(
        "click",
        () => {

            if (tamanhoFonte > 12) {

                tamanhoFonte -= 2;

                atualizarFonte();
            }

        }
    );

}


/* =====================================================
   ESPAÇAMENTO
===================================================== */

const botaoEspacamento =
    document.getElementById("espacamento");

let espacamentoAtivo = false;


if (botaoEspacamento) {

    botaoEspacamento.addEventListener(
        "click",
        () => {

            espacamentoAtivo =
                !espacamentoAtivo;

            document.documentElement.style.setProperty(
                "--line-height",
                espacamentoAtivo
                    ? "2.15"
                    : "1.6"
            );

            botaoEspacamento.setAttribute(
                "aria-pressed",
                espacamentoAtivo
            );

        }
    );

}


/* =====================================================
   ALTO CONTRASTE
===================================================== */

const botaoContraste =
    document.getElementById("altoContraste");


if (botaoContraste) {

    botaoContraste.addEventListener(
        "click",
        () => {

            const ativo =
                document.body.classList.toggle(
                    "high-contrast"
                );

            botaoContraste.setAttribute(
                "aria-pressed",
                ativo
            );

        }
    );

}


/* =====================================================
   RESTAURAR
===================================================== */

if (fonteNormal) {

    fonteNormal.addEventListener(
        "click",
        () => {

            tamanhoFonte = 18;

            atualizarFonte();


            espacamentoAtivo = false;

            document.documentElement.style.setProperty(
                "--line-height",
                "1.6"
            );


            if (botaoEspacamento) {

                botaoEspacamento.setAttribute(
                    "aria-pressed",
                    "false"
                );

            }


            document.body.classList.remove(
                "high-contrast"
            );


            if (botaoContraste) {

                botaoContraste.setAttribute(
                    "aria-pressed",
                    "false"
                );

            }

        }
    );

}


/* =====================================================
   PLAYER DO YOUTUBE
===================================================== */

const player =
    document.getElementById("youtubeAudio");


let musicaAtivada = false;

let musicaPausadaPelaLeitura = false;


/* =====================================================
   COMANDOS YOUTUBE
===================================================== */

function comandoYoutube(comando) {

    if (!player || !player.contentWindow) {
        return;
    }

    player.contentWindow.postMessage(
        JSON.stringify({
            event: "command",
            func: comando,
            args: []
        }),
        "*"
    );

}


/* =====================================================
   PAUSAR MÚSICA
===================================================== */

function pausarMusica() {

    if (!musicaAtivada) {
        return;
    }

    comandoYoutube("pauseVideo");

    musicaPausadaPelaLeitura = true;
}


/* =====================================================
   VOLTAR MÚSICA
===================================================== */

function voltarMusica() {

    if (!musicaPausadaPelaLeitura) {
        return;
    }

    comandoYoutube("playVideo");

    musicaPausadaPelaLeitura = false;
}


/* =====================================================
   PRIMEIRO CLIQUE
===================================================== */

document.addEventListener(
    "click",
    () => {

        if (!player || musicaAtivada) {
            return;
        }

        musicaAtivada = true;

        player.src =
            "https://www.youtube.com/embed/UIrgptDd-wA?enablejsapi=1&autoplay=1&mute=0&loop=1&playlist=UIrgptDd-wA";

    },
    {
        once: true
    }
);


/* =====================================================
   LEITURA DE TEXTO
===================================================== */

const lerTexto =
    document.getElementById("lerTexto");

const pararLeitura =
    document.getElementById("pararLeitura");


let lendo = false;


/* =====================================================
   OBTER TEXTO DA SEÇÃO ATUAL
===================================================== */

function obterTextoParaLeitura() {

    const secao =
        document.querySelector(
            ".content-section.active"
        );

    if (!secao) {
        return "";
    }

    const clone =
        secao.cloneNode(true);


    /*
     * Remove elementos visuais desnecessários
     * para a leitura.
     */

    clone.querySelectorAll(
        ".card-icon, .card-number, .section-tag, .content-label"
    ).forEach((elemento) => {

        elemento.remove();

    });


    return clone.innerText
        .replace(/\s+/g, " ")
        .trim();
}


/* =====================================================
   INICIAR LEITURA
===================================================== */

function iniciarLeitura() {

    if (
        !("speechSynthesis" in window)
    ) {

        alert(
            "Seu navegador não possui suporte à leitura por voz."
        );

        return;
    }


    speechSynthesis.cancel();


    const texto =
        obterTextoParaLeitura();


    if (!texto) {
        return;
    }


    /*
     * A música para ANTES da voz começar.
     */

    pausarMusica();


    const fala =
        new SpeechSynthesisUtterance(
            texto
        );


    fala.lang =
        "pt-BR";

    fala.rate =
        0.92;

    fala.pitch =
        1;

    fala.volume =
        1;


    fala.onstart = () => {

        lendo = true;

        document.body.classList.add(
            "reading-active"
        );


        if (lerTexto) {

            lerTexto.setAttribute(
                "aria-pressed",
                "true"
            );

        }

    };


    fala.onend = () => {

        finalizarLeitura();

    };


    fala.onerror = () => {

        finalizarLeitura();

    };


    speechSynthesis.speak(
        fala
    );
}


/* =====================================================
   FINALIZAR LEITURA
===================================================== */

function finalizarLeitura() {

    if (
        "speechSynthesis" in window
    ) {

        speechSynthesis.cancel();

    }


    lendo = false;


    document.body.classList.remove(
        "reading-active"
    );


    if (lerTexto) {

        lerTexto.setAttribute(
            "aria-pressed",
            "false"
        );

    }


    /*
     * Quando parar a leitura,
     * a música volta.
     */

    voltarMusica();
}


/* =====================================================
   BOTÃO LER
===================================================== */

if (lerTexto) {

    lerTexto.addEventListener(
        "click",
        () => {

            if (lendo) {

                finalizarLeitura();

            } else {

                iniciarLeitura();

            }

        }
    );

}


/* =====================================================
   BOTÃO PARAR
===================================================== */

if (pararLeitura) {

    pararLeitura.addEventListener(
        "click",
        () => {

            finalizarLeitura();

        }
    );

}


/* =====================================================
   ATALHOS DE TECLADO
===================================================== */

document.addEventListener(
    "keydown",
    (event) => {

        if (!event.altKey) {
            return;
        }


        const atalhos = {

            "1": "introducao",
            "2": "robotica",
            "3": "tecnociencia",
            "4": "fakenews"

        };


        const secao =
            atalhos[event.key];


        if (!secao) {
            return;
        }


        event.preventDefault();


        const botao =
            document.querySelector(
                `[data-section="${secao}"]`
            );


        if (botao) {
            botao.click();
        }

    }
);