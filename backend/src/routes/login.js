import express from 'express';

const router = express.router();

router.route("/").get();

export default router;