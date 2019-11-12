const mongoose = require('mongoose')
const url = process.env.URLDB


connectionLocal = () => {
    mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true})
    
    const connection = mongoose.connection
    
    connection.once('open', () => {
        console.log('Db se ha conectado de forma local')
    }).catch((e)=>{
        console.log("error:" + e)
    })
}

connectionCloud = (url) => {
    mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex:true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    
    const connection = mongoose.connection
    
    connection.once('open', () => {
        console.log('Db se ha conectado de forma remota')
    }).catch((e)=>{
        console.log("error:" + e)
    })
}

if (process.env.DBMODE === 'local') {
    connectionLocal()
} else {
    connectionCloud(url)
}
