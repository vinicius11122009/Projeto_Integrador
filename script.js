/* =========================================================
   ROBÓTICA • TECNOCIÊNCIA • INFORMAÇÃO
   JAVASCRIPT PRINCIPAL
========================================================= */


/* =========================================================
   MENU DE NAVEGAÇÃO
========================================================= */

const botoesMenu =
    document.querySelectorAll(".nav-button");

const secoes =
    document.querySelectorAll(".content-section");


botoesMenu.forEach((botao) => {

    botao.addEventListener("click", () => {

        const idSecao =
            botao.dataset.section;


        /* Remove todas as seções ativas */

        secoes.forEach((secao) => {

            secao.classList.remove("active");

        });


        /* Remove todos os botões ativos */

        botoesMenu.forEach((btn) => {

            btn.classList.remove("active");

        });


        /* Ativa botão */

        botao.classList.add("active");


        /* Localiza seção */

        const secaoSelecionada =
            document.getElementById(idSecao);


        if (!secaoSelecionada) {
            return;
        }


        /* Ativa seção */

        secaoSelecionada.classList.add("active");


        /* Foco no título */

        const titulo =
            secaoSelecionada.querySelector("h2");


        if (titulo) {

            titulo.setAttribute(
                "tabindex",
                "-1"
            );

            titulo.focus();

        }


        /* Volta para o começo do conteúdo */

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

});


/* =========================================================
   TAMANHO DA FONTE
========================================================= */

let tamanhoFonte = 18;


const aumentarFonte =
    document.getElementById("aumentarFonte");

const diminuirFonte =
    document.getElementById("diminuirFonte");

const fonteNormal =
    document.getElementById("fonteNormal");


if (aumentarFonte) {

    aumentarFonte.addEventListener("click", () => {

        if (tamanhoFonte < 28) {

            tamanhoFonte += 2;

            document.documentElement.style.setProperty(
                "--tamanho-fonte",
                `${tamanhoFonte}px`
            );

        }

    });

}


if (diminuirFonte) {

    diminuirFonte.addEventListener("click", () => {

        if (tamanhoFonte > 14) {

            tamanhoFonte -= 2;

            document.documentElement.style.setProperty(
                "--tamanho-fonte",
                `${tamanhoFonte}px`
            );

        }

    });

}


/* =========================================================
   ESPAÇAMENTO
========================================================= */

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
            String(espacamentoAtivo)
        );

    });

}


/* =========================================================
   ALTO CONTRASTE
========================================================= */

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
            String(ativo)
        );

    });

}


/* =========================================================
   RESTAURAR ACESSIBILIDADE
========================================================= */

if (fonteNormal) {

    fonteNormal.addEventListener("click", () => {


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

    });

}


/* =========================================================
   ATALHOS DE TECLADO
========================================================= */

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

    }
);


/* =========================================================
   EFEITO DE DIGITAÇÃO NO TERMINAL
========================================================= */

const terminalTexto =
    document.querySelector(".terminal-text");


if (terminalTexto) {

    const textoOriginal =
        terminalTexto.textContent.trim();

    terminalTexto.textContent = "";

    let indice = 0;


    function digitarTerminal() {

        if (indice < textoOriginal.length) {

            terminalTexto.textContent +=
                textoOriginal.charAt(indice);

            indice++;

            setTimeout(
                digitarTerminal,
                55
            );

        }

    }


    setTimeout(
        digitarTerminal,
        700
    );

}


/* =========================================================
   EFEITO DE CURSOR / INTERAÇÃO NOS CARDS
========================================================= */

const cards =
    document.querySelectorAll(".card");


cards.forEach((card) => {

    card.addEventListener(
        "mousemove",
        (event) => {

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;


            const rotateX =
                ((y / rect.height) - 0.5) * -3;

            const rotateY =
                ((x / rect.width) - 0.5) * 3;


            card.style.transform =
                `
                translateY(-8px)
                perspective(700px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                `;

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform = "";

        }
    );

});


/* =========================================================
   CONTROLE DE MÚSICA
   A música continua sendo carregada pelo iframe do HTML.
========================================================= */

const player =
    document.getElementById("youtubeAudio");


document.addEventListener(
    "click",
    () => {

        if (!player) {
            return;
        }


        player.src =
            "https://www.youtube.com/embed/UIrgptDd-wA?enablejsapi=1&autoplay=1&mute=0&loop=1&playlist=UIrgptDd-wA";

    },
    {
        once: true
    }
);


/* =========================================================
   CONSOLE
========================================================= */

console.log(
    "%c ROBÓTICA • TECNOCIÊNCIA • INFORMAÇÃO ",
    "background:#050816;color:#00f0ff;font-size:16px;font-weight:bold;padding:8px;"
);

console.log(
    "%c Sistema educacional carregado com sucesso.",
    "color:#68ff9b;font-weight:bold;"
);