import { Router } from "express";
import auth from "../middleware/auth";
import * as uploadCtrl from "../controllers/uploadController";

const router = Router();

/*
Get S3 presigned upload URL
*/
router.post("/presign", auth, uploadCtrl.getPresigned);

export default router;
