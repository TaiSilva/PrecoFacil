// Incluindo a biblioteca QuaggaJS via CDN
var script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/quagga/0.12.1/quagga.min.js';
document.head.appendChild(script);

const login = document.getElementById('exibirLogin');

login.addEventListener('click', () => {
  const divLogin = document.getElementById('divLogin');
  if (divLogin.classList.contains('d-none')) {
    divLogin.classList.replace('d-none', 'd-block');
  } else {
    divLogin.classList.replace('d-block', 'd-none');
  }
})


const eventobotao = document.getElementById('eventobotaocodigo');

eventobotao.addEventListener('click', () => {
  Quagga.onDetected((result) => {
    var code = result.codeResult.code;
    console.log("Código de barras detectado:" + code);
  });

  const config = {
    inputStream: {
      name: "Live",
      type: "LiveStream",
      target: document.querySelector("#barcode-scanner-smart"),
    },
    locator: {
      patchSize: "medium",
      halfSample: true,
    },
    numOfWorkers: navigator.hardwareConcurrency || 4,
    locate: true,
    frequency: 10,
    multiple: false,
    decoder: {
      readers: ["ean_reader"] // Exemplo de leitor de código EAN

    },
  };

  Quagga.init(config, () => {

    Quagga.start();
  });
});

const eventobotaolarge = document.getElementById('criaLeitorCamera');

eventobotaolarge.addEventListener('click', () => {
  Quagga.onDetected((result) => {
    var code = result.codeResult.code;
    var acao = "buscarPorCod";
    Quagga.stop();
    $('#modal-camera').modal('hide');
    ajaxListarPromocao(acao,code);

    console.log("Código de barras detectado tai aletrado:" + code);
  });

  const config = {
    inputStream: {
      name: "Live",
      type: "LiveStream",
      target: document.querySelector("#barcode-scanner-smart"),
    },
    locator: {
      patchSize: "medium",
      halfSample: true,
    },
    numOfWorkers: navigator.hardwareConcurrency || 4,
    locate: true,
    frequency: 10,
    multiple: false,
    decoder: {
      readers: ["ean_reader"], // Exemplo de leitor de código EAN
    },
  };

  Quagga.init(config, () => {

    Quagga.start();
  });
})

document.getElementById("btnBuscarPromoPorDesc").addEventListener("click", function(){
  var code = document.getElementById("inputBuscarPromoPorDesc").value;
  var acao = "buscarPorDesc";

  ajaxListarPromocao(acao, code);

})

function ajaxListarPromocao(acao,code) {
  $.ajax({
    url: '../precofacil/src/php/promocao.php',
    method: 'GET',
    data: {'acao':acao, 'codigo': code },
    dataType: 'json',
    success: function (retorno) {
      if (retorno.length != 0) {
        var conteudoHTML = `
              <div class="row">
                <div class="col-4 mt-3">
                  <hr>
                </div>
                <div class="col-4 promo d-flex justify-content-center mt-3">
                  <h2>
                    Lista de Resultados
                  </h2>
                </div>
                <div class="col-4 mt-3">
                  <hr>
                </div>
              </div>
              <div class="row justify-content-center mb-3" id="rowPromo">
                ${cardListarPromo(retorno)}
              </div>
            </div>  
            `

        //paginaBusca.write(conteudoHTML);
        //paginaBusca.close();
        function cardListarPromo(retorno) {
          var conteudoParteHTML = "";
          for (var i = 0; i < retorno.length; i++) {
            conteudoParteHTML += `
                    <div class="col-lg-4 col-md-3 d-flex justify-content-center mt-3 mx-1 cardIndex">
                     <div class="container">
                       <div class="row mt-2">
                         <div class="col d-flex justify-content-center" style="height:50px">
                           <span>
                             ${retorno[i].supermercado}
                           </span>
                         </div>
                       </div>
                       <div class="row">
                         <img class="mx-auto d-block img-fluid rounded" src="${retorno[i].imagem}" style="max-height:100px; max-width:100px">
                       </div>
                       <div class="row">
                         <div class="col d-flex justify-content-center fw-bold">
                           <span>
                             ${retorno[i].descricao}
                           </span>
                         </div>
                       </div>
                       <div class="row">
                         <div class="col d-flex justify-content-center fw-bold">
                           <span style="color: green;">
                             ${retorno[i].valor}
                           </span>
                         </div>
                       </div>
                       <div class="row mt-3">
                         <div class="col d-flex justify-content-start">
                           <i class="bi bi-clock mx-1">
                           </i>
                           <span>
                             ${buscaDiaHora(retorno[i].horas)}
                           </span>
                         </div>
                         <div class="col d-flex justify-content-end">
                           <i class="bi bi-geo-alt-fill mx-1">
                           </i>
                           <span>
                             "aqui KM"
                           </span>
                         </div>
                       </div>
                     </div>
                   </div>`
          }
          return conteudoParteHTML;
        }
        function buscaDiaHora(horas) {
          if (horas >= 24) {
            const dia = (horas / 24);
            if (dia == 1) {
              return "há " + parseInt(dia) + " dia";
            } else {
              return "há " + parseInt(dia) + " dias";
            }
          } else if (horas != 0) {
            return "há " + horas + " horas";
          }

        }
        document.getElementById("containerUltimasPromo").innerHTML = conteudoHTML;
      } else {
        conteudoHTML = `
          Não encontramos promoções cadastradas para este produto.
        `
        const containerModificar = document.getElementById("containerUltimasPromo");
        containerModificar.innerHTML = conteudoHTML;
        containerModificar.style.color = "#7b7b7b";
      }
    },

    error: function (xhr, status, error) {
      console.error("Erro na requisição AJAX no index:", error, "xhr", xhr);
    }
  });
}

