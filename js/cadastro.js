const formulario = document.querySelector("form")

//funcoes
function validaFormulario(razaoSocial, cnpj, endereco, email, confirmaEmail, senha, confirmaSenha){
    
    let erros = 0

    let texto = `Verifique e corrija os erros abaixo:\n`
    
    if(!razaoSocial.includes(" ")){
        texto+=`Digite a Razão Social completa da empresa\n`
        erros++
    }
    if(cnpj.length != 14){
        texto+=`Verifique o CNPJ\n`
        erros++
    }
    if(!endereco.includes(" ")){
        texto+=`Digite o endereço completo da empresa\n`
        erros++
    }
    if(!email.includes("@") || !email.includes(".com")){
        texto+=`Verifique o endereço de e-mail\n`
        erros++
    }
    if(confirmaEmail != email){
        texto+=`Erro na confirmação do endereço de e-mail\n`
        erros++
    }
    if(senha.length < 8){
        texto+=`Senha deve conter no mínimo 8 caracteres\n`
        erros++
    }
    if(senha != confirmaSenha){
        texto+=`Erro na confirmação da senha.`
        erros++
    }
    if(erros >= 1){
        alert(texto)
        return
    }else{
        alert(`Estabelecimento cadastrado com sucesso!`)
        formulario.reset()
        formulario.inRazao.focus()
        salvarDados(razaoSocial, cnpj, endereco, email, senha)
        window.location.href = './index.html'
    }

}

function salvarDados(razaoSocial, cnpj, endereco, email, senha){
    if(localStorage.getItem("razaoSocial")){
        //obtem dados
        const lista1 = localStorage.getItem("razaoSocial") + ";" + razaoSocial
        const lista2 = localStorage.getItem("cnpj") + ";" + cnpj
        const lista3 = localStorage.getItem("endereco") + ";" + endereco
        const lista4 = localStorage.getItem("email") + ";" + email
        const lista5 = localStorage.getItem("senha") + ";" + senha
        //atualiza dados
        localStorage.setItem("razaoSocial", lista1)
        localStorage.setItem("cnpj", lista2)
        localStorage.setItem("endereco", lista3)
        localStorage.setItem("email", lista4)
        localStorage.setItem("senha", lista5)
    }
    else{
        localStorage.setItem("razaoSocial", razaoSocial)
        localStorage.setItem("cnpj", cnpj)
        localStorage.setItem("endereco", endereco)
        localStorage.setItem("email", email)
        localStorage.setItem("senha", senha)
    }
}

//eventos
formulario.addEventListener("submit", (e) => {

    e.preventDefault()
    
    const razaoSocial = formulario.inRazao.value
    const cnpj = formulario.inCnpj.value
    const endereco = formulario.inEndereco.value
    const email = formulario.inEmail.value
    const confirmaEmail = formulario.inEmailConfirmacao.value
    const senha = formulario.inSenha.value
    const confirmaSenha = formulario.inSenhaConfirmacao.value

    validaFormulario(razaoSocial, cnpj, endereco, email, confirmaEmail, senha, confirmaSenha)

})