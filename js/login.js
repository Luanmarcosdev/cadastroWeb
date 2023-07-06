const formulario = document.querySelector("form")
const tabela = document.querySelector("table")
const outErro = document.querySelector("#outErro")

//funcao

function loginUsuario(indice){
    if(localStorage.getItem("loginUsuario")){
        //obtem dados
        const lista = localStorage.getItem("loginUsuario") + ";" + indice
        //atualiza dados
        localStorage.setItem("loginUsuario", lista)
    }
    else{
        localStorage.setItem("loginUsuario", indice)
    }
}

//eventos

formulario.addEventListener("submit", (e) => {

    e.preventDefault()

    const email = formulario.inEmail.value
    const senha = formulario.inSenha.value

    // executa primeiras validacoes
    if(!email.includes("@") || !email.includes(".com")){
        alert(`E-mail invalido`)
        return
    }

    if(!localStorage.getItem("cnpj")){
        alert(`Nenhum há estabelecimentos cadastrados nesse sistema.`)
        formulario.reset()
        formulario.inEmail.focus()
        return
    }

    // obtem dados do local storage e os coloca em um vetor

    const vetorEmail = localStorage.getItem("email").split(";")
    const vetorSenha = localStorage.getItem("senha").split(";")

    // verifica se e-mail informado esta cadastrado no sistema
    
    if(!vetorEmail.includes(email)){
        outErro.innerText = `E-mail não cadastrado no sistema, verifique seu email ou cadastre-se`
        return
    }

    //obtem indice do usuario para acessar dados do cliente cadastrado

    const indice = vetorEmail.indexOf(email)
    const senhaCliente = vetorSenha[indice]

    // verifica se senha cadastrada é igual a informada
    if(senhaCliente != senha){
        outErro.innerText = '* Senha incorreta.'
        return
    }
    else{
        loginUsuario(indice)
        window.location.href = './painel.html' //direciona o usuario para o painel
    }
})  