function calcularDistancia(origem, destino, callback) {
  const service = new google.maps.DistanceMatrixService();

  const request = {
      origins: [origem],
      destinations: [destino],
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC,
  };

  service.getDistanceMatrix(request, function (response, status) {
      if (status === 'OK') {
          const distancia = response.rows[0].elements[0].distance.text;
          callback(distancia);
      } else {
          console.error('Erro ao calcular a distância:', status);
          callback(null); // Indicar que houve um erro
      }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  u_acao = "ultimasPromo";
  $.ajax({
      url: '../precofacil/src/php/index.php',
      method: 'GET',
      data: { 'acao': u_acao },
      dataType: 'json',
      success: function (retorno) {
          if ("geolocation" in navigator) {
              navigator.geolocation.getCurrentPosition(function (position) {
                  const userLat = position.coords.latitude;
                  const userLng = position.coords.longitude;

                  // Array para armazenar as promessas de cálculo de distância
                  const promises = [];

                  for (var i = 0; i < retorno.length; i++) {
                      const lati = retorno[i].latitude;
                      const longi = retorno[i].longitude;
                      const origem = `${userLat},${userLng}`;
                      const destino = `${lati},${longi}`;

                      // Função de promessa para calcular a distância
                      function calcularDistanciaPromise() {
                          return new Promise((resolve, reject) => {
                              calcularDistancia(origem, destino, function (distancia) {
                                  resolve(distancia);
                              });
                          });
                      }

                      // Adicione a promessa à matriz de promessas
                      promises.push(calcularDistanciaPromise());
                  }

                  // Use Promise.all para esperar que todas as promessas sejam resolvidas
                  Promise.all(promises)
                      .then(distancias => {
                          for (var i = 0; i < retorno.length; i++) {
                              var divCol = document.createElement("div");
                              divCol.classList.add("col-lg-3");
        divCol.classList.add("col-md-4");
        divCol.classList.add("d-flex");
        divCol.classList.add("justify-content-center");
        divCol.classList.add("mt-3");
        divCol.classList.add("mx-1");
        divCol.classList.add("cardIndex");
        var divRowPai = document.getElementById("rowPromo");
        divRowPai.appendChild(divCol);

        var divContainerFilho = document.createElement("div");
        divContainerFilho.classList.add("container");
        divCol.appendChild(divContainerFilho);

        var divRowFilho = document.createElement("div");
        divRowFilho.classList.add("row");
        divRowFilho.classList.add("mt-2");
        divContainerFilho.append(divRowFilho);
        var divRowFilho2 = document.createElement("div");
        divRowFilho2.classList.add("row");
        divContainerFilho.appendChild(divRowFilho2);
        var divRowFilho3 = document.createElement("div");
        divRowFilho3.classList.add("row");
        divContainerFilho.appendChild(divRowFilho3);
        var divRowFilho4 = document.createElement("div");
        divRowFilho4.classList.add("row");
        divContainerFilho.appendChild(divRowFilho4);
        var divRowFilho5 = document.createElement("div");
        divRowFilho5.classList.add("row");
        divRowFilho5.classList.add("mt-3");
        divContainerFilho.appendChild(divRowFilho5);

        var divColFilho = document.createElement("div");
        divColFilho.classList.add("col");
        divColFilho.classList.add("d-flex");
        divColFilho.classList.add("justify-content-center");
        divColFilho.style.height = "50px";
        divRowFilho.appendChild(divColFilho);

        var spanFilho = document.createElement("span");
        spanFilho.innerHTML = retorno[i].supermercado;
        divColFilho.appendChild(spanFilho);

        var spanFilhoKey = document.createElement("span");
        spanFilhoKey.innerHTML = retorno[i].codigo;
        spanFilhoKey.style.display = "none";
        spanFilhoKey.setAttribute("id","cod");
        divColFilho.appendChild(spanFilhoKey);

        var imgFilho = document.createElement("img");
        imgFilho.classList.add("mx-auto");
        imgFilho.classList.add("d-block");
        imgFilho.classList.add("img-fluid");
        imgFilho.classList.add("rounded");
        imgFilho.src = retorno[i].imagem;
        imgFilho.style.maxHeight = "100px";
        imgFilho.style.maxWidth = "100px";
        divRowFilho2.appendChild(imgFilho);

        var divColFilho2 = document.createElement("div");
        divColFilho2.classList.add("col");
        divColFilho2.classList.add("d-flex");
        divColFilho2.classList.add("justify-content-center");
        divColFilho2.classList.add("fw-bold");
        divRowFilho3.appendChild(divColFilho2);

        var spanFilho2 = document.createElement("span");
        spanFilho2.innerHTML = retorno[i].descricao;
        divColFilho2.appendChild(spanFilho2);

        var divColFilho3 = document.createElement("div");
        divColFilho3.classList.add("col");
        divColFilho3.classList.add("d-flex");
        divColFilho3.classList.add("justify-content-center");
        divColFilho3.classList.add("fw-bold");
        divRowFilho4.appendChild(divColFilho3);
        var spanFilho3 = document.createElement("span");
        spanFilho3.innerHTML = " R$ " + retorno[i].valor;
        spanFilho3.style.color = "green";
        divColFilho3.appendChild(spanFilho3);

        var divColFilho4 = document.createElement("div");
        divColFilho4.classList.add("col");
        divColFilho4.classList.add("d-flex");
        divColFilho4.classList.add("justify-content-start");
        divRowFilho5.appendChild(divColFilho4);
        var icone = document.createElement("i");
        icone.classList.add("bi");
        icone.classList.add("bi-clock");
        icone.classList.add("mx-1");
        divColFilho4.appendChild(icone);
        var spanFilho4 = document.createElement("span");

        if (retorno[i].horas >= 24) {
          const dia = (retorno[i].horas / 24);
          if (dia == 1) {
            spanFilho4.innerHTML = "há " + parseInt(dia) + " dia";
          } else {
            spanFilho4.innerHTML = "há " + parseInt(dia) + " dias";
          }
        } else if (retorno[i].horas != 0) {
          spanFilho4.innerHTML = "há " + retorno[i].horas + " horas";
        } else {
          spanFilho4.innerHTML = "há " + retorno[i].minutos + " minutos";
        }
        divColFilho4.appendChild(spanFilho4);

                              var divColFilho5 = document.createElement("div");
                              divColFilho5.classList.add("col");
                              divColFilho5.classList.add("d-flex");
                              divColFilho5.classList.add("justify-content-end");
                              divRowFilho5.appendChild(divColFilho5);
                              var iconefilho2 = document.createElement("i");
                              iconefilho2.classList.add("bi");
                              iconefilho2.classList.add("bi-geo-alt-fill");
                              iconefilho2.classList.add("mx-1");
                              divColFilho5.appendChild(iconefilho2);

                              var distancia = distancias[i];
                              var spanFilho5 = document.createElement("span");
                              spanFilho5.setAttribute("id","spanDistancia");
                              spanFilho5.innerHTML = distancia;
                              divColFilho5.appendChild(spanFilho5);
                          }
                      })
                      .catch(error => {
                          console.error('Erro ao calcular distâncias:', error);
                      });
              });
          }
      },
      error: function (xhr, status, error) {
          console.error("Erro na requisição AJAX no index:", error, "xhr", xhr);
      }
  });
});


const inputSupermercado = document.getElementById("inputSupermercado");
const suggestionsDiv = document.getElementById("suggestions");

inputSupermercado.addEventListener("input", function () {
  const searchTerm = inputSupermercado.value;
  suggestionsDiv.style.display = "block";
  //const radius = 1; // Raio em metros

  const request = {
    location: new google.maps.LatLng(-29.929542804568474, -51.128405383700205), // Coordenadas de referência
    radius: 20000,
    type: ['supermarket'],
    query: searchTerm,
  };


  const service = new google.maps.places.PlacesService(document.createElement("div")); // Não requer um elemento de mapa

  service.textSearch(request, function (results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      // Limpa o conteúdo das sugestões
      suggestionsDiv.innerHTML = "";

      // Exibe os resultados como sugestões
      results.forEach(function (result) {
        const suggestion = document.createElement("div");
        suggestion.textContent = result.name + " " + result.formatted_address;
        //suggestion.textContent = ;
        suggestion.classList.add("suggestion");

        // Adiciona um evento de clique para preencher o campo de entrada
        suggestion.addEventListener("click", function () {
          inputSupermercado.value = result.name;
          document.getElementById("inputEnderecoMercado").value = result.formatted_address;
          suggestionsDiv.innerHTML = ""; // Limpa as sugestões

          const divLatitude = document.createElement("div");
          divLatitude.style.display = "none";
          divLatitude.setAttribute("id","divLatitudeMercado");
          divLatitude.innerHTML = result.geometry.location.lat();
          const divLongitude = document.createElement("div");
          divLongitude.style.display = "none";
          divLongitude.setAttribute("id","divLongitudeMercado");
          divLongitude.innerHTML = result.geometry.location.lng();
          console.log(result.geometry.location.lat());
          console.log(result.geometry.location.lng());
          document.getElementById("divLabelSuper").appendChild(divLatitude);
          document.getElementById("divLabelSuper").appendChild(divLongitude);

        });

        suggestionsDiv.appendChild(suggestion);
      });
    } else {
      console.error("Erro na pesquisa:", status);
    }

    document.addEventListener("click", function (event) {
      console.log(event);
      if (event.target !== suggestionsDiv && event.target !== inputSupermercado) {
        // Quando o clique for fora, fechar as sugestões
    
        suggestionsDiv.style.display = "none";

        //gostaria de quando for clicado fora das sugestões sem ter selecionado nenhuma das opções, limpar
        //o input. Porém quando clico fora está limpando até quando eu seleciona, portanto retirei a opção abaixo
        //inputSupermercado.value = "";
      }
    });

  });
});

