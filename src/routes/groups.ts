import { Router } from "express";
import auth from "../middleware/auth";
import * as groupCtrl from "../controllers/groupController";

const router = Router();

/*
Create a group
*/
router.post("/", auth, groupCtrl.createGroup);

/*
Join a group
*/
router.post("/:id/join", auth, groupCtrl.joinGroup);

/*
Leave a group
*/
router.post("/:id/leave", auth, groupCtrl.leaveGroup);

/*
List groups for a course
*/
router.get("/course/:courseId", auth, groupCtrl.listGroupForCourse);

export default router;
