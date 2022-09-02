const { promises: fs } = require('fs');

const  guardarProducto = async (data) => {

    try {
        const response = await fetch('/api/productos', {
            method: 'POST', 
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json'},
        })
        const result = await response.json()
        return result

    } catch (error) {
        let err = new Error(error)
        return err
    }
}

const getChat = async () => {

    try {
        const data = await fs.readFile('chat.txt', 'utf-8', (err, data) => {
            if(err) throw err
            return data
        })
        return JSON.parse(data) 

    } catch (error) {
        console.error(`El error es: ${error}`)
    }
}

const saveChat = async (mensaje) => {

    try {
        const chat = await getChat() 
        chat.push(mensaje)
        await fs.writeFile('chat.txt', JSON.stringify(chat, null, 2), err => {
        if(err) throw err
    })

    } catch (error) {
        console.error(`El error es: ${error}`)
    }
}

module.exports = {
    guardarProducto,
    getChat,
    saveChat
}