document.getElementById("input-codigodig").addEventListener("blur", function () {

  var codigoean = document.getElementById("input-codigodig").value;
  const apiUrl = "https://api.cosmos.bluesoft.com.br/gtins/" + codigoean + ".json";

  // Token de autenticação
  const authToken = "8bgYANVhQ8-o8O1X7m9rbg";

  // Configuração da solicitação
  const axiosConfig = {
    headers: {
      "Content-Type": "application/json",
      "X-Cosmos-Token": authToken,
    },
    // Se necessário, desative a verificação SSL (não recomendado em produção)
    // httpsAgent: new https.Agent({ rejectUnauthorized: false }),
  };

  // Faça a solicitação GET para a API Cosmos
  axios.get(apiUrl, axiosConfig)
    .then(response => {
      // Faça algo com os dados recebidos da API (response.data)
      console.log(response.data);
      //console.log(document.getElementById("input-descricao").textContent);
      document.getElementById("input-descricao").value = response.data.description;
      var imgProduto = document.getElementById("imgCad");
      imgProduto.src = response.data.thumbnail;
      imgProduto.classList.add("mt-0");
      imgProduto.style.maxHeight = "150px";
      imgProduto.style.maxWidth = "150px";
      document.getElementById("input-descricao").disabled = true;
      if(document.getElementById("divInput-codigodig").classList.contains("invalido")){
        document.getElementById("labelCodigoDig").style.display = "none";
      }
    })
    .catch(error => {
      // Lide com erros de solicitação
      if(!document.getElementById("input-codigodig").value == ""){
        console.log(document.getElementById("input-codigodig").value);
      const divCodigoDig = document.getElementById("divInput-codigodig");
      if(!divCodigoDig.classList.contains("invalidoCodigo")){
        const labelCodigodig = document.createElement("label");
        labelCodigodig.setAttribute("id","labelCodigoDig");
        labelCodigodig.style.color = "red";
        labelCodigodig.innerHTML = "Código de barra incorreto. Realize a leitura novamente.";
        divCodigoDig.appendChild(labelCodigodig);
        divCodigoDig.classList.add("invalidoCodigo");
        
      }

      }else{
        document.getElementById("labelCodigoDig").style.display = "none";

      }
      
      console.error("Erro: " + error);
    });

});

