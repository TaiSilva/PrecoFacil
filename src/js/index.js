// Incluindo a biblioteca QuaggaJS via CDN
var script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/quagga/0.12.1/quagga.min.js';
document.head.appendChild(script);

const login = document.getElementById('exibirLogin');

login.addEventListener('click', () =>{
   const divLogin = document.getElementById('divLogin');
    if(divLogin.classList.contains('d-none')){
        divLogin.classList.replace('d-none','d-block');
    }else{
        divLogin.classList.replace('d-block','d-none');
    }
})


const eventobotao = document.getElementById('eventobotaocodigo');

eventobotao.addEventListener('click', () =>{
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
          readers: ["ean_reader"], // Exemplo de leitor de código EAN
  
        },
      };
      
      Quagga.init(config, () => {
        
        Quagga.start();
      });         
});

const eventobotaolarge = document.getElementById('criaLeitorCamera');

eventobotaolarge.addEventListener('click', () =>{
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

const fecharModal = document.getElementById('closeCameraBtn');
fecharModal.addEventListener('click', () => {
  Quagga.stop();
})

document.addEventListener("DOMContentLoaded", function() {
  $.ajax({
    url: '../precofacil/src/php/index.php',
    method:'GET',
    data: {},
    dataType:'json',
    success: function(retorno){
        for(var i=0; i<retorno.length; i++ ){
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

          if(retorno[i].horas != 0){
              spanFilho4.innerHTML = "há " + retorno[i].horas + " horas";
          }else{
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

    error: function(xhr, status, error) {
        console.error("Erro na requisição AJAX no index:", error, "xhr", xhr);
    }
});
});