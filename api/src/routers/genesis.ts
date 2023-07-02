import { Router } from 'express'
import { createGenere, getAllGeneses, getGenese, getLocations, updateGenere } from '../controllers/geneses';
import { GenesisModel } from '../models/genesis';

export const indexRouter = Router();

indexRouter.get('/locations', async (req, res) => {
    try {
        const locations = await getLocations();
        res.status(200).json(locations);
    } catch (error) {
        res.status(404).json('No Locations Found');
    }
});

indexRouter.delete('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const genese = await GenesisModel.deleteOne({ UnitId: id }).exec();
        res.status(200).json(genese);
    } catch (error) {
        console.dir(error);
        res.status(404).json('No Genesis Found');
    }
});

indexRouter.get('/:id', async (req, res) => {
    try {
        const genese = await getGenese(parseInt(req.params.id));
        if (genese) {
            res.status(200).json(genese);
        } else {
            res.status(404).json('No Genesis Found');
        }
    } catch (error) {
        res.status(404).json('No Genesis Found');
    }
});

indexRouter.get('/', async (req, res) => {

    const filterOptions = req.query;

    const genesis = await getAllGeneses(filterOptions);
    if (genesis) {
        res.send(genesis);
    } else {
        res.status(404).send('No Genesis Found');
    }
});

indexRouter.post('/', async (req, res) => {
    try {
        const newGenere = await createGenere(req.body);
        res.status(201).json(newGenere);
    } catch (error) {
        res.status(400).send('Error creating new Genese: ' + error);
    }
});

indexRouter.put('/:id', async (req, res) => {
    try {
        const newGenere = await updateGenere(req.body);
        res.status(201).json(newGenere);
    } catch (error) {
        res.status(400).send('Error updating new Genese: ' + error);
    }
});
