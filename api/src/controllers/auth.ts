import { Request, Response, Router } from "express";
import User, { IUser } from "../models/User";
import jwt from "jsonwebtoken";

const Route = Router();

const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;

  try {
    if (await userExists(email)) {
      res.status(400).json({ success: false, message: "User already exists" });
      return;
    };
    if (await isUsernameTaken(username)) {
      res.status(400).json({ success: false, message: "Username is already taken" });
      return;
    };
    const user: IUser = new User({ username, email, password });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });
    res.status(201).json({ success: true, token });
  } catch (err: any) {
    res.status(500).json({ success: false, message: "Server Error", error: err.errorResponse.errmsg });
  }
};

const isUsernameTaken = async (username: string) => {
  try {
    const user = await User.findOne({ username });
    return user !== null;
  } catch (error) {
    console.error("Error checking if username exists:", error);
    return false;
  }
};

const userExists = async (email: string): Promise<boolean> => {
  try {
    const user = await User.findOne({ email });
    return user !== null;
  } catch (error) {
    console.error("Error checking if email exists:", error);
    return false;
  }
};


const authUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ success: false, message: "Invalid credentials" });
      return;
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      res.status(400).json({ success: false, message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });
    res.status(200).json({ success: true, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


Route.post("/signup", registerUser);
Route.post("/login", authUser);

export default Route;
