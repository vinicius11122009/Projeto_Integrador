/* =========================================================
   MENU DE NAVEGAÇÃO
========================================================= */

const botoesMenu = document.querySelectorAll(".nav-button");
const secoes = document.querySelectorAll(".content-section");

botoesMenu.forEach((botao) => {

    botao.addEventListener("click", () => {

        const idSecao = botao.dataset.section;

        secoes.forEach((secao) => {
            secao.classList.remove("active");
        });

        botoesMenu.forEach((btn) => {
            btn.classList.remove("active");
        });

        botao.classList.add("active");

        const secaoSelecionada =
            document.getElementById(idSecao);

        if (!secaoSelecionada) return;

        secaoSelecionada.classList.add("active");

        const titulo =
            secaoSelecionada.querySelector("h2");

        if (titulo) {

            titulo.setAttribute("tabindex", "-1");

            titulo.focus();
        }

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


function atualizarFonte() {

    /*
     * Altera a variável principal
     */
    document.documentElement.style.setProperty(
        "--tamanho-fonte",
        `${tamanhoFonte}px`
    );


    /*
     * Cria uma escala baseada no tamanho escolhido.
     *
     * 18px = 1
     * 20px = 1.11
     * 22px = 1.22
     * 24px = 1.33
     * etc.
     */
    const escala =
        tamanhoFonte / 18;


    document.documentElement.style.setProperty(
        "--escala-fonte",
        escala
    );


    /*
     * Mostra no console para facilitar testes.
     */
    console.log(
        `Tamanho da fonte: ${tamanhoFonte}px`
    );
}


/* AUMENTAR */

if (aumentarFonte) {

    aumentarFonte.addEventListener("click", () => {

        if (tamanhoFonte < 28) {

            tamanhoFonte += 2;

            atualizarFonte();

        }

    });

}


/* DIMINUIR */

if (diminuirFonte) {

    diminuirFonte.addEventListener("click", () => {

        if (tamanhoFonte > 14) {

            tamanhoFonte -= 2;

            atualizarFonte();

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
            espacamentoAtivo ? "2.1" : "1.6"
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
   RESTAURAR
========================================================= */

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


/* =========================================================
   ATALHOS DE TECLADO
========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (event.altKey && event.key === "1") {

            document
                .querySelector(
                    '[data-section="introducao"]'
                )
                ?.click();

        }


        if (event.altKey && event.key === "2") {

            document
                .querySelector(
                    '[data-section="robotica"]'
                )
                ?.click();

        }


        if (event.altKey && event.key === "3") {

            document
                .querySelector(
                    '[data-section="tecnociencia"]'
                )
                ?.click();

        }


        if (event.altKey && event.key === "4") {

            document
                .querySelector(
                    '[data-section="fakenews"]'
                )
                ?.click();

        }

    }
);


/* =========================================================
   EFEITO DOS CARDS
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
   TERMINAL
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
   MÚSICA
========================================================= */

const player =
    document.getElementById("youtubeAudio");


document.addEventListener(
    "click",
    () => {

        if (!player) return;

        player.src =
            "https://www.youtube.com/embed/UIrgptDd-wA?enablejsapi=1&autoplay=1&mute=0&loop=1&playlist=UIrgptDd-wA";

    },
    {
        once: true
    }
);


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

atualizarFonte();


console.log(
    "%c ROBÓTICA • TECNOCIÊNCIA • INFORMAÇÃO ",
    "background:#050816;color:#00f0ff;font-size:16px;font-weight:bold;padding:8px;"
);