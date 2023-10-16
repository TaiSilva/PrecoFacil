const eventobotaolarge = document.getElementById('btnPesquisaCodBarras-listarPromo');

eventobotaolarge.addEventListener('click', () => {
  Quagga.onDetected((result) => {
    var code = result.codeResult.code;

    console.log("Código de barras detectado aletrado:" + code);
  });

  const config = {
    inputStream: {
      name: "Live",
      type: "LiveStream",
      target: document.querySelector("#barcode-scanner-smart-listarPromo"),
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
