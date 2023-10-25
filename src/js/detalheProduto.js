const urlParams = new URLSearchParams(window.location.search);
const codigo = urlParams.get('codigo'); // Valor de 'codigo'
var u_acao = "detalheProd";
$.ajax({
    url: '../precofacil/src/php/promocao.php',
    method: 'GET',
    data: { 'acao': u_acao, 'codigo': codigo },
    dataType: 'json',
    success: function (retorno) {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;

                // Função para calcular a distância
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
                const lati = retorno.latitudemercado;
                const longi = retorno.longitudemercado;
                const origem = `${userLat},${userLng}`;
                const destino = `${lati},${longi}`;

                calcularDistancia(origem,destino, function (distancia) {
                    const elementoHtml = `
                    <div class="col-12 d-flex justify-content-center mt-5">
                        <img src="${retorno.imagem}" style="max-height:200px; max-width:200px">
                    </div>
                    <div class="row m-0 mt-5 descricaoDetalhe d-flex align-items-center fw-bold" style="height: auto;">
                        <div class="col-4 d-flex justify-content-start">
                            <i class="bi bi-plus-slash-minus mx-1"></i>
                            <label for="">${distancia}</label>
                        </div>
                        <div class="col-4 d-flex justify-content-center" id="divDescricao">
                            ${retorno.descricao}
                        </div>
                        <div class="col-4 d-flex justify-content-end" style="color: green; id="divValor">
                            R$ ${retorno.valor}
                        </div>
                    </div>
                    <div class="row mt-5">
                        <div class="col-12 d-flex justify-content-center" id="divSupermercado">
                            ${retorno.supermercado}
                        </div>
                        <div class="col-12 d-flex justify-content-center" id="divEndereco">
                            ${retorno.enderecomercado}
                        </div>
                        <div class="col-12 d-flex justify-content-center" div="divValidade">
                            Validade da promoção: ${buscaData(retorno)}
                        </div>
                    </div>
                    `
                    function buscaData(dado) {
                        if (dado.validadefim == '00-00-00' || dado.validadefim == null) {
                            return "Não informado"
                        } else {
                            return dado.validadefim
                        }
                    }
                    document.getElementById("ContainerDetalhePromo").innerHTML = elementoHtml;
                });
            });
        }
    },

    error: function (xhr, status, error) {
        console.error("Erro na requisição AJAX no Verificar Login:", error, "xhr", xhr);
    }
});

document.getElementById("compartilhar").addEventListener("click", function () {
    // Verifica se o navegador oferece suporte ao atributo navigator.share
    if (navigator.share) {
        const productName = document.getElementById("divDescricao");
        const productURL = window.location.href;

        const shareData = {
            title: 'Confira esta incrível promoção',
            text: productName,
            url: productURL,
        };

        navigator.share(shareData)
            .then(() => {
                console.log('Conteúdo compartilhado com sucesso.');
            })
            .catch((error) => {
                console.error('Erro ao compartilhar o conteúdo:', error);
            });
    } else {
        // Se o navegador não suportar navigator.share, você pode fornecer uma alternativa
        console.log(window.location.href);
    }

})

document.getElementById("btnMapa").addEventListener("click", function () {
    const enderecoFormatado = (document.getElementById("divEndereco").textContent).split(' ').join('+');
    const urlGoogleMaps = `https://www.google.com/maps?q=${document.getElementById("divSupermercado").textContent + enderecoFormatado}`;

    // Abra a URL no navegador
    window.open(urlGoogleMaps, '_blank');
})

document.getElementById("iconeVoltar").addEventListener("click", function () {
    // Use a função window.history.back() para voltar para a página anterior
    window.history.back();
});