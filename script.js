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


        /* Para qualquer leitura que esteja acontecendo */

        pararLeitura();


        /* Remove seção ativa */

        secoes.forEach((secao) => {

            secao.classList.remove("active");

        });


        /* Remove botão ativo */

        botoesMenu.forEach((btn) => {

            btn.classList.remove("active");

        });


        /* Ativa botão */

        botao.classList.add("active");


        /* Mostra seção */

        const secaoSelecionada =
            document.getElementById(idSecao);


        if (!secaoSelecionada) return;


        secaoSelecionada.classList.add("active");


        /* Coloca foco no título */

        const titulo =
            secaoSelecionada.querySelector("h2");


        if (titulo) {

            titulo.setAttribute(
                "tabindex",
                "-1"
            );

            titulo.focus();

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


/* AUMENTAR */

if (aumentarFonte) {

    aumentarFonte.addEventListener(
        "click",
        () => {

            if (tamanhoFonte < 28) {

                tamanhoFonte += 2;

                atualizarFonte();

            }

        }
    );

}


/* DIMINUIR */

if (diminuirFonte) {

    diminuirFonte.addEventListener(
        "click",
        () => {

            if (tamanhoFonte > 14) {

                tamanhoFonte -= 2;

                atualizarFonte();

            }

        }
    );

}


/* =====================================================
   ESPAÇAMENTO ENTRE LINHAS
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
                "--espacamento-linha",
                espacamentoAtivo
                    ? "2.1"
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
   CONTROLE DA MÚSICA
===================================================== */

const playerMusica =
    document.getElementById("youtubeAudio");


/*
    Envia comandos para o YouTube.

    pauseVideo = pausa
    playVideo  = continua
*/

function controlarMusica(comando) {

    if (!playerMusica) return;


    playerMusica.contentWindow.postMessage(
        JSON.stringify({
            event: "command",
            func: comando,
            args: []
        }),
        "*"
    );

}


/* =====================================================
   LEITOR DE TEXTO
===================================================== */

const botaoLerTexto =
    document.getElementById("lerTexto");


const botaoPararLeitura =
    document.getElementById("pararLeitura");


let lendoTexto = false;


/*
    Obtém somente o texto da seção que está aberta.
*/

function obterTextoSecaoAtiva() {

    const secaoAtiva =
        document.querySelector(
            ".content-section.active"
        );


    if (!secaoAtiva) {

        return "";

    }


    /*
        Clona a seção para evitar
        pegar elementos desnecessários.
    */

    const clone =
        secaoAtiva.cloneNode(true);


    /*
        Remove elementos que não precisam
        ser lidos.
    */

    clone
        .querySelectorAll(
            "button, script, iframe"
        )
        .forEach((elemento) => {

            elemento.remove();

        });


    return clone.innerText
        .replace(/\s+/g, " ")
        .trim();

}


/*
    Começa a leitura.
*/

function lerTexto() {

    /*
        Verifica se o navegador
        possui Speech Synthesis.
    */

    if (!("speechSynthesis" in window)) {

        alert(
            "Seu navegador não possui suporte à leitura de texto por voz."
        );

        return;

    }


    const texto =
        obterTextoSecaoAtiva();


    if (!texto) return;


    /*
        Cancela qualquer leitura anterior.
    */

    window.speechSynthesis.cancel();


    /*
        IMPORTANTE:

        Ao iniciar a leitura,
        a música é pausada.
    */

    controlarMusica("pauseVideo");


    const fala =
        new SpeechSynthesisUtterance(
            texto
        );


    /*
        Configura a voz.
    */

    fala.lang = "pt-BR";

    fala.rate = 0.95;

    fala.pitch = 1;

    fala.volume = 1;


    /*
        Tenta encontrar uma voz brasileira.
    */

    const vozes =
        window.speechSynthesis.getVoices();


    const vozBrasileira =
        vozes.find(
            (voz) =>
                voz.lang === "pt-BR"
        );


    if (vozBrasileira) {

        fala.voice =
            vozBrasileira;

    }


    /*
        Indica que a leitura começou.
    */

    lendoTexto = true;


    document.body.classList.add(
        "reading-active"
    );


    botaoLerTexto.setAttribute(
        "aria-pressed",
        "true"
    );


    /*
        Quando terminar automaticamente,
        a música volta.
    */

    fala.onend = () => {

        lendoTexto = false;


        document.body.classList.remove(
            "reading-active"
        );


        botaoLerTexto.setAttribute(
            "aria-pressed",
            "false"
        );


        controlarMusica(
            "playVideo"
        );

    };


    /*
        Caso aconteça algum erro,
        também libera o estado.
    */

    fala.onerror = () => {

        lendoTexto = false;


        document.body.classList.remove(
            "reading-active"
        );


        botaoLerTexto.setAttribute(
            "aria-pressed",
            "false"
        );


        controlarMusica(
            "playVideo"
        );

    };


    /*
        Inicia a fala.
    */

    window.speechSynthesis.speak(
        fala
    );

}


/* =====================================================
   PARAR LEITURA
===================================================== */

function pararLeitura() {

    if ("speechSynthesis" in window) {

        window.speechSynthesis.cancel();

    }


    lendoTexto = false;


    document.body.classList.remove(
        "reading-active"
    );


    if (botaoLerTexto) {

        botaoLerTexto.setAttribute(
            "aria-pressed",
            "false"
        );

    }


    /*
        IMPORTANTE:

        Ao clicar em "Parar leitura",
        a música volta.
    */

    controlarMusica(
        "playVideo"
    );

}


/* =====================================================
   BOTÃO LER TEXTO
===================================================== */

if (botaoLerTexto) {

    botaoLerTexto.addEventListener(
        "click",
        lerTexto
    );

}


/* =====================================================
   BOTÃO PARAR LEITURA
===================================================== */

if (botaoPararLeitura) {

    botaoPararLeitura.addEventListener(
        "click",
        pararLeitura
    );

}


/* =====================================================
   CARREGAMENTO DAS VOZES
===================================================== */

/*
    Alguns navegadores carregam as vozes
    de maneira assíncrona.

    Esta chamada força o carregamento.
*/

if ("speechSynthesis" in window) {

    window.speechSynthesis
        .getVoices();

}


/* =====================================================
   RESTAURAR ACESSIBILIDADE
===================================================== */

if (fonteNormal) {

    fonteNormal.addEventListener(
        "click",
        () => {

            /* Fonte */

            tamanhoFonte = 18;

            document.documentElement.style.setProperty(
                "--tamanho-fonte",
                "18px"
            );


            /* Espaçamento */

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


            /* Contraste */

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
   ATALHOS DE TECLADO
===================================================== */

document.addEventListener(
    "keydown",
    (event) => {


        /* Alt + 1 */

        if (
            event.altKey &&
            event.key === "1"
        ) {

            const botao =
                document.querySelector(
                    '[data-section="introducao"]'
                );


            if (botao) {

                botao.click();

            }

        }


        /* Alt + 2 */

        if (
            event.altKey &&
            event.key === "2"
        ) {

            const botao =
                document.querySelector(
                    '[data-section="robotica"]'
                );


            if (botao) {

                botao.click();

            }

        }


        /* Alt + 3 */

        if (
            event.altKey &&
            event.key === "3"
        ) {

            const botao =
                document.querySelector(
                    '[data-section="tecnociencia"]'
                );


            if (botao) {

                botao.click();

            }

        }


        /* Alt + 4 */

        if (
            event.altKey &&
            event.key === "4"
        ) {

            const botao =
                document.querySelector(
                    '[data-section="fakenews"]'
                );


            if (botao) {

                botao.click();

            }

        }


        /*
            ESC também para a leitura.
        */

        if (event.key === "Escape") {

            pararLeitura();

        }

    }
);