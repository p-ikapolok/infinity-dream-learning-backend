import { Router } from "express";
import auth from "../middleware/auth";
import { permit } from "../middleware/roles";
import * as courseCtrl from "../controllers/courseController";

const router = Router();

/*
Create Course
Only teachers and admins can create courses
*/
router.post(
  "/",
  auth,
  permit("teacher", "admin"),
  courseCtrl.createCourse
);

/*
Create Cohort
Only teachers and admins can create cohorts
*/
router.post(
  "/cohort",
  auth,
  permit("teacher", "admin"),
  courseCtrl.createCohort
);

export default router;
