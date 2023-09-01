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

    $nomecompleto = filter_var($_REQUEST['nomecompleto'],FILTER_SANITIZE_STRING);
    $cep = filter_var($_REQUEST['cep'],FILTER_SANITIZE_STRING);
    $rua = filter_var($_REQUEST['rua'],FILTER_SANITIZE_STRING);
    $cidade = filter_var($_REQUEST['cidade'],FILTER_SANITIZE_STRING);
    $email = filter_var($_REQUEST['email'],FILTER_SANITIZE_STRING);
	$dtnascimento = @$_REQUEST['dtnascimento'];
    $data = new DateTime($dtnascimento);
	$dataFormatada = $data->format('Y-m-d');
    $numero = filter_var($_REQUEST['numero'],FILTER_SANITIZE_STRING);
	$bairro = filter_var($_REQUEST['bairro'],FILTER_SANITIZE_STRING);
    $senha = filter_var($_REQUEST['senha'],FILTER_SANITIZE_STRING);

    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        if(empty($nomecompleto)){
            echo json_encode("faltanome");
        }else if(empty($cep)){
            echo json_encode("faltacep");

        }else if(!preg_match('/^\d{5}-\d{3}$/', $cep)){
            echo json_encode("cepinvalido");
        }else{
            $sql = "SELECT COUNT(*) AS total FROM usuario WHERE email = '$email'";
            $busca = mysqli_query($conn, $sql);
	        $result = mysqli_fetch_assoc($busca);
            $string = implode(', ', $result);

    

            if ($result['total'] > 0){
                
            }else{
                $sql= "INSERT INTO usuario (nomecompleto, cep, endereco, cidade, email, datanascimento, numero, bairro, senha) VALUES ('$nomecompleto', '$cep', '$rua', '$cidade', '$email', '$dataFormatada', '$numero', '$bairro', '$senha')";

                $erro = mysqli_query($conn,$sql);
		        if(!$erro) die(mysqli_error($conn));
        
                echo json_encode("sucesso");
            }
        }   
            
            
            
        
        

        
    } else {
       // echo '<script>console.log("invalido")</script>'; 
        echo json_encode("invalido");
    }

    
    

    $conn->close();

?>