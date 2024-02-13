import { Id } from "../../convex/_generated/dataModel";

type IuserDetails = {
  name: string;
  email: string;
  _id: Id<"users">;
  profileImage?: string;
  tokenIdentifier: string;
};

type Iuser = {
  name: string;
  email: string;
  _id: Id<"users">;
  profileImage?: string;
  tokenIdentifier: string;
} | null;
