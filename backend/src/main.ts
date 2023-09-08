require("dotenv").config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
const bodyParser = require("body-parser");
import { loginUser } from "./controllers/account/login";
import { createUser } from "./controllers/account/register";
import { createCharacter, getCharacterById, getUserCharacters } from "./controllers/account/characters";
import { updateInventoryToEquipment } from "./controllers/game/hero/heroInventoryToEquipment";
import { addItem } from "./controllers/game/items/addItem";
import { updateInventory } from "./controllers/game/hero/heroInventory";
import { updateEquipmentToInventory } from "./controllers/game/hero/heroEquipmentToInventrory";
import { clearActiveQuest, startQuestBattle, updateActiveQuest } from "./controllers/game/quests/quests";
import { characterAttack } from "./controllers/game/quest-battle/questBattle";
import { enemyTurn } from "./controllers/game/quest-battle/enemyTurn";
import { questBattleEnd } from "./controllers/game/quest-battle/questBattleEnd";
import { templeHealing } from "./controllers/game/temple/templeHealing";
import { templeHealRenew } from "./controllers/game/temple/templeHealRenew";
import { updateStatistics } from "./controllers/game/hero/statistics/updateStatistics";
import { getUserDetails } from "./controllers/account/getUser";
import initInsert from "./mongoInserts.ts/initInsert";
import scheduledRefreshMerchantItems from "./scheduled-tasks/merchants/refreshMerchantsItems";
import { merchantBuyItem } from "./controllers/game/merchants/merchantBuyItem";
import { merchantSellItem } from "./controllers/game/merchants/merchantSellItem";

const uri = process.env.MONGO_CONNECTION_URL;
if(!uri) throw new Error(".env file is not created")

mongoose.set("strictQuery", false);
mongoose.connect(uri, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});
mongoose.connection.on("connected", function () {
  console.log("connected to mongo");
  scheduledRefreshMerchantItems();
  // initInsert(); // insert necessery data to database
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/admin", express.static(__dirname + "/admin-panel"));

// LOGIN AND REGISTER
app.post("/register", createUser);
app.post("/login", loginUser);

// USER INFO
app.get("/user/details", getUserDetails);

// USER ACTIONCS
app.post("/user/createCharacter", createCharacter);
app.get("/user/getCharacter/:id", getCharacterById);
app.get("/user/getUserCharacters", getUserCharacters);

// HERO ACTIONS
// -- EQUIPMENT AND INVENTORY
app.post("/hero/equipment/update", updateInventoryToEquipment);
app.post("/hero/inventory/update", updateInventory);
app.post("/hero/equipmenttoinventory/update", updateEquipmentToInventory);

// -- STATISTICS
app.post("/hero/update/statistics", updateStatistics);

// ITEMS ACTIONS
app.post("/create/item", addItem);


// QUESTS ACTIONS
app.post("/quest/updateActiveQuest", updateActiveQuest);
app.post("/quest/clearActiveQuest", clearActiveQuest);
app.post("/quest/startQuestBattle", startQuestBattle);

// QUEST BATTLE
app.post("/quest/action/attack", characterAttack);
app.post("/quest/enemyTurn", enemyTurn);
app.post("/quest/battleEnd", questBattleEnd);

// TEMPLE
app.post("/temple/heal", templeHealing);
app.post("/temple/renew", templeHealRenew);

// MERCHANTS
app.post("/merchant/buy", merchantBuyItem);
app.post("/merchant/sell", merchantSellItem);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
