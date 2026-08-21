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

            secao.classList.remove(
                "active"
            );

        });


        /* Remove botão ativo */

        botoesMenu.forEach((btn) => {

            btn.classList.remove(
                "active"
            );

        });


        /* Ativa botão */

        botao.classList.add(
            "active"
        );


        /* Encontra seção */

        const secaoSelecionada =
            document.getElementById(
                idSecao
            );


        if (!secaoSelecionada) {
            return;
        }


        /* Ativa seção */

        secaoSelecionada.classList.add(
            "active"
        );


        /* Coloca foco no título */

        const titulo =
            secaoSelecionada.querySelector(
                "h2"
            );


        if (titulo) {

            titulo.setAttribute(
                "tabindex",
                "-1"
            );

            titulo.focus();

        }


        /* Volta para o começo */

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

});


/* =====================================================
   TAMANHO DA FONTE
===================================================== */

let tamanhoFonte = 18;


const aumentarFonte =
    document.getElementById(
        "aumentarFonte"
    );


const diminuirFonte =
    document.getElementById(
        "diminuirFonte"
    );


const fonteNormal =
    document.getElementById(
        "fonteNormal"
    );


function atualizarFonte() {

    document.documentElement.style.setProperty(
        "--tamanho-fonte",
        `${tamanhoFonte}px`
    );


    const escala =
        tamanhoFonte / 18;


    document.documentElement.style.setProperty(
        "--escala-fonte",
        escala
    );

}


/* Aumentar */

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


/* Diminuir */

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
    document.getElementById(
        "espacamento"
    );


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
                String(espacamentoAtivo)
            );

        }
    );

}


/* =====================================================
   ALTO CONTRASTE
===================================================== */

const botaoContraste =
    document.getElementById(
        "altoContraste"
    );


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
                String(ativo)
            );

        }
    );

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

            atualizarFonte();


            /* Espaçamento */

            espacamentoAtivo =
                false;


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
   LEITOR DE VOZ
===================================================== */

const botaoLerTexto =
    document.getElementById(
        "lerTexto"
    );


const botaoPausarLeitura =
    document.getElementById(
        "pausarLeitura"
    );


const botaoContinuarLeitura =
    document.getElementById(
        "continuarLeitura"
    );


const botaoPararLeitura =
    document.getElementById(
        "pararLeitura"
    );


let leituraAtual = null;


/* Verifica suporte */

