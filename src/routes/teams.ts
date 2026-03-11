import { Router } from "express";
import auth from "../middleware/auth";
import * as teamCtrl from "../controllers/teamController";

const router = Router();

/*
Suggest teams for a course
Optional query: ?teamSize=4
*/
router.get("/suggest/:courseId", auth, teamCtrl.suggestTeams);

/*
Create a team
*/
router.post("/", auth, teamCtrl.createTeam);

export default router;
