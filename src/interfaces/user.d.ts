import { Id } from "../../convex/_generated/dataModel";

type IuserDetails = {
  user: string;
  // name: string;
  email: string;
  _id: Id<"users">|null;
  
  // profileImage?: string;
  // tokenIdentifier: string;
};

type Iuser = {
  name: string;
  email: string;
  _id: Id<"users">;
  profileImage?: string;
  tokenIdentifier: string;
} | null;
