<?php
   // header('Content-Type: application/json');

       $servername = "localhost"; // Nome do servidor MySQL
       $username = "root"; // Nome de usuário do banco de dados
       $password = ""; // Senha do banco de dados
       $dbname = "precofacil"; // Nome do banco de dados
   
       // Cria a conexão
       $conn = new mysqli($servername, $username, $password, $dbname);
   
       // Verifica a conexão
       if ($conn->connect_error) {
           die("Conexão falhou: " . $conn->connect_error);
       }

    $acao = $_REQUEST['acao'];

    if($acao == "ultimasPromo"){
    $sql = "SELECT TIME_FORMAT(TIMEDIFF(CURRENT_TIMESTAMP, dtinc), '%H') AS horas, TIME_FORMAT(TIMEDIFF(CURRENT_TIMESTAMP, dtinc), '%i') AS minutos, valor, imagem, descricao, supermercado, codigo FROM promocao ORDER BY dtinc LIMIT 9";
      // Faça a consulta SQL e obtenha os resultados.
    $resultado = mysqli_query($conn, $sql);

    // Inicialize um array para armazenar os resultados.
    $resultadosArray = array();

    while ($row = mysqli_fetch_assoc($resultado)) {
      // Converta as horas e minutos em inteiros.
      $horas = intval($row['horas']);
      $minutos = intval($row['minutos']);

      // Adicione os valores ao array de resultados.
      $resultadoItem = array(
        'horas' => $horas,
        'minutos' => $minutos,
        'descricao' => $row['descricao'],
        'valor' => $row['valor'],
        'imagem' => $row['imagem'],
        'supermercado' => $row['supermercado'],
        'codigo' => $row['codigo']
    );

  array_push($resultadosArray, $resultadoItem);
}
$jsonResultados = json_encode($resultadosArray);

// Envie o JSON para o JavaScript.
echo $jsonResultados;
    }
       


if($acao == 'cadastraPromocao'){
  $nomeMercado = filter_var($_REQUEST['supermercado'],FILTER_SANITIZE_STRING);
  $endereco = filter_var($_REQUEST['enderecoMercado'],FILTER_SANITIZE_STRING);
  $dataInc = filter_var($_REQUEST['dataInicio'],FILTER_SANITIZE_STRING);
  $dataFim = filter_var($_REQUEST['dataFim'],FILTER_SANITIZE_STRING);
  $codigoBarras = filter_var($_REQUEST['codigoBarras'],FILTER_SANITIZE_STRING);
  $descProduto = filter_var($_REQUEST['descricaoProduto'],FILTER_SANITIZE_STRING);
  $imgProduto = filter_var($_REQUEST['imagemProduto'],FILTER_SANITIZE_STRING);
  $valor = filter_var($_REQUEST['valorProduto'],FILTER_SANITIZE_STRING);

  $sql = "INSERT INTO promocao (imagem, valor, descricao, supermercado, enderecomercado, validadeinc, validadefim, codigobarras) VALUES ('$imgProduto', '$valor', '$descProduto', '$nomeMercado', '$endereco', '$dataInc', '$dataFim', '$codigoBarras')";
  $erro = mysqli_query($conn,$sql);
	if(!$erro) die(mysqli_error($conn));

  echo json_encode("sucesso");
}
?>