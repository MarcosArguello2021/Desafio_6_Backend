const socket = io.connect();

const buttonSaveProd = document.getElementById("guardar");

buttonSaveProd?.addEventListener("click", () => {
    const data = {
        title: document.getElementById("title").value,
        price: document.getElementById("price").value,
        thumbnail: document.getElementById("thumbnail").value
    }
    document.getElementById('data').reset()
    socket.emit('producto_guardado', data)
})

socket.on('lista_productos', productos => {
    document.getElementById('lista').innerHTML = ''
    productos.forEach(producto => {
        document.getElementById('lista').innerHTML += `
        <tr>
            <td>${producto.id}</td>
            <td>${producto.title}</td>
            <td>${producto.price}</td>
            <td><img src="${producto.thumbnail}" height="70px"></td>
        </tr>
        `
    })
})

socket.on('lista_chat', chat => {
    document.getElementById('chat').innerHTML = ''
    chat.forEach(mensaje => {
        document.getElementById('chat').innerHTML += `
            <div style="width:100vw">
                <span class="fw-bold" style="color: blue;">${mensaje.email}</span>
                <span style="color: brown;">&nbsp[${mensaje.fecha}]</span>
                <span class="fst-italic" style="color: green;">&nbsp: ${mensaje.mensaje}</span>
            </div>
        `
    })
})

const buttonChat = document.getElementById("enviar")

buttonChat?.addEventListener("click", () => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (regex.test(document.getElementById("email").value)) {
        const f = new Date()
        const fecha = `${f.getDate()}/${f.getMonth() + 1}/${f.getFullYear()} ${f.getHours()}:${f.getMinutes()}:${f.getSeconds()}`
        const data = {
            email: document.getElementById("email").value,
            fecha: fecha,
            mensaje: document.getElementById("mensaje").value
        }
        document.getElementById('mensaje').value = ''
        socket.emit('cliente_nuevo_mensaje_chat', data)
    } else {
        document.getElementById('email').innerText = 'inserte un email valido'
        document.getElementById('mensaje').value = ''
    }
})


