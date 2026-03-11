import { Router } from "express";
import auth from "../middleware/auth";
import { permit } from "../middleware/roles";
import * as lessonCtrl from "../controllers/lessonController";

const router = Router();

/*
Create Lesson
Only teachers and admins can create lessons
Supports scheduleNextSunday flag
*/
router.post(
  "/",
  auth,
  permit("teacher", "admin"),
  lessonCtrl.createLesson
);

/*
Get Lesson
Requires authentication
*/
router.get(
  "/:id",
  auth,
  lessonCtrl.getLesson
);

export default router;
