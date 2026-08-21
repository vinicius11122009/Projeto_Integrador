/* =====================================================
   MENU DE NAVEGAÇÃO
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

        const secaoSelecionada =
            document.getElementById(idSecao);

        if (secaoSelecionada) {

            secaoSelecionada.classList.add("active");

            const titulo =
                secaoSelecionada.querySelector("h2");

            if (titulo) {

                titulo.setAttribute(
                    "tabindex",
                    "-1"
                );

                titulo.focus();
            }
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
        "--tamanho-fonte",
        `${tamanhoFonte}px`
    );
}


if (aumentarFonte) {

    aumentarFonte.addEventListener("click", () => {

        if (tamanhoFonte < 30) {

            tamanhoFonte += 2;

            atualizarFonte();
        }

    });

}


if (diminuirFonte) {

    diminuirFonte.addEventListener("click", () => {

        if (tamanhoFonte > 12) {

            tamanhoFonte -= 2;

            atualizarFonte();
        }

    });

}


/* =====================================================
   ESPAÇAMENTO
===================================================== */

const botaoEspacamento =
    document.getElementById("espacamento");

let espacamentoAtivo = false;


if (botaoEspacamento) {

    botaoEspacamento.addEventListener("click", () => {

        espacamentoAtivo =
            !espacamentoAtivo;

        document.documentElement.style.setProperty(
            "--espacamento-linha",
            espacamentoAtivo
                ? "2.1"
                : "1.6"
        );

        botaoEspacamento.setAttribute(
            "aria-pressed",
            espacamentoAtivo
        );

    });

}


/* =====================================================
   ALTO CONTRASTE
===================================================== */

const botaoContraste =
    document.getElementById("altoContraste");


if (botaoContraste) {

    botaoContraste.addEventListener("click", () => {

        const ativo =
            document.body.classList.toggle(
                "high-contrast"
            );

        botaoContraste.setAttribute(
            "aria-pressed",
            ativo
        );

    });

}


/* =====================================================
   RESTAURAR
===================================================== */

if (fonteNormal) {

    fonteNormal.addEventListener("click", () => {

        tamanhoFonte = 18;

        atualizarFonte();


        espacamentoAtivo = false;

        document.documentElement.style.setProperty(
            "--espacamento-linha",
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

    });

}


/* =====================================================
   PLAYER DO YOUTUBE
===================================================== */

const player =
    document.getElementById("youtubeAudio");


let playerPronto = false;

let musicaPausadaPelaLeitura = false;


/* =====================================================
   CONTROLE DA MÚSICA
===================================================== */

function enviarComandoYoutube(comando) {

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


function pausarMusica() {

    enviarComandoYoutube("pauseVideo");

    musicaPausadaPelaLeitura = true;
}


function voltarMusica() {

    if (musicaPausadaPelaLeitura) {

        enviarComandoYoutube("playVideo");

        musicaPausadaPelaLeitura = false;
    }
}


/* =====================================================
   ATIVA PLAYER DO YOUTUBE
===================================================== */

window.addEventListener("message", (event) => {

    if (
        event.data &&
        typeof event.data === "string" &&
        event.data.includes("onReady")
    ) {

        playerPronto = true;
    }

});


/* =====================================================
   PRIMEIRO CLIQUE
   ATIVA A MÚSICA COM SOM
===================================================== */

let musicaAtivada = false;


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
   LEITURA POR VOZ
===================================================== */

const lerTexto =
    document.getElementById("lerTexto");

const pararLeitura =
    document.getElementById("pararLeitura");


let lendo = false;


/*
    Pega somente o conteúdo da seção que está visível.
*/

function obterTextoParaLeitura() {

    const secaoAtiva =
        document.querySelector(
            ".content-section.active"
        );

    if (!secaoAtiva) {
        return "";
    }


    const clone =
        secaoAtiva.cloneNode(true);


    /*
        Remove elementos que não precisam
        ser lidos pelo leitor.
    */

    clone.querySelectorAll(
        "button, iframe"
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

    if (!("speechSynthesis" in window)) {

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
        Primeiro para a música.
    */

    pausarMusica();


    const fala =
        new SpeechSynthesisUtterance(texto);


    fala.lang =
        "pt-BR";


    fala.rate =
        0.95;


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


    speechSynthesis.speak(fala);
}


/* =====================================================
   FINALIZAR LEITURA
===================================================== */

function finalizarLeitura() {

    speechSynthesis.cancel();

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
        Quando a leitura termina ou é parada,
        a música volta.
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
   BOTÃO PARAR LEITURA
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
   SE MUDAR DE SEÇÃO DURANTE A LEITURA
===================================================== */

botoesMenu.forEach((botao) => {

    botao.addEventListener(
        "click",
        () => {

            if (lendo) {

                finalizarLeitura();

            }

        }
    );

});


/* =====================================================
   ATALHOS DE TECLADO
===================================================== */

document.addEventListener(
    "keydown",
    (event) => {

        if (!event.altKey) {
            return;
        }


        if (event.key === "1") {

            event.preventDefault();

            document
                .querySelector(
                    '[data-section="introducao"]'
                )
                ?.click();

        }


        if (event.key === "2") {

            event.preventDefault();

            document
                .querySelector(
                    '[data-section="robotica"]'
                )
                ?.click();

        }


        if (event.key === "3") {

            event.preventDefault();

            document
                .querySelector(
                    '[data-section="tecnociencia"]'
                )
                ?.click();

        }


        if (event.key === "4") {

            event.preventDefault();

            document
                .querySelector(
                    '[data-section="fakenews"]'
                )
                ?.click();

        }

    }
);