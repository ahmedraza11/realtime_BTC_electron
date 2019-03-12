const electron = require('electron')
const path = require('path')
const BrowserWindow = electron.remote.BrowserWindow
const axios = require('axios');
const ipc = electron.ipcRenderer


const notifyBtn = document.getElementById('notifyBtn')
const price = document.querySelector('h3');
const targetValue = document.getElementById('targetValue')

function getBTC(){  
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,IOT&tsyms=USD').then(res=>{
        const cryptos = res.data.BTC.USD
        price.innerHTML = '$'+cryptos.toLocaleString('en')
    })
}
getBTC();
setInterval(getBTC,3000)

notifyBtn.addEventListener('click',function(){
    const modalPath = path.join('file://',__dirname,'../Add/add.html');
    let win = new BrowserWindow({frame:false,transparent: true,width: 400, height: 200})
    win.on('close',function(){win = null})
    win.loadURL(modalPath);
    win.show()
})

ipc.on('targetPriceVal',function(event,arg){
    targetPriceVal = Number(arg)
    targetValue.innerHTML = '$'+targetPriceVal.toLocaleString('en')
})