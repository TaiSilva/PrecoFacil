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
    console.log("Código de barras detectado: " + code);
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
    
    console.log("Código de barras detectado aletrado:" + code);
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



document.addEventListener("DOMContentLoaded", function () {
  u_acao = "ultimasPromo";
  $.ajax({
    url: '../precofacil/src/php/index.php',
    method: 'GET',
    data: { 'acao': u_acao },
    dataType: 'json',
    success: function (retorno) {
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

        if(retorno[i].horas >= 24){
          const dia = (retorno[i].horas/24);
          if(dia == 1){
            spanFilho4.innerHTML = "há " + parseInt(dia) + " dia";
          }else{
            spanFilho4.innerHTML = "há " + parseInt(dia) + " dias";
          }
        }else if (retorno[i].horas != 0) {
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

        var spanFilho5 = document.createElement("span");
        spanFilho5.innerHTML = "1km";
        divColFilho5.appendChild(spanFilho5);
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

        });

        suggestionsDiv.appendChild(suggestion);
      });
    } else {
      console.error("Erro na pesquisa:", status);
    }

    document.addEventListener("click", function (event) {
      if (!suggestionsDiv.contains(event.target) && event.target !== inputSupermercado) {
        // O clique ocorreu fora da lista de sugestões e fora do elemento de entrada
        // Feche a lista de sugestões
        suggestionsDiv.style.display = "none";
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
    })
    .catch(error => {
      // Lide com erros de solicitação
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
      spanCadPromo.textContent = "*";
      spanCadPromo.style.color = "red";
      labelSuper.classList.add("invalido");
      labelSuper.appendChild(spanCadPromo);
      inputSuper.style.border = "1px solid red";
    }

  }else{
    var u_acao = "cadastraPromocao";
    var u_supermercado = inputSuper.value;
    var u_enderecoMercado = document.getElementById("inputEnderecoMercado").value;
  }
  const checkBox = document.getElementById("checkDataPromo");
  if (checkBox.checked == false) {
    const dataInicio = document.getElementById("dataInc");
    const dataFinal = document.getElementById("dataFim");
    if (dataInicio.value == "" || dataFinal.value == "") {
      const vencPromo = document.getElementById("divVencimento");
      if (!vencPromo.classList.contains("invalido")) {
        const spanCadPromo = document.createElement("span");
        spanCadPromo.textContent = "*";
        spanCadPromo.style.color = "red";
        vencPromo.classList.add("invalido");
        vencPromo.appendChild(spanCadPromo);
        dataInicio.style.border = "1px solid red";
        dataFinal.style.border = "1px solid red";
      }
    }else{
      var u_dataInc = dataInicio.value;
      var u_dataFim = dataFinal.value;
    }
  }else{
    var u_dataInc = null;
    var u_dataFim = null;
  }

  const codBarCode = document.getElementById("input-codigodig");
  if (codBarCode.value == "" || codBarCode.value == null) {
    const labelCodigo = document.getElementById("divCodBarra");
    if (!labelCodigo.classList.contains("invalido")) {
      const spanCadPromo = document.createElement("span");
      spanCadPromo.textContent = "*";
      spanCadPromo.style.color = "red";
      labelCodigo.classList.add("invalido");
      labelCodigo.appendChild(spanCadPromo);
      codBarCode.style.border = "1px solid red";
    }

  }else{
    var u_codigoBarCode = codBarCode.value;
    var u_descricaoProd = document.getElementById("input-descricao").value;
    var u_imagemProd = document.getElementById("imgCad").src;
  }

  const valor = document.getElementById("valorPromo");
  if (valor.value == "" || valor.value == null) {
    const labelValor = document.getElementById("divLabelValor");
    if (!labelValor.classList.contains("invalido")) {
      const spanCadPromo = document.createElement("span");
      spanCadPromo.textContent = "*";
      spanCadPromo.style.color = "red";
      labelValor.classList.add("invalido");
      labelValor.appendChild(spanCadPromo);
      valor.style.border = "1px solid red";
    }

  }else{
    var u_valor = valor.value;
  }
  $.ajax({
    url: '../precofacil/src/php/index.php',
    method:'POST',
    data: {'acao': u_acao, 'supermercado': u_supermercado, 'enderecoMercado':u_enderecoMercado,'dataInicio':u_dataInc,'dataFim':u_dataFim,
      'codigoBarras':u_codigoBarCode, 'descricaoProduto':u_descricaoProd, 'imagemProduto':u_imagemProd, 'valorProduto':u_valor},
    dataType:'json',
    success: function(retorno){
       if(retorno == "sucesso"){
          $('#modal-aviso').modal('show');
        }
    },

    error: function(xhr, status, error) {
        console.error("Erro na requisição AJAX login:", error, "xhr", xhr);
    }
});
})
$('body').on('click', '#fecharmodal', function(){
  window.location.href='index.html';
  
});
$('#modalInserirPromocao').on('shown.bs.modal', function () {
  // Obtém o elemento input pelo ID
  var inputElement = document.getElementById("input-codigodig");

  // Define o foco no input
  inputElement.focus();
});
document.getElementById("lerCodeBar").addEventListener("click", function(){
  Quagga.onDetected((result) => {
    var code = result.codeResult.code;
    document.getElementById("input-codigodig").value = code;
    Quagga.stop();
    const modal = document.getElementById("modal-camera");
    modal.style.display = "none";
    $('#modalInserirPromocao').modal('show');
    //console.log("Código de barras detectado aletrado:" + code);
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