const checkBox = document.getElementById("checkDataPromo");
checkBox.addEventListener("change", function () {
  var dataInicio = document.getElementById("dataInc");
  var dataFinal = document.getElementById("dataFim");
  if (checkBox.checked) {
    dataInicio.disabled = true;
    dataFinal.disabled = true;
  } else {
    dataInicio.disabled = false;
    dataFinal.disabled = false;
  }
})

document.getElementById("btnCadPromo").addEventListener("click", function () {
  const inputSuper = document.getElementById("inputSupermercado");
  if (inputSuper.value == "" || inputSuper.value == null) {
    const labelSuper = document.getElementById("divLabelSuper");
    if (!labelSuper.classList.contains("invalido")) {
      var spanCadPromo = document.createElement("span");
      spanCadPromo.setAttribute("id","spanSupermercadoCad");
      spanCadPromo.textContent = "*";
      spanCadPromo.style.color = "red";
      labelSuper.classList.add("invalido");
      labelSuper.appendChild(spanCadPromo);
      inputSuper.style.border = "1px solid red";
    }

  } else {
    var u_acao = "cadastraPromocao";
    var u_supermercado = inputSuper.value;
    var u_enderecoMercado = document.getElementById("inputEnderecoMercado").value;    
  }
  const checkBox = document.getElementById("checkDataPromo");
  if (checkBox.checked == false) {
    const dataInicio = document.getElementById("dataInc");
    const dataFinal = document.getElementById("dataFim");
    console.log(dataInicio.value);
    if (dataInicio.value == "" || dataFinal.value == "") {
      const vencPromo = document.getElementById("divVencimento");
      if (!vencPromo.classList.contains("invalido")) {
        const spanCadPromo = document.createElement("span");
        spanCadPromo.setAttribute("id","spanDataIncFimCad");
        spanCadPromo.textContent = "*";
        spanCadPromo.style.color = "red";
        vencPromo.classList.add("invalido");
        vencPromo.appendChild(spanCadPromo);

        if(dataInicio.value == "" && dataFinal.value != ""){
          dataInicio.style.border = "1px solid red";
        }else if(dataInicio.value != "" && dataFinal.value == ""){
          dataFinal.style.border = "1px solid red";
        }else{
          dataFinal.style.border = "1px solid red";
          dataInicio.style.border = "1px solid red";
        }
        
      }
    } else {
      var u_dataInc = dataInicio.value;
    }
  } else {
    var u_naoInformar = true;
    var u_dataInc = null;
    var u_dataFim = null;
  }

  const codBarCode = document.getElementById("input-codigodig");
  if (codBarCode.value == "" || codBarCode.value == null) {
    const labelCodigo = document.getElementById("divCodBarra");
    if (!labelCodigo.classList.contains("invalido")) {
      const spanCadPromo = document.createElement("span");
      spanCadPromo.setAttribute("id","spanCodBarraCad");
      spanCadPromo.textContent = "*";
      spanCadPromo.style.color = "red";
      labelCodigo.classList.add("invalido");
      labelCodigo.appendChild(spanCadPromo);
      codBarCode.style.border = "1px solid red";
    }

  } else {
    var u_codigoBarCode = codBarCode.value;
    var u_descricaoProd = document.getElementById("input-descricao").value;
    var u_imagemProd = document.getElementById("imgCad").src;
  }

  const valor = document.getElementById("valorPromo");
  if (valor.value == "" || valor.value == 0.00) {
    console.log(valor.value);
    const labelValor = document.getElementById("divLabelValor");
    if (!labelValor.classList.contains("invalido")) {
      const spanCadPromo = document.createElement("span");
      spanCadPromo.setAttribute("id","spanValorCad");
      spanCadPromo.textContent = "*";
      spanCadPromo.style.color = "red";
      labelValor.classList.add("invalido");
      labelValor.appendChild(spanCadPromo);
      valor.style.border = "1px solid red";
    }

  } else {
    var u_valor = valor.value;
  }
  u_lat = document.getElementById("divLatitudeMercado").textContent;
  u_long = document.getElementById("divLongitudeMercado").textContent;

  if(u_valor != null && u_codigoBarCode != null && (u_dataInc != null || (u_dataInc == null && u_naoInformar == true))){
    console.log("entrou ajax");
    $.ajax({
      url: '../precofacil/src/php/index.php',
      method: 'POST',
      data: {
        'acao': u_acao, 'supermercado': u_supermercado, 'enderecoMercado': u_enderecoMercado, 'latitude': u_lat, 'longitude': u_long, 'dataInicio': u_dataInc, 'dataFim': u_dataFim,
        'codigoBarras': u_codigoBarCode, 'descricaoProduto': u_descricaoProd, 'imagemProduto': u_imagemProd, 'valorProduto': u_valor
      },
      dataType: 'json',
      success: function (retorno) {
        if (retorno == "sucesso") {
          $('#modal-aviso').modal('show');
        }
      },
  
      error: function (xhr, status, error) {
        console.error("Erro na requisição AJAX Cadastro Promocao:", error, "xhr", xhr);
      }
    });
  }
  
})
$('body').on('click', '#fecharmodal', function () {
  window.location.href = 'index.html';

});
$('#modalInserirPromocao').on('shown.bs.modal', function () {
  // Obtém o elemento input pelo ID
  var inputElement = document.getElementById("input-codigodig");

  // Define o foco no input
  inputElement.focus();
});
document.getElementById("lerCodeBar").addEventListener("click", function () {
  Quagga.onDetected((result) => {
    var code = result.codeResult.code;
    document.getElementById("input-codigodig").value = code;
    Quagga.stop();
    const modal = document.getElementById("modal-cameraCad");
    modal.style.display = "none";
    $('#modalInserirPromocao').modal('show');
    // Encontre a div com a classe 'modal-backdrop'
    var modalBackdrop = document.querySelector('.modal-backdrop');

    if (modalBackdrop) {
      modalBackdrop.parentNode.removeChild(modalBackdrop);
    }

    //console.log("Código de barras detectado aletrado:" + code);
  });

  const config = {
    inputStream: {
      name: "Live",
      type: "LiveStream",
      target: document.querySelector("#barcode-scanner-cadastro"),
    },
    locator: {
      patchSize: "medium",
      halfSample: true,
    },
    numOfWorkers: navigator.hardwareConcurrency || 4,
    locate: true,
    frequency: 10,
    multiple: false,
    decoder: {
      readers: ["ean_reader"], // Exemplo de leitor de código EAN
    },
  };

  Quagga.init(config, () => {

    Quagga.start();
  });
})

