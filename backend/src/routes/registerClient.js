import express from 'express'
import registerClientsController from '../controllers/registerClientsController';

const router = express.Router()

router.route("/").post(registerClientsController.register);
router.route("/verifyCodeEmail").post(registerClientsController.verificationCodeEmail);

export default router;