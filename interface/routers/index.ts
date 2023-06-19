import { Router } from "express";
import requestSender from "../axios_instance";

const indexRouter = Router();

indexRouter.get("/genese/:id", async (req, res) => {
    const id = req.params.id;
    const token = req.cookies.jwtToken;

    try {
        const response = await requestSender.get('/api/genesis/' + id, { headers: { Authorization: `Bearer ${token}` } });
        if (response.status == 404) return res.render('error', { error: response.data });
        const inquericao = response.data;
        const entries = Object.entries(inquericao).filter(([key, value]) => {
            return key != '_id' && value && value !== '' && key != 'Relationships';
        });
        const obj = Object.fromEntries(entries);
        const relationships = obj['Relations'];
        delete obj['Relations'];
        obj['Relationships'] = relationships;
        res.render('inquericao', { inquericao: obj });
    } catch (error) {
        res.render('error', { error: "Could not find the genese you wanted" });
    }
});

indexRouter.get('/', async (req, res) => {
    try {
        const token = req.cookies.jwtToken;
        console.log(token);
        const response = await requestSender.get('/api/genesis', { headers: { Authorization: `Bearer ${token}` } });
        const data = response.data;

        res.render('index', { inquericoes: data });
    } catch (error) {
        res.send('Error collecting geneses');
    }
});

export default indexRouter;