document.addEventListener("DOMContentLoaded", function () {
  u_acao = "verificarAcesso";
  $.ajax({
    url: '../precofacil/src/php/cadastrocliente.php',
    method: 'GET',
    data: { 'acao': u_acao},
    dataType: 'json',
    success: function (retorno) {
      if(retorno['resultado'] == "logado"){
        const spanOla = document.createElement("span");
        spanOla.innerHTML = "Olá, " + retorno.usuario;
        const divOla = document.getElementById("spanNomeUsuario");
        divOla.appendChild(spanOla);
        divOla.style.display = "block";
        document.getElementById("Entrar").style.display = "none";
        document.getElementById("Sair").style.display = "block";
      }else{
        document.getElementById("Sair").style.display = "none";
      }
      //no index js chamar o cadastrocliente php passando acao como verificasessao e verificar se está logado
      // e apos criar o ola fulano no index html.

    },

    error: function (xhr, status, error) {
      console.error("Erro na requisição AJAX no Sair:", error, "xhr", xhr);
    }
  });
})


document.getElementById('Sair').addEventListener("click", function(){
  const u_acao = "sair";
  $.ajax({
    url: '../precofacil/src/php/cadastrocliente.php',
    method: 'GET',
    data: { 'acao': u_acao},
    dataType: 'json',
    success: function (retorno) {
      if(retorno == "sucesso"){
        window.location.href = "index.html";
      }
     
    },

    error: function (xhr, status, error) {
      console.error("Erro na requisição AJAX no index:", error, "xhr", xhr);
    }
  });
})

