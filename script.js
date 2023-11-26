$(document).ready(function(){
    
    $('#cad_loja').on('click', () =>{
        $.get('cad_loja.html', data => {
            $('#pagina').html(data)
        });
    });

    $('#cad_produto').on('click', () =>{
        $.get('cad_produto.html', data => {
            $('#pagina').html(data)
        });
    });

});


class Cadastro{
    constructor(info, tipo){
        this.info = info
        this.tipo = tipo
    }

    validardados(){
        for(let i in this){
            if(this[i] == undefined || this[i] == '' || this[i] == null){
                return false
            }
        }
        return true
    }
}
class Cadastrarorca{
    constructor(loja, produto, valor){
        this.loja = loja
        this.produto = produto
        this.valor = valor
    }

    validardados(){
        for(let i in this){
            if(this[i] == undefined || this[i] == '' || this[i] == null){
                return false
            }
        }
        return true
    }
}

class Bd{

    constructor(){
        let id = localStorage.getItem('id')

        if(id === null){
            localStorage.setItem('id', 0)
        }
    }

    getproximoid(){
        let proximoid = localStorage.getItem('id')
        return parseInt(proximoid) + 1
    }

    gravar(d){

        let id = this.getproximoid()

        localStorage.setItem(id, JSON.stringify(d))

        localStorage.setItem('id', id)
    }

    recuperarTodos(){
        
        let cadastros = Array();

        let id = localStorage.getItem('id');

        for(let i = 1; i <= id; i ++){

            let cadastro = JSON.parse(localStorage.getItem(i));

            if(cadastro === null){
                continue
            }

            cadastro.id = i;
            cadastros.push(cadastro);
        }

        return cadastros
    }
}

let bd = new Bd()

function cadastrarloja(){

    let info = document.getElementById('loja')

    let cadastro = new Cadastro(info.value, 'loja');

    if(cadastro.validardados()){
        bd.gravar(cadastro);

        document.getElementById('modal_titulo').innerHTML = 'Sucesso'
        document.getElementById('modal_titulo_div').className = 'modal-header text-success'
        document.getElementById('modal_descricao').innerHTML = 'Cadastrato com sucesso'
        document.getElementById('modal_btn').innerHTML = 'Voltar'
        document.getElementById('modal_btn').className = 'btn-success'

        $('#su').modal('show')
        info.value = ''

    }else{
        document.getElementById('modal_titulo').innerHTML = 'Erro na Gravação'
        document.getElementById('modal_titulo_div').className = 'modal-header text-danger'
        document.getElementById('modal_descricao').innerHTML = 'Existem campos obrigadorios que não foram preenchidos!'
        document.getElementById('modal_btn').innerHTML = 'Voltar e corrigir'
        document.getElementById('modal_btn').className = 'btn-danger'
        $('#su').modal('show')
    }
}

function cadastrarproduto(){

    let info = document.getElementById('produto_cd')

    let cadastro = new Cadastro(info.value, 'produto');

    if(cadastro.validardados()){
        bd.gravar(cadastro);

        document.getElementById('modal_titulo').innerHTML = 'Sucesso'
        document.getElementById('modal_titulo_div').className = 'modal-header text-success'
        document.getElementById('modal_descricao').innerHTML = 'Cadastrato com sucesso'
        document.getElementById('modal_btn').innerHTML = 'Voltar'
        document.getElementById('modal_btn').className = 'btn-success'

        $('#su').modal('show')
        info.value = ''
    

    }else{
        document.getElementById('modal_titulo').innerHTML = 'Erro na Gravação'
        document.getElementById('modal_titulo_div').className = 'modal-header text-danger'
        document.getElementById('modal_descricao').innerHTML = 'Existem campos obrigadorios que não foram preenchidos!'
        document.getElementById('modal_btn').innerHTML = 'Voltar e corrigir'
        document.getElementById('modal_btn').className = 'btn-danger'
        $('#su').modal('show')
    }
}

function cadastrarorcamento(){

    let loja = document.getElementById('loja_select')
    let produto = document.getElementById('produto_select')
    let valor = document.getElementById('valor')

    let cadastro = new Cadastrarorca(loja.value, produto.value, valor.value);

    if(cadastro.validardados()){
        bd.gravar(cadastro);

        document.getElementById('modal_titulo').innerHTML = 'Sucesso'
        document.getElementById('modal_titulo_div').className = 'modal-header text-success'
        document.getElementById('modal_descricao').innerHTML = 'Cadastrato com sucesso'
        document.getElementById('modal_btn').innerHTML = 'Voltar'
        document.getElementById('modal_btn').className = 'btn-success'

        $('#su').modal('show')
        loja.value = '', 
        produto.value = '', 
        valor.value = ''
    

    }else{
        document.getElementById('modal_titulo').innerHTML = 'Erro na Gravação'
        document.getElementById('modal_titulo_div').className = 'modal-header text-danger'
        document.getElementById('modal_descricao').innerHTML = 'Existem campos obrigadorios que não foram preenchidos!'
        document.getElementById('modal_btn').innerHTML = 'Voltar e corrigir'
        document.getElementById('modal_btn').className = 'btn-danger'
        $('#su').modal('show')
    }
}

function recuperar() {
    let cadastror = Array();
    cadastror = bd.recuperarTodos();

    console.log(cadastror)

    var select = document.getElementById('loja_select');
    var select_produto = document.getElementById('produto_select');

    // Adicionar novas opções com base nos dados
    cadastror.forEach(function (item) {

        if(item.tipo === 'loja'){
            console.log(item.info)

            var option = document.createElement('option');
    
            option.value = item.info;
            option.text = item.info;
            
            select.appendChild(option)
        }

        if(item.tipo === 'produto'){

            var option = document.createElement('option');
    
            option.value = item.info;
            option.text = item.info;
            
            select_produto.appendChild(option)
        }
    });
}


function lista(){
    let cadastror = Array();
    cadastror = bd.recuperarTodos();


    let lista = document.getElementById('listaorcamento')

    cadastror.forEach(function(d){

        if(d.tipo != 'produto' && d.tipo != 'loja'){
          
            var linha = lista.insertRow();
    
            linha.insertCell(0).innerHTML = d.loja
            linha.insertCell(1).innerHTML = d.produto
            linha.insertCell(2).innerHTML = `R$ ${d.valor}` 


        }
       
    })
}