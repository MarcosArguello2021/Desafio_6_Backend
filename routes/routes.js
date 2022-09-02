const routerProducto = require('express').Router();
const { Contenedor } = require('../api/productos.js');
const productosApi = new Contenedor('./productos.txt');


routerProducto.get('/', async (req, res) => {
    try {
        res.json(await productosApi.getAll());
    } catch (err) {
        res.status(500).send(`No se puede recuperar los datos ${err}`);
    }
})

routerProducto.get('/:id', async (req, res) => {
    try {
        res.json(await productosApi.getById(Number(req.params.id)))
    } catch (err) {
        res.status(200).json({ error: 'producto no encontrado' });
    }

})

routerProducto.post('/', async (req, res) => {
    res.json(await productosApi.save(req.body))
})

routerProducto.put('/:id', async (req, res) => {
    try {
        res.json(await productosApi.update(req.body, Number(req.params.id)))
    } catch (err) {
        res.status(200).json({ error: 'producto no encontrado' });
    }
})

routerProducto.delete('/:id', async (req, res) => {
    res.json(await productosApi.deleteById(Number(req.params.id)))
})

module.exports = routerProducto;