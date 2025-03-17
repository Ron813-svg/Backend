
import express from "express"
import employeesController from "../controllers/employeesControllers.js"

const router = express.Router()

router.route("/").get(employeesController.getEmployees)
.post(employeesController.insertEmployee)

<<<<<<< HEAD
router.route("/:id").put(employeesController.updateEmployee)
=======
router.route("/:id").get(employeesController.getEmployeeById)
>>>>>>> 12b3f33c28314c4eac131a9154665a653950e7a7
.delete(employeesController.deleteEmployee)

export default router;