import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import routes from "./routes";

import "dotenv/config";

const app = express();
app.set("trust proxy", 1);
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({
    extended: true,
    limit: "50mb",
    parameterLimit: 2500000,
  })
);
app.all("*", routes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI || "")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
