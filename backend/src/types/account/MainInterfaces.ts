import mongoose, { Document, ObjectId } from "mongoose";

export interface ICharacter extends mongoose.Document {
  nickname: string;
  class: string;
  avatar: string;
  progression: {
    level: number;
    levelExperience: number;
    previousLevelExperience: number;
    experience: number;
    availableStatPoints: number;
  };
  activeQuest: {
    timeStarted: string | null;
    quest: {
      title: string;
      description: string;
      duration: number;
      battleStarted: boolean;
      battleWinner: 1 | 2 | null;
      whosTurn: 1 | 2;
      rewards: {
        gold: number;
        xp: number;
        itemId?: string;
      };
    } | null;
    enemy: {
      name: string | null;
      health: number;
      attackText: string;
      maxHealth: number;
      level: number;
      damage: number;
      skills: ISkills[] | null;
      avatar: string | null;
      statistics: {
        strength: number;
        dexterity: number;
        condition: number;
        intelligence: number;
        wisdom: number;
        charisma: number;
      };
    } | null;
    textLogs: string[];
  };
  availableQuests: [IQuest];
  statistics: {
    strength: number;
    dexterity: number;
    condition: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
  owner: mongoose.Types.ObjectId | IUser;
  equipment: [
    {
      type: string;
      item: IItem | null;
    }
  ];
  inventory: [
    {
      slotIndex: number;
      item: IItem | null;
    }
  ];
  heroValues: {
    gold: number;
    health: number;
    currentHealth: number;
    currentMana: number;
    mana: number;
    armor: number;
    damage: number;
  };
  heroValuesWithItems?: any;
  extras: {
    availableHeals: number;
    healRenewDate: string | null;
  };
}

export interface IUser extends Document {
  accountname: string;
  email: string;
  password: string;
  characters: mongoose.Types.Array<ICharacter["_id"]>;
}

export interface IItem extends mongoose.Document {
  name: string;
  type: string;
  minDamage?: number;
  maxDamage?: number;
  image: string;
  armor?: number;
  statistics: {
    strength?: number;
    condition?: number;
    dexterity?: number;
    wisdom?: number;
    intelligence?: number;
    charisma?: number;
  };
}

export interface IEquipment extends mongoose.Document {
  type: string;
  item: IItem | null;
}

export interface IQuest {
  _id: ObjectId;
  title: string;
  description: string;
  duration: number;
  battleStarted: boolean;
  battleWinner: 1 | 2 | null;
  whosTurn: 1 | 2;
  rewards: {
    gold: number;
    xp: number;
    itemId?: string;
  }
}

export interface ISkills {
  skillName: string | null;
  damage: number | null;
  cooldown: number;
  text: string | null;
}

export interface IMerchant {
  name: string;
  itemTypes: string[];
  randomItems: boolean;
  interestedIn: string[];
  staticItems: { item: IItem | null }[];
}