document.getElementById('btnInserirPromoGrande').addEventListener("click", function(){
  u_acao = "verificarAcesso";
  $.ajax({
    url: '../precofacil/src/php/cadastrocliente.php',
    method: 'GET',
    data: { 'acao': u_acao},
    dataType: 'json',
    success: function (retorno) {
      console.log(retorno);
      if(retorno == "negativo"){
        alert("Favor realizar login");
        $('#modalInserirPromocao').modal('dispose');
        window.location.href = "login.html";
      }
     
    },

    error: function (xhr, status, error) {
      console.error("Erro na requisição AJAX no Verificar Login:", error, "xhr", xhr);
    }
  });
 
})

$('#rowPromo').on('click', '.cardIndex', function() {
  var codElement = $(this).find('#cod');
  var codValue = codElement.text();
  console.log('Código:', codValue);
  const varDistancia = document.getElementById("spanDistancia").textContent
  window.location.href = 'detalheProduto.html?codigo=' + codValue;
});

document.getElementById("inputSupermercado").addEventListener("blur", function(){
  const inputSuperCad = document.getElementById("inputSupermercado");
  const spanSupermercadoCad = document.getElementById("spanSupermercadoCad");
  if(!inputSuperCad.value == ""){
    inputSuperCad.style.border = "";
    spanSupermercadoCad.textContent = spanSupermercadoCad.textContent.replace("*","");
  }else{
    inputSuperCad.style.border = "1px solid red";
    document.getElementById("inputEnderecoMercado").value = "";
  }
})
document.getElementById("dataInc").addEventListener("blur", function(){
  const dataInc = document.getElementById("dataInc");
  const spanDataIncFimCad = document.getElementById("spanDataIncFimCad");
  if(!dataInc.value == ""){
    dataInc.style.border = "";
    spanDataIncFimCad.textContent = spanDataIncFimCad.textContent.replace("*","");
  }
})
document.getElementById("dataFim").addEventListener("blur", function(){
  const dataFim = document.getElementById("dataFim");
  const spanDataIncFimCad = document.getElementById("spanDataIncFimCad");

  if(!dataFim.value == ""){
    dataFim.style.border = "";
    spanDataIncFimCad.textContent = spanDataIncFimCad.textContent.replace("*","");

  }
})

