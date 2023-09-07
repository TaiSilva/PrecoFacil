const senha = document.getElementById("senha");
const mostrarsenha = document.getElementById("mostrarSenha");

let senhaVisivel = false;

mostrarsenha.addEventListener("click", function(){
    senhaVisivel = !senhaVisivel;

    if(senhaVisivel){
        senha.type = "text";
        mostrarsenha.innerHTML = '<i id="mostrarSenha" class="bi bi-eye-slash-fill"></i>';
    }else{
        senha.type = "password";
        mostrarsenha.innerHTML = '<i id="mostrarSenha" class="bi bi-eye-fill"></i>';
    }
});

document.getElementById("cadastrousuario-cep").addEventListener("blur", function() {
    const cep = document.getElementById("cadastrousuario-cep").value;
  
    
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => response.json())
      .then((data) => {
        if (!data.erro) {
          document.getElementById("cadastrousuario-rua").value = data.logradouro;
          document.getElementById("cadastrousuario-bairro").value = data.bairro;
          document.getElementById("cadastrousuario-cidade").value = data.localidade;
        } else {
          alert("CEP não encontrado.");
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar CEP:", error);
      });
  });
  
const botaoCadastrarCliente = document.getElementById("botaoCadastrar");
botaoCadastrarCliente.addEventListener("click", function(){
    
    var u_nome = document.getElementById("cadastrousuario-nome").value;
    var u_cep = document.getElementById("cadastrousuario-cep").value;
    var u_rua = document.getElementById("cadastrousuario-rua").value;
    var u_cidade = document.getElementById("cadastrousuario-cidade").value;
    var u_email = document.getElementById("cadastrousuario-email").value;
    var u_dtnascimento = document.getElementById("cadastrousuario-dtnascimento").value;
    var u_numero = document.getElementById("cadastrousuario-numero").value;
    var u_bairro = document.getElementById("cadastrousuario-bairro").value;
    var u_senha = document.getElementById("cadastrousuario-senha").value;

    $.ajax({
        url: '../precofacil/src/php/cadastrocliente.php',
        method:'POST',
        data: {'nomecompleto':u_nome, 'cep':u_cep, 'rua':u_rua, 'cidade':u_cidade, 'email':u_email, 'dtnascimento':u_dtnascimento, 'numero':u_numero, 'bairro':u_bairro, 'senha':u_senha},
        dataType:'json',
        success: function(texto) {            
            if(texto == 'sucesso'){
                $('#modal-aviso').modal('show');
                
            }else if(texto == "cadastroexiste"){
                alert("Cadastro já existe, favor realizar o login");

            }else if(texto == "invalido"){
                const minhaDiv = document.getElementById("divEmail");                // Definir o ID e as classes do label
                //labelElement.id = "meuLabel";
                if (minhaDiv.classList.contains("invalido")) {
                    
                }else{
                    var labelElement = document.createElement("label");
                    labelElement.classList.add("labelvermelho");
                    labelElement.style.color = "red";
                    //labelElement.className = "labelvermelho";

                    // Definir o texto do label
                    labelElement.textContent = "Forneça um e-mail válido";

                    minhaDiv.classList.add("invalido");
                    minhaDiv.appendChild(labelElement);
                }
                
            }else if(texto == "faltanome"){
                const minhaDiv = document.getElementById("nomecadastro");                // Definir o ID e as classes do label
                //labelElement.id = "meuLabel";
                if (minhaDiv.classList.contains("invalido")) {
                    
                }else{
                    var labelElement = document.createElement("label");
                    labelElement.classList.add("labelvermelho");
                    labelElement.style.color = "red";
                    //labelElement.className = "labelvermelho";

                    // Definir o texto do label
                    labelElement.textContent = "Forneça um nome válido";

                    minhaDiv.classList.add("invalido");
                    minhaDiv.appendChild(labelElement);
                }
            }else if(texto == "faltacep"){
                const minhaDiv = document.getElementById("cepcadastro");    
                
                if (minhaDiv.classList.contains("invalido")) {
                    
                }else{
                    var labelElement = document.createElement("label");
                    labelElement.classList.add("labelvermelho");
                    labelElement.style.color = "red";
                    //labelElement.className = "labelvermelho";

                    // Definir o texto do label
                    labelElement.textContent = "Forneça um cep válido";

                    minhaDiv.classList.add("invalido");
                    minhaDiv.appendChild(labelElement);
                }
            };
        },
        error: function(xhr, status, error) {
            console.error("Erro na requisição AJAX:", error, "xhr", xhr);
        }

        
    });
});

//Fazer recarregar página ao fechar modal
$('body').on('click', '#fecharmodal', function(){
    window.location.href='login.html';
    
});

/*$('form').on('click', '#botaoCadastrar', function(){
    console.log("Entrou");
    var u_nome = document.getElementById("cadastrousuario-nome").value;
    var u_cep = document.getElementById("cadastrousuario-cep").value;
    var u_rua = document.getElementById("cadastrousuario-rua").value;
    var u_cidade = document.getElementById("cadastrousuario-cidade").value;
    var u_email = document.getElementById("cadastrousuario-email").value;
    var u_dtnascimento = document.getElementById("cadastrousuario-dtnascimento").value;
    var u_numero = document.getElementById("cadastrousuario-numero").value;
    var u_bairro = document.getElementById("cadastrousuario-bairro").value;
    var u_senha = document.getElementById("cadastrousuario-senha").value;
    
    
        $.ajax({
            url: 'cadastrocliente.php',
            method:'POST',
            data: {'nomecompleto':u_nome, 'cep':u_cep, 'rua':u_rua, 'cidade':u_cidade, 'email':u_email, 'dtnascimento':u_dtnascimento, 'numero':u_numero, 'bairro':u_bairro, 'senha':u_senha},
            dataType:'json',
            success: function(texto) { 
                
                if(texto == 'sucesso'){
                    
                    $("#modal-aviso").modal({
                        show: true
                    });
                    
                    
                };
            }
        }); 
            
});
//Fazer recarregar página ao fechar modal
$('body').on('click', '#botaofecharmodal', function(e){
    e.preventDefault();
    window.location.href='login.html';
    
});*/