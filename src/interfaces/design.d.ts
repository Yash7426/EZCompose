import { Id } from "../../convex/_generated/dataModel";

type IdesignState = {
  _id?: Id<"webpage">;
  faviconUri?: string;
  socialImage?: string;
  description?: string;
  websiteId?: null | Id<"website">;
  author?: Id<"users">;
  url?: string;
  prevImageUri?: string;
  title: string;
  isPublished?: boolean;
  pageMode?: number;
  settingMode?: number;
  isDropEnabled?: boolean;
  analyticsId?: string;
  dropIndex?: number;
  fonts?: {
    font: string;
    weights: string[];
  }[];
  elements?: {}[];
  // pages?: Page[];
};

interface Page {
  _id: Id<"webpage">;
  pageName: string;
}
