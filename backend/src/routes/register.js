import express from 'express';
import registerController from '../controllers/registerControllers.js';

const router = express.router();

router.route("/").post(registerController.Register);

export default router;