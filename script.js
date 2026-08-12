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

        /* Remove seção ativa */
        secoes.forEach((secao) => {
            secao.classList.remove("active");
        });

        /* Remove botão ativo */
        botoesMenu.forEach((btn) => {
            btn.classList.remove("active");
        });

        /* Ativa o botão */
        botao.classList.add("active");

        /* Mostra a seção */
        const secaoSelecionada =
            document.getElementById(idSecao);

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


aumentarFonte.addEventListener("click", () => {

    if (tamanhoFonte < 28) {

        tamanhoFonte += 2;

        document.documentElement.style.setProperty(
            "--tamanho-fonte",
            `${tamanhoFonte}px`
        );
    }
});


diminuirFonte.addEventListener("click", () => {

    if (tamanhoFonte > 14) {

        tamanhoFonte -= 2;

        document.documentElement.style.setProperty(
            "--tamanho-fonte",
            `${tamanhoFonte}px`
        );
    }
});


/* =====================================================
   ESPAÇAMENTO ENTRE LINHAS
===================================================== */

const botaoEspacamento =
    document.getElementById("espacamento");

let espacamentoAtivo = false;


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


/* =====================================================
   ALTO CONTRASTE
===================================================== */

const botaoContraste =
    document.getElementById("altoContraste");


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


/* =====================================================
   RESTAURAR ACESSIBILIDADE
===================================================== */

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

    botaoEspacamento.setAttribute(
        "aria-pressed",
        "false"
    );

    /* Contraste */
    document.body.classList.remove(
        "high-contrast"
    );

    botaoContraste.setAttribute(
        "aria-pressed",
        "false"
    );
});


/* =====================================================
   ATALHOS DE TECLADO
===================================================== */

document.addEventListener(
    "keydown",
    (event) => {

        /* Alt + 1 = Introdução */
        if (event.altKey && event.key === "1") {

            document
                .querySelector(
                    '[data-section="introducao"]'
                )
                .click();
        }


        /* Alt + 2 = Robótica */
        if (event.altKey && event.key === "2") {

            document
                .querySelector(
                    '[data-section="robotica"]'
                )
                .click();
        }


        /* Alt + 3 = Tecnociência */
        if (event.altKey && event.key === "3") {

            document
                .querySelector(
                    '[data-section="tecnociencia"]'
                )
                .click();
        }


        /* Alt + 4 = Fake News */
        if (event.altKey && event.key === "4") {

            document
                .querySelector(
                    '[data-section="fakenews"]'
                )
                .click();
        }

    }
);