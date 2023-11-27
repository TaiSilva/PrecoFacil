document.addEventListener("DOMContentLoaded", function () {
    u_acao = "minhaspromocoes";
    $.ajax({
        url: '../precofacil/src/php/promocao.php',
        method: 'GET',
        data: { 'acao': u_acao },
        dataType: 'json',
        success: function (retorno) {
            var elementoHtml;

            elementoHtml = `
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Descrição</th>
                        <th scope="col">Valor</th>
                        <th scope="col">Supermercado</th>
                        <th scope="col">Data inclusão</th>
                    </tr>
                </thead>
            ` 
            for(var i = 0; i < retorno.length; i++){
                elementoHtml += `
              <tbody>
                <tr>
                  <th scope="row">${[i+1]}</th>
                  <td>${retorno[i].descricao}</td>
                  <td>${retorno[i].valor}</td>
                  <td>${retorno[i].supermercado}</td>
                  <td>${retorno[i].dtinc}</td>
                </tr>
              </tbody>
                `
            }
            document.getElementById('tablepromocaousuario').innerHTML = elementoHtml;
        },
        error: function (xhr, status, error) {
            console.error("Erro na requisição AJAX no minhas promoções:", error, "xhr", xhr);
        }
    });
  });

  document.getElementById("ArrowVoltar").addEventListener("click", function () {
    // Use a função window.history.back() para voltar para a página anterior
    window.history.back();
});