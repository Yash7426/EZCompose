type IdesignState = {
  _id?:string;
  projectId?: null | string;
  projectAuthor?: string;
  pageUri?: string;
  prevImgUri?:string;
  websiteSetting?: {
    siteName: string;
    favIco: string;
    socialImage: string;
    desc: string;
  };
  published?: boolean;
  pageMode?: number;
  settingMode?: number;
  isDropEnabled?: boolean;
  analyticsID?: string;
  dropIndex?: number;
  fonts?: {
    font: string;
    weights: string[];
  }[];
  elements?:IdesignState[];
  pages?:Page[]
};


interface Page {
  pageId: string;
  pageName: string;
}
