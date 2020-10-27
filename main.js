class Calc {
    constructor(telasup,telainf){        
        this.telasup = telasup
        this.telainf = telainf
        this.AllClear()        
    }
    Append(digito){
        if(digito === ',' && this.operadoratual.includes(',')) 
            return
        this.operadoratual = this.operadoratual.toString() + digito.toString()
    }
    Udtela(){
        this.telainf.innerText = this.operadoratual
        if(this.oper != null){
            this.telasup.innerText = `${this.operadoranterior} ${this.oper}`
        }
        else{
            this.telasup.innerText = ''
        }
    }
    AllClear(){
        this.operadoranterior = ''
        this.operadoratual = ''
        this.oper = undefined
    }    
    Operacao(oper){
        if(this.operadoratual === '')
            return
        if(this.operadoranterior !== ''){
            this.Conta()
        }
        this.oper = oper
        this.operadoranterior = this.operadoratual
        this.operadoratual = ''
    }    
    Conta(){
        let resultado
        const a = parseFloat(this.operadoranterior)
        const b = parseFloat(this.operadoratual)
        if(isNaN(a)||isNaN(b))
            return
        if(this.oper === '+'){
            resultado = a+b
        }
        if(this.oper === '-'){
            resultado = a-b
        }
        if(this.oper === 'x'){
            resultado = a*b
        }
        if(this.oper === '/'){
            resultado = a/b
        }
        this.operadoratual = resultado
        this.oper = undefined
        this.operadoranterior = ''
    }
    Memo(Mx,memo){
        if(Mx === 'MS'){
            memo[0] = parseFloat(this.operadoratual)        
            this.operadoratual = ''
        }
        if(Mx === 'MR'){
            this.operadoratual = memo[0]
        }
        if(Mx === 'MC'){
            memo[0] = 0
        }
    }
}

/* const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');

let mainWindow;
function createWindow(){
    mainWindow = new BrowserWindow({width:900, height:680});
    mainWindow.loadURL(isDev ? 'http://localhost:3000':'file://${path.join( __dirname, ../build/index.html)}');
    mainWindow.on('closed', () => mainWindow = null);
}
app.on('ready', createWindow);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin'){
        app.quit();
    }
});
app.on('activate', () => {
    if (mainWindow === null){
        createWindow();
    }
});
 */

const numero = document.querySelectorAll('[data-num]')
const operador = document.querySelectorAll('[data-operacao]')
const igual = document.querySelector('[data-igual]')
const AC = document.querySelector('[data-ac]')
const telainf = document.querySelector('[data-operador-atual]')
const telasup = document.querySelector('[data-operador-anterior]')
const memoria = document.querySelectorAll('[data-memoria]')
const salvo = [0]
const calculadora = new Calc(telasup, telainf)

numero.forEach(button => {
    button.addEventListener('click', () => {
        calculadora.Append(button.innerText)
        calculadora.Udtela()
    })
})

operador.forEach(button => {
    button.addEventListener('click', () => {
        calculadora.Operacao(button.innerText)
        calculadora.Udtela()
    })
})

igual.addEventListener('click', () => {
    calculadora.Conta()
    calculadora.Udtela()
})

AC.addEventListener('click', () => {
    calculadora.AllClear()
    calculadora.Udtela()
})

memoria.forEach(button => {
    button.addEventListener('click', () => {
        calculadora.Memo(button.innerText, salvo)
        calculadora.Udtela()
    })
})