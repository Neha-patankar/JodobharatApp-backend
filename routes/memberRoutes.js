import express from "express";
import { registerMember,
    getAllMembers,
  getMemberById,
  updateMember,
  deleteMember,
  loginMember
 } from "../controllers/memberController.js";

const router = express.Router();

router.post("/register", registerMember);
router.post('/login', loginMember);
router.get('/', getAllMembers);
router.get('/:id', getMemberById);
router.put('/:id', updateMember);
router.delete('/:id', deleteMember);

export default router;
