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

    if($acao == 'cadastro'){
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
            }else{
                $sql = "SELECT COUNT(*) AS total FROM usuario WHERE email = '$email'";
                $busca = mysqli_query($conn, $sql);
	            $result = mysqli_fetch_assoc($busca);
                $string = implode(', ', $result);

    

                if ($result['total'] > 0){
                    echo json_encode("cadastroexiste");
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

    }else if($acao == 'login'){
        $email = filter_var($_REQUEST['usuario'],FILTER_SANITIZE_STRING);
        $senha = filter_var($_REQUEST['senha'],FILTER_SANITIZE_STRING);

        $sql = "SELECT COUNT(*) as total, senha, email, SUBSTRING_INDEX(SUBSTRING_INDEX(nomecompleto, ' ', 1), ' ', -1) AS primeironome, id FROM usuario WHERE email = '$email'";
        $busca = mysqli_query($conn, $sql);
        $result = mysqli_fetch_assoc($busca);

        if($result['total'] == 0){
            echo json_encode("senhaInvalida");
        }else if($result["senha"] == $senha){
            session_start();
		    $_SESSION['usuario'] = $result['primeironome'];
		    $_SESSION['logado'] = 'logado';
            $_SESSION['codigo'] = $result['id'];
            echo json_encode("senhaValida");
        }else{
            echo json_encode("senhaInvalida");
        } 
    }else if($acao == 'esqueciSenha'){
        function gerarSenha($tamanho) {
            $caracteresPermitidos = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@!";
            $senha = "";
            
            for ($i = 0; $i < $tamanho; $i++) {
                $indiceAleatorio = mt_rand(0, strlen($caracteresPermitidos) - 1);
                $senha .= $caracteresPermitidos[$indiceAleatorio];
            }
            
            return $senha;
        }
        $email = filter_var($_REQUEST['email'],FILTER_SANITIZE_STRING);
        $senha = filter_var($_REQUEST['senha'],FILTER_SANITIZE_STRING);

        $sql = "SELECT email FROM usuario WHERE email = '$email' ";
        $busca = mysqli_query($conn, $sql);
        $result = mysqli_fetch_assoc($busca);

        //se o email inserido for o mesmo do cadastro, alterar a senha e mandar por email
        //não consegui implementar o envio de email.
        if($result['email'] == $email){
            $senha = gerarSenha(8);

            $alteracao = "UPDATE usuario SET senha ='$senha' WHERE email = '$email'";
            $erro = mysqli_query($conn,$alteracao);

		    if(!$erro) die(mysqli_error($conn));
	
            $from = "email@precofacil.com.br";
            $to = $email;
            $subject = "Resposta Automática";
            $mensagem = "A sua senha foi alterada para '$senha'. Por motivo de segurança é recomendado a troca de senha.";
            $headers = "From:" . $from;
            echo $from,$to,$subject,$mensagem,$headers;
            
            mail($to,$subject,$mensagem, $headers);
            
                
            echo json_encode("senhaAtualizada");
        }else{
            echo json_encode("senhaAtualizada");
        }
    }else if($acao == "verificarAcesso"){
        session_start();
        if(@$_SESSION['logado'] == "logado"){
            $arrayRetorno = array();
            $arrayRetorno = array(
                'resultado' => $_SESSION['logado'],
                'usuario' => $_SESSION['usuario']

            );
            $retornoArray = json_encode($arrayRetorno);
            echo $retornoArray;
        }else{
            echo json_encode("negativo");
        }
    }else if($acao == "sair"){
        session_start();
        session_destroy();

        echo json_encode("sucesso");
    }
    $conn->close();

?>