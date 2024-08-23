import { Router, Response } from "express";
import auth from "../controllers/auth";
import { AuthenticatedRequest, authenticateToken } from "../middleware/auth";

const Route = Router();

Route.use("/api/auth", auth);
Route.use(
  "/api/user",
  authenticateToken,
  (req: AuthenticatedRequest, res: Response) => {
    res.json({ success: true, user: req.user });
  }
);

export default Route;