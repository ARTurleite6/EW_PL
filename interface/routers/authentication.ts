import { Router } from "express";
import authentication from "../controllers/authentication";

const authRouter = Router();

authRouter.post('/login', authentication, (_req, res) => {
    res.redirect('/');
});

authRouter.get('/login', (_req, res) => {
    res.render('login');
});

export default authRouter;
