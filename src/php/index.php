<?php
    header('Content-Type: application/json');

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

       $sql = "SELECT TIME_FORMAT(TIMEDIFF(CURRENT_TIMESTAMP, dtinc), '%H') AS horas, TIME_FORMAT(TIMEDIFF(CURRENT_TIMESTAMP, dtinc), '%i') AS minutos, valor, imagem, descricao, supermercado FROM promocao WHERE DATE_FORMAT(dtinc, '%Y-%m-%d') BETWEEN (CURRENT_DATE - 9) AND CURRENT_DATE";
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
        'supermercado' => $row['supermercado']
    );

    array_push($resultadosArray, $resultadoItem);
}

// Converta o array de resultados em JSON.
$jsonResultados = json_encode($resultadosArray);

// Envie o JSON para o JavaScript.
echo $jsonResultados;

// Feche a conexão com o banco de dados

//conexão api do código de barras
/*$url = 'https://api.cosmos.bluesoft.com.br/gtins/7891910000197.json';
      $agent = 'Cosmos-API-Request';
      $headers = array(
        "Content-Type: application/json",
        "X-Cosmos-Token: 8bgYANVhQ8-o8O1X7m9rbg"
      );

      $curl = curl_init($url);
      curl_setopt($curl, CURLOPT_USERAGENT, $agent);
      curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
      curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
      curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
      curl_setopt($curl, CURLOPT_FAILONERROR, true);

      $data = curl_exec($curl);
      if ($data === false || $data == NULL) {
        var_dump(curl_error($curl));
      } else {
        $object = json_decode($data);

        echo "<script>console.log($data)</script>";
      }

      curl_close($curl);*/

    $conn->close();
        //echo "<script>console.log($result)</script>";
?>