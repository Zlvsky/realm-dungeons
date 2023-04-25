require("dotenv").config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { loginUser } from "./controllers/account/login";
import { createUser } from "./controllers/account/register";
import { createCharacter, getCharacterById, getUserCharacters } from "./controllers/account/characters";
import { updateEquipment } from "./controllers/game/hero/heroEquipment";
import { addItem } from "./controllers/game/items/addItem";

const uri = process.env.MONGO_CONNECTION_URL;
if(!uri) throw new Error(".env file is not created")

mongoose.set("strictQuery", false);
mongoose.connect(uri, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});
mongoose.connection.on("connected", function () {
  console.log("connected to mongo");
});

const app = express();
app.use(cors());
app.use(express.json());


app.get("/", (req: any, res: any) => {
  res.send("Hello, world!");
});

// LOGIN AND REGISTER
app.post("/register", createUser);
app.post("/login", loginUser);

// USER ACTIONCS
app.post("/user/createCharacter", createCharacter);
app.get("/user/getCharacter/:id", getCharacterById);
app.get("/user/getUserCharacters", getUserCharacters);

// HERO ACTIONS

app.post("/hero/equipment/update", updateEquipment);

// ITEMS ACTIONS

app.post("/item/add", addItem);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
