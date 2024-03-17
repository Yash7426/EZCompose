
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
  websiteId?: Id<"website"> ;
  author?: Id<"users">;
  url?: string;
  prevImageUri?: string;
  title?: string;
  isPublished?: boolean;
  elementType?:"Header Layout"
  elid?:string
  pageMode?:  bigint;
  settingMode?:  bigint;
  isDropEnabled?: boolean;
  analyticsId?: string;
  dropIndex?: bigint;
  fonts?:FontOption[];
  elements?:IdesignState[];
  pages?:Page[]
  styles?:Partial<React.CSSProperties>
  enableDropping?:boolean
};

interface Page {
  pageId: Id<"webpage">;
  pageName: string;
}

type IpageState = {
  _id?: Id<"website">;
  name?: string;
  pages?: Page[];
  bannerImage?: string;
  users?: Id<"users">[];
  description?:string
};
