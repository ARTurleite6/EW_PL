import { Router } from 'express'
import { getAllGeneses, getGenese } from '../controllers/geneses';

export const indexRouter = Router();

indexRouter.get('/', async (_req, res) => {
    const genesis = await getAllGeneses();
    console.log(genesis);
    if (genesis) {
        res.send(genesis);
    } else {
        res.send('No Genesis Found');
    }
});

indexRouter.get('/:id', async (req, res) => {
    try {
        const genese = await getGenese(req.params.id);
        console.log(genese);
        if (genese) {
            res.send(genese);
        } else {
            res.send('No Genesis Found');
        }
    } catch (error) {
        console.dir(error);
        res.send('No Genesis Found');
    }
});
