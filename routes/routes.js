const router = require('express').Router();
const { Contenedor } = require('../api/productos');
const productosApi = new Contenedor('./productos.txt');


router.get('/', async (req, res) => {
    try {
        res.json(await productosApi.getAll());
    } catch (err) {
        res.status(500).send(`No se puede recuperar los datos ${err}`);
    }
})

router.get('/:id', async (req, res) => {
    try {
        res.json(await productosApi.getById(Number(req.params.id)))
    } catch (err) {
        res.status(200).json({ error: 'producto no encontrado' });
    }

})

router.post('/', async (req, res) => {

    const data = req.body
    console.log(data)
        
        await productosApi.save(data);
        res.send(data);
})

router.put('/:id', async (req, res) => {
    try {
        res.json(await productosApi.update(req.body, Number(req.params.id)))
    } catch (err) {
        res.status(200).json({ error: 'producto no encontrado' });
    }
})

router.delete('/:id', async (req, res) => {
    res.json(await productosApi.deleteById(Number(req.params.id)))
})

module.exports = router;