const checkDataPromo = document.getElementById("checkDataPromo");
checkDataPromo.addEventListener("click",function(){
  if (checkDataPromo.checked == true) {
    const dataInc = document.getElementById("dataInc");
    const dataFim = document.getElementById("dataFim");
    const spanDataIncFimCad = document.getElementById("spanDataIncFimCad");
    dataInc.style.border = "";
    dataFim.style.border = "";
    spanDataIncFimCad.textContent = spanDataIncFimCad.textContent.replace("*","");
  }else{
    if(dataInc.value == "" || dataFim.value == ""){
      dataInc.style.border = "1px solid red";
      dataFim.style.border = "1px solid red";
    }
  }
})

document.getElementById("input-codigodig").addEventListener("blur", function(){
  const codigodig = document.getElementById("input-codigodig");
  const spanCodBarraCad = document.getElementById("spanCodBarraCad");

  if(!codigodig.value == ""){
    codigodig.style.border = "";
    spanCodBarraCad.textContent = spanCodBarraCad.textContent.replace("*","");

  }else{
    codigodig.style.border = "1px solid red";
    document.getElementById("input-descricao").value = "";
    document.getElementById("imgCad").src = "";
  }
})

document.getElementById("valorPromo").addEventListener("blur", function(){
  const valorPromo = document.getElementById("valorPromo");
  const spanValorCad = document.getElementById("spanValorCad");

  if(!valorPromo.value == ""){
    valorPromo.style.border = "";
    spanValorCad.textContent = spanValorCad.textContent.replace("*","");

  }else{
    valorPromo.style.border = "1px solid red";
  }
})

document.getElementById("closeCameraBtn").addEventListener("click", function(){
  Quagga.stop();
})