if (
    !("speechSynthesis" in window)
) {

    if (botaoLerTexto) {

        botaoLerTexto.disabled =
            true;

        botaoLerTexto.textContent =
            "🔊 Leitura indisponível";

    }

} else {


    /* =================================================
       PEGAR TEXTO DA SEÇÃO
    ================================================= */

    function pegarTextoDaSecaoAtual() {

        const secaoAtiva =
            document.querySelector(
                ".content-section.active"
            );


        if (!secaoAtiva) {

            return "";

        }


        /*
         * innerText pega apenas o conteúdo
         * textual visível da seção.
         */

        return secaoAtiva.innerText
            .replace(/\s+/g, " ")
            .trim();

    }


    /* =================================================
       LER TEXTO
    ================================================= */

    if (botaoLerTexto) {

        botaoLerTexto.addEventListener(
            "click",
            () => {

                /*
                 * Para leitura anterior.
                 */

                window.speechSynthesis.cancel();


                const texto =
                    pegarTextoDaSecaoAtual();


                if (!texto) {

                    return;

                }


                leituraAtual =
                    new SpeechSynthesisUtterance(
                        texto
                    );


                /*
                 * Português brasileiro
                 */

                leituraAtual.lang =
                    "pt-BR";


                /*
                 * Velocidade
                 */

                leituraAtual.rate =
                    1;


                /*
                 * Tom
                 */

                leituraAtual.pitch =
                    1;


                /*
                 * Volume
                 */

                leituraAtual.volume =
                    1;


                /* Começou */

                leituraAtual.onstart =
                    () => {

                        botaoLerTexto.setAttribute(
                            "aria-pressed",
                            "true"
                        );


                        botaoLerTexto.textContent =
                            "🔊 Lendo...";

                    };


                /* Terminou */

                leituraAtual.onend =
                    () => {

                        botaoLerTexto.setAttribute(
                            "aria-pressed",
                            "false"
                        );


                        botaoLerTexto.textContent =
                            "🔊 Ler texto";

                    };


                /* Erro */

                leituraAtual.onerror =
                    () => {

                        botaoLerTexto.setAttribute(
                            "aria-pressed",
                            "false"
                        );


                        botaoLerTexto.textContent =
                            "🔊 Ler texto";

                    };


                /*
                 * Inicia voz
                 */

                window.speechSynthesis.speak(
                    leituraAtual
                );

            }
        );

    }


    /* =================================================
       PAUSAR
    ================================================= */

    if (botaoPausarLeitura) {

        botaoPausarLeitura.addEventListener(
            "click",
            () => {

                if (
                    window.speechSynthesis
                        .speaking
                ) {

                    window.speechSynthesis.pause();

                }

            }
        );

    }


    /* =================================================
       CONTINUAR
    ================================================= */

    if (botaoContinuarLeitura) {

        botaoContinuarLeitura.addEventListener(
            "click",
            () => {

                if (
                    window.speechSynthesis
                        .paused
                ) {

                    window.speechSynthesis.resume();

                }

            }
        );

    }


    /* =================================================
       PARAR
    ================================================= */

    if (botaoPararLeitura) {

        botaoPararLeitura.addEventListener(
            "click",
            () => {

                window.speechSynthesis.cancel();


                if (botaoLerTexto) {

                    botaoLerTexto.setAttribute(
                        "aria-pressed",
                        "false"
                    );


                    botaoLerTexto.textContent =
                        "🔊 Ler texto";

                }

            }
        );

    }


    /* =================================================
       TROCA DE SEÇÃO
    ================================================= */

    botoesMenu.forEach((botao) => {

        botao.addEventListener(
            "click",
            () => {

                window.speechSynthesis.cancel();


                if (botaoLerTexto) {

                    botaoLerTexto.setAttribute(
                        "aria-pressed",
                        "false"
                    );


                    botaoLerTexto.textContent =
                        "🔊 Ler texto";

                }

            }
        );

    });

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

            document
                .querySelector(
                    '[data-section="introducao"]'
                )
                ?.click();

        }


        /* Alt + 2 */

        if (
            event.altKey &&
            event.key === "2"
        ) {

            document
                .querySelector(
                    '[data-section="robotica"]'
                )
                ?.click();

        }


        /* Alt + 3 */

        if (
            event.altKey &&
            event.key === "3"
        ) {

            document
                .querySelector(
                    '[data-section="tecnociencia"]'
                )
                ?.click();

        }


        /* Alt + 4 */

        if (
            event.altKey &&
            event.key === "4"
        ) {

            document
                .querySelector(
                    '[data-section="fakenews"]'
                )
                ?.click();

        }

    }
);


/* =====================================================
   EFEITO DOS CARDS
===================================================== */

const cards =
    document.querySelectorAll(
        ".card"
    );


cards.forEach((card) => {

    card.addEventListener(
        "mousemove",
        (event) => {

            /*
             * Desativa efeito se usuário
             * preferir menos movimento.
             */

            if (
                window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches
            ) {

                return;

            }


            const rect =
                card.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;


            const y =
                event.clientY -
                rect.top;


            const rotateX =
                ((y / rect.height) - 0.5)
                * -3;


            const rotateY =
                ((x / rect.width) - 0.5)
                * 3;


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

            card.style.transform =
                "";

        }
    );

});


/* =====================================================
   EFEITO TERMINAL
===================================================== */

const terminalTexto =
    document.querySelector(
        ".terminal-text"
    );


if (terminalTexto) {

    const textoOriginal =
        terminalTexto.textContent.trim();


    terminalTexto.textContent =
        "";


    let indice = 0;


    function digitarTerminal() {

        if (
            indice <
            textoOriginal.length
        ) {

            terminalTexto.textContent +=
                textoOriginal.charAt(
                    indice
                );


            indice++;


            setTimeout(
                digitarTerminal,
                45
            );

        }

    }


    setTimeout(
        digitarTerminal,
        600
    );

}


/* =====================================================
   INICIALIZAÇÃO
===================================================== */

atualizarFonte();


console.log(
    "%c ROBÓTICA • TECNOCIÊNCIA • INFORMAÇÃO ",
    "background:#050816;color:#00f0ff;font-size:16px;font-weight:bold;padding:8px;"
);