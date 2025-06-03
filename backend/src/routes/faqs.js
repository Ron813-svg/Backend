import express from 'express'
import faqsController from '../controllers/faqsControllers.js'

const router = express.Router()

router.route("/").get(faqsController.get)
  .post(faqsController.post);

router.route("/:id").put(faqsController.put)
.delete(faqsController.delete);

export default router