import { Router } from "express";
import auth from "../middleware/auth";
import * as aiCtrl from "../controllers/aiController";

const router = Router();

/*
AI Chat
*/
router.post("/chat", auth, aiCtrl.chat);

/*
Create embedding for lesson
*/
router.post("/embedding", auth, aiCtrl.createEmbeddingForLesson);

/*
Ask AI question
*/
router.post("/ask", auth, aiCtrl.askAI);

/*
Search AI knowledge
*/
router.post("/search", auth, aiCtrl.searchAI);

/*
Generate summary
*/
router.post("/summary", auth, aiCtrl.summaryAI);

/*
AI feedback for projects
*/
router.post("/project-feedback", auth, aiCtrl.projectFeedbackAI);

/*
Plagiarism detection
*/
router.post("/plagiarism-check", auth, aiCtrl.plagiarismAI);

export default router;
