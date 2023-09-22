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