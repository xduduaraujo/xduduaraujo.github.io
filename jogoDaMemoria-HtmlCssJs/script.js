document.addEventListener('DOMContentLoaded', () => {
  let casas = document.querySelectorAll('div.casa');


  comecarJogo();

  function comecarJogo() {
    let contador = 0;
    let paresEncontrados = 0;
    let cartasSelecionadas = [];
    let lista = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];

    preencherCartas(lista);

    casas.forEach(function (event) {
      event.addEventListener('click', virarCarta);
    });

    function preencherCartas(lista) {
      lista.sort(() => 0.5 - Math.random());

      casas.forEach((x) => {
        let criarImagem = document.createElement('img');
        criarImagem.id = lista[contador];

        switch (criarImagem.id) {
          case '1':
            criarImagem.src = 'src/img/katarina.png';
            break;
          case '2':
            criarImagem.src = 'src/img/alistar.png';
            break;
          case '3':
            criarImagem.src = 'src/img/leona.png';
            break;
          case '4':
            criarImagem.src = 'src/img/yasuo.png';
            break;
          case '5':
            criarImagem.src = 'src/img/vladimir.png';
            break;
          case '6':
            criarImagem.src = 'src/img/fiora.png';
            break;
          case '7':
            criarImagem.src = 'src/img/ahri.png';
            break;
          case '8':
            criarImagem.src = 'src/img/darius.png';
            break;
        }
        x.appendChild(criarImagem);
        contador++;
      });
    }

    function virarCarta(event) {
      if (event.target.childNodes[0].style.visibility === 'visible') {
        alert('Carta já selecionada');
      } else {
        event.target.style.backgroundImage =
          "url('src/img/cartaSelecionadaBG.jpg')";
        event.target.childNodes[0].style.visibility = 'visible';
        if (!cartasSelecionadas.includes(event)) {
          cartasSelecionadas.push(event);

          if (cartasSelecionadas.length === 2) {
            verificarProximaCarta(cartasSelecionadas);
            cartasSelecionadas = [];
          }
        }
      }
    }

    function verificarProximaCarta(cartasSelecionadas) {
      let imgCarta1 = cartasSelecionadas[0].target.childNodes[0];
      let imgCarta2 = cartasSelecionadas[1].target.childNodes[0];

      if (imgCarta1.id === imgCarta2.id) {
        alert('Par encontrado!');
        paresEncontrados++;
        if (paresEncontrados === 8) {
          zerarOJogo();
          alert('Parabéns você venceu o jogo!');
        }
      } else {
        alert('Carta errada, tente novamente!');
        setTimeout(() => {
          esconderCartasSelecionadas(imgCarta1, imgCarta2);
          cartasSelecionadas[0].target.style.backgroundImage =
            "url('src/img/cartaBg.png')";
          cartasSelecionadas[1].target.style.backgroundImage =
            "url('src/img/cartaBg.png')";
        }, 500);
      }
    }

    function zerarOJogo() {
      casas.forEach((x)  => x.style.backgroundImage = "url('src/img/cartaBg.png')");
      let img = document.querySelectorAll('img');
      img.forEach((x) => x.remove());
      casas.forEach((y) => y.removeEventListener('click', virarCarta));

      comecarJogo();
    }

    function esconderCartasSelecionadas(carta1, carta2) {
      carta1.style.visibility = 'hidden';
      carta2.style.visibility = 'hidden';
    }
  }
});
