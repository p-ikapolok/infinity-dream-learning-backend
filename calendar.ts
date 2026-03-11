import { Router } from "express";
import auth from "../middleware/auth";
import * as gc from "../controllers/googleCalendarController";

const router = Router();

/*
Create Calendar Event
*/
router.post("/event", auth, gc.createEvent);

/*
Get Today's Events
*/
router.get("/today", auth, gc.todaysEvents);

export default router;
