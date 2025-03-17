 
import express from "express";
<<<<<<< HEAD
import branchesControllers from "../controllers/branchesControllers.js";
=======
import branchesControllers from "../controllers/branchesControllers";
>>>>>>> 12b3f33c28314c4eac131a9154665a653950e7a7

const router = express.Router();

router.route("/").get(branchesControllers.getBranch)
  .post(branchesControllers.insertBranch);

router.route("/:id").put(branchesControllers.updateBranch)
.delete(branchesControllers.deleteBranch);

export default router;