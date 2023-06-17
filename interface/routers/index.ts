import { Router } from "express";
import requestSender from "../axios_instance";

const indexRouter = Router();

indexRouter.get("/genese/:id", async (req, res) => {
    const id = req.params.id;
    const token = req.cookies.jwtToken;

    try {
        const response = await requestSender.get('/api/genesis/' + id, { headers: { Authorization: `Bearer ${token}` } });
        console.dir(response);
        const inquericao = response.data;
        res.render('inquericao', { inquericao });
    } catch (error) {
        res.send(error);
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
