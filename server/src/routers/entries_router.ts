import { Router } from "express";
import { addEntry, getAllEntries } from "../controllers/entries_controller";
import { Entry } from "../models/genese";


export const entriesRouter = Router()

entriesRouter.get('/', async (_, res) => {
    try {
        const entries = await getAllEntries();
        console.log('Entries gathered');
        res.status(200);
        res.send(entries);
        res.end();
    } catch (error) {
        console.log(error);
        res.status(404);
        res.send('error collecting all entries');
        res.end();
    }
});

entriesRouter.post('/', async (req, res) => {
    const entry = req.body as Entry;
    console.log(entry);
    const response = await addEntry(entry);
    if (response) {
        res.status(200);
        res.send('Entry added');
        res.end();
    } else {
        res.status(404);
        res.send('Unable to insert object');
        res.end();
    }
});
