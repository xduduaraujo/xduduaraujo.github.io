document.addEventListener('DOMContentLoaded', () => {
  let casas = document.querySelectorAll('div.casa');
  let contador = 0;
  const player1Simbolo = 'X';
  const player2Simbolo = 'O';
  const casasVencedoras = [
    ['0', '1', '2'],
    ['3', '4', '5'],
    ['6', '7', '8'],
    ['0', '4', '8'],
    ['2', '4', '6'],
    ['0', '3', '6'],
    ['1', '4', '7'],
    ['2', '5', '8'],
  ];

  let casasComX = [];
  let casasComO = [];
  let listaDeChecagensX = []
  let listaDeChecagensO = []
  comecarJogo();

  function verificarGanhador(areasMarcadas) {
    areasMarcadas.forEach((x) => {
      if (x.textContent === 'X' && !casasComX.includes(x.parentNode.id)) {
        let id = x.parentNode.id;
        casasComX.push(`${id}`);
        casasComX.sort();
      } else if (
        x.textContent === 'O' &&
        !casasComO.includes(x.parentNode.id)
      ) {
        let id = x.parentNode.id;
        casasComO.push(id);
        casasComO.sort();
      }
    });

    if (casasComX.length >= 2) {
      let checker = (arr, target) => target.every((v) => arr.includes(v));

      for (i = 0; i < casasVencedoras.length; i++) {
        let checarX = checker(casasComX, casasVencedoras[i]);
        let checarO = checker(casasComO, casasVencedoras[i]);

        if (checarX) {
          alert('Jogador 1 venceu');
          zerarOJogo(areasMarcadas);
        } else if (checarO) {
          alert('Jogador 2 venceu');
          zerarOJogo(areasMarcadas);
        } 

        listaDeChecagensX.push(checarX) 
        listaDeChecagensO.push(checarO) 
      }
        if(contador > 8 && !listaDeChecagensX.includes(true) && !listaDeChecagensO.includes(true)){
          alert('Deu velha');
          zerarOJogo(areasMarcadas);
        }
    }
  }

  function marcar(event) {
    if (contador % 2 == 0) {
      var inserirSimbolo = document.createElement('a');
      inserirSimbolo.style.color = '#FFCBDB';
      inserirSimbolo.innerHTML = player1Simbolo;
    } else {
      var inserirSimbolo = document.createElement('a');
      inserirSimbolo.style.color = '#993399';
      inserirSimbolo.innerHTML = player2Simbolo;
    }
    event.target.appendChild(inserirSimbolo);
    let areasMarcadas = document.querySelectorAll('a');
    contador++;
    setTimeout(() => {
      verificarGanhador(areasMarcadas);
    }, 50);
  }

  function zerarOJogo(areasMarcadas) {
    areasMarcadas.forEach((x) => x.remove());
    casas.forEach((x) => x.removeEventListener('click', marcar));
    contador = 0;
    casasComX = [];
    casasComO = [];
    comecarJogo();
  }

  function comecarJogo() {
    casas.forEach(function (event) {
      event.addEventListener('click', marcar, { once: true });
    });
  }
});
