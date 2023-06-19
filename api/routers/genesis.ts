import { Router } from 'express'
import { getAllGeneses, getGenese } from '../controllers/geneses';

export const indexRouter = Router();

indexRouter.get('/:id', async (req, res) => {
    console.dir(req.cookies);
    try {
        const genese = await getGenese(parseInt(req.params.id));
        console.log(genese);
        if (genese) {
            res.status(200).json(genese);
        } else {
            res.status(404).json('No Genesis Found');
        }
    } catch (error) {
        console.log(error);
        res.status(404).json('No Genesis Found');
    }
});

indexRouter.get('/', async (req, res) => {

    const filterOptions = req.query;
    console.dir(filterOptions);

    const genesis = await getAllGeneses(filterOptions);
    console.log(genesis);
    if (genesis) {
        res.send(genesis);
    } else {
        res.status(404).send('No Genesis Found');
    }
});

