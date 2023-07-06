const formulario = document.querySelector("form")
const tabela = document.querySelector("table")
const titulo = document.querySelector("#outNome")

function inserirLinha(nome, descricao, preco){
    //insere uma linha no final da tabela
    const linha = tabela.insertRow(-1)

    const col1 = linha.insertCell(0)//coluna nome
    const col2 = linha.insertCell(1)//coluna descricao
    const col3 = linha.insertCell(2)//coluna preco
    const col4 = linha.insertCell(3)//coluna acao

    col1.innerText = nome
    col2.innerText = descricao
    col3.innerText = preco
    col4.innerHTML = "<i class='exclui' title='excluir'>&#10008</i>"

    formulario.reset()
    formulario.inNome.focus()

}

function gravarDados(nome, descricao, preco){
    
    //obtem codigo do usuario para salvar itens
    const usuario = localStorage.getItem("loginUsuario").split(";")
    const codigoUltimoLogin = usuario.length-1
    const ultimoLogin = usuario[codigoUltimoLogin]
    
    //verifica se ja possui itens salvos no codigo do usuario e salva
    if(localStorage.getItem(`${ultimoLogin}nomeProduto`)){
        const nomeProduto = localStorage.getItem(`${ultimoLogin}nomeProduto`) + ";" + nome
        const descricaoProduto = localStorage.getItem(`${ultimoLogin}descricaoProduto`) + ";" + descricao
        const precoProduto = localStorage.getItem(`${ultimoLogin}precoProduto`) + ";" + preco
        localStorage.setItem(`${ultimoLogin}nomeProduto`, nomeProduto)
        localStorage.setItem(`${ultimoLogin}descricaoProduto`, descricaoProduto)
        localStorage.setItem(`${ultimoLogin}precoProduto`, precoProduto)
    }else {
        localStorage.setItem(`${ultimoLogin}nomeProduto`, nome)
        localStorage.setItem(`${ultimoLogin}descricaoProduto`, descricao)
        localStorage.setItem(`${ultimoLogin}precoProduto`, preco)
    }
}

function usuarioLogado(){
    
    //obtem dados do usuario logado e exibe na tela
    const usuario = localStorage.getItem("loginUsuario").split(";")
    const codigoUltimoLogin = usuario.length-1
    const ultimoLogin = usuario[codigoUltimoLogin]
    const razaoSocial = localStorage.getItem("razaoSocial").split(";")

    titulo.innerText = `Painel de Cadastro de Produto (${razaoSocial[ultimoLogin]})`

    return ultimoLogin
}


window.addEventListener("load", () => {
    
    // carrega dados salvos do usuario que fez o login
    usuarioLogado()
    const ultimoLogin = usuarioLogado() //obtem o codigo do usuario

    // se tiver dados cadastrados salva eles em um vetor e exibe na pagina
    if(localStorage.getItem(`${ultimoLogin}nomeProduto`)){
        const nomeProdutos = localStorage.getItem(`${ultimoLogin}nomeProduto`).split(";")
        const descricaoProdutos = localStorage.getItem(`${ultimoLogin}descricaoProduto`).split(";")
        const precoProdutos = localStorage.getItem(`${ultimoLogin}precoProduto`).split(";")

    //percorre os elementos do vetor e os insere na tabela atraves da function inserirLinha()
        for(let i = 0; i < nomeProdutos.length; i++){
            inserirLinha(nomeProdutos[i], descricaoProdutos[i], precoProdutos[i])
        }
    }
})

formulario.addEventListener("submit", (e) => {

    //obtem novos dados, insere na pagina e grava no localStorage

    e.preventDefault()

    const nome = formulario.inNome.value
    const descricao = formulario.inDescricao.value
    const preco = Number(formulario.inPreco.value)

    inserirLinha(nome, descricao, preco)
    gravarDados(nome, descricao, preco)
})


tabela.addEventListener("click", (e) => {

    //exclui item selecionado

    const ultimoLogin = usuarioLogado() //obtem codigo do usuario
    
    if(e.target.classList.contains("exclui")) {
       
        const titulo = e.target.parentElement.parentElement.children[0].innerText

        if(confirm(`Confirma Exclusão do Produto "${titulo}"?`)){
            
            e.target.parentElement.parentElement.remove()
        
            localStorage.removeItem(`${ultimoLogin}nomeProduto`)
            localStorage.removeItem(`${ultimoLogin}descricaoProduto`)
            localStorage.removeItem(`${ultimoLogin}precoProduto`)
        }

        //percorre tabela e salva os dados novamente no localStorage

        for(let i = 1; i < tabela.rows.length; i++){
            const auxNome = tabela.rows[i].cells[0].innerText
            const auxDescricao = tabela.rows[i].cells[1].innerText
            const auxPreco = tabela.rows[i].cells[2].innerText
            gravarDados(auxNome, auxDescricao, auxPreco)
        }
    }
})