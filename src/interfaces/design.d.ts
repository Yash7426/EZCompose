
interface FontOption {
  font: string;
  weights?: Variant[] |string[];
}


import { Id } from "../../convex/_generated/dataModel";

type IdesignState = {
  _id?: Id<"webpage">;
  faviconUri?: string;
  socialImage?: string;
  description?: string;
  websiteId?: null | Id<"website">;
  author?: Id<"users"> | null;
  url?: string;
  prevImageUri?: string;
  title?: string;
  isPublished?: boolean;
  elementType?:"Header Layout"
  elid?:string
  pageMode?: number | bigint;
  settingMode?: number | bigint;
  isDropEnabled?: boolean;
  analyticsId?: string;
  dropIndex?: number | bigint;
  fonts?:FontOption[];
  elements?:IdesignState[];
  pages?:Page[]
  styles?:Partial<React.CSSProperties>
  enableDropping?:boolean
};

interface Page {
  _id: Id<"webpage">;
  pageName: string;
}

type IpageState = {
  _id?: Id<"website">;
  name?: string;
  pages?: [];
  bannerImage?: string;
  users?: Id<"users">[];
};
