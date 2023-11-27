<?php

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

    if($acao == "buscarPorCod"){
        $codigoProd = filter_var($_REQUEST['codigo'],FILTER_SANITIZE_STRING);
        $sql = "SELECT TIME_FORMAT(TIMEDIFF(CURRENT_TIMESTAMP, dtinc), '%H') AS horas, TIME_FORMAT(TIMEDIFF(CURRENT_TIMESTAMP, dtinc), '%i') AS minutos, valor, imagem, descricao, supermercado, codigo, latitudemercado, longitudemercado FROM promocao WHERE codigobarras = $codigoProd";
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
            'codigo' => $row['codigo'],
            'latitude' => $row['latitudemercado'],
            'longitude' => $row['longitudemercado']
            );

            array_push($resultadosArray, $resultadoItem);
        }
        $jsonResultados = json_encode($resultadosArray);

        echo $jsonResultados;
    }else if($acao == "buscarPorDesc"){
        $codigoProd = filter_var($_REQUEST['codigo'],FILTER_SANITIZE_STRING);
        $sql = "SELECT TIME_FORMAT(TIMEDIFF(CURRENT_TIMESTAMP, dtinc), '%H') AS horas, TIME_FORMAT(TIMEDIFF(CURRENT_TIMESTAMP, dtinc), '%i') AS minutos, valor, imagem, descricao, supermercado, codigo, latitudemercado, longitudemercado FROM promocao WHERE descricao like '%$codigoProd%'";
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
            'codigo' => $row['codigo'],
            'latitude' => $row['latitudemercado'],
            'longitude' => $row['longitudemercado']
            );

            array_push($resultadosArray, $resultadoItem);
        }
        $jsonResultados = json_encode($resultadosArray);

        echo $jsonResultados;
    }else if($acao == "detalheProd"){
        $codigoProd = filter_var($_REQUEST['codigo'],FILTER_SANITIZE_STRING);
        $sql = "SELECT COUNT(*) AS total, TIME_FORMAT(TIMEDIFF(CURRENT_TIMESTAMP, dtinc), '%H') AS horas, TIME_FORMAT(TIMEDIFF(CURRENT_TIMESTAMP, dtinc), '%i') AS minutos, valor, imagem, descricao, supermercado, enderecomercado, validadeinc, DATE_FORMAT(validadefim, '%d-%m-%y') AS validadefim,
         latitudemercado, longitudemercado FROM promocao WHERE codigo = $codigoProd";
        $busca = mysqli_query($conn, $sql);
        $result = mysqli_fetch_assoc($busca);
        //$string = implode(', ', $result);


        echo json_encode($result);
       /* if ($result['total'] > 0){
            echo json_encode("cadastroexiste");
        }else{
            $sql= "INSERT INTO usuario (nomecompleto, cep, endereco, cidade, email, datanascimento, numero, bairro, senha) VALUES ('$nomecompleto', '$cep', '$rua', '$cidade', '$email', '$dataFormatada', '$numero', '$bairro', '$senha')";

            $erro = mysqli_query($conn,$sql);
            if(!$erro) die(mysqli_error($conn));

            echo json_encode("sucesso");
        }*/
    }else if($acao == "minhaspromocoes"){
        session_start();
        $idusuario = $_SESSION['codigo'];

        $sql = "SELECT descricao, valor, supermercado, DATE_FORMAT(dtinc, '%d-%m-%y') AS dtinc FROM promocao WHERE idusuario = $idusuario";
          $resultado = mysqli_query($conn, $sql);
  
          $resultadosArray = array();
  
          while ($row = mysqli_fetch_assoc($resultado)) {
  
              $resultadoItem = array(
              'descricao' => $row['descricao'],
              'valor' => $row['valor'],
              'supermercado' => $row['supermercado'],
              'dtinc' => $row['dtinc']
              );
  
              array_push($resultadosArray, $resultadoItem);
          }
          echo json_encode($resultadosArray);
    }
?>