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
});
const codigobarras = document.getElementById('barcode-scanner');

codigobarras.addEventListener('click', () =>{
    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.querySelector("#barcode-scanner"),
            constraints: {
                facingMode: "environment"
            }
        },
        decoder: {
            readers: ["ean_reader"]
        }
    }, function(err) {
        if (err) {
            console.error(err);
            return;
        }
    });
});

const codigobarrassmart = document.getElementById('barcode-scanner-smart');
const eventobotao = document.getElementById('eventobotaocodigo');

eventobotao.addEventListener('click', () =>{
    const resultHandler = (result) => {
  const code = result.codeResult && result.codeResult.code;
  if (code) {
    console.log("Código de barras detectado:", code);
    // Realize ações com base no código de barras detectado
  }
};
      
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
          resultHandler: resultHandler,
        },
      };
      
      Quagga.init(config, () => {
        
        Quagga.start();
      });
      
      
            
});

  