type IdesignState = {
  projectId?: null | string;
  projectAuthor?: string;
  pageUri?: string;
  websiteSetting?: {
    siteName: string;
    favIco: string;
    socialImage: string;
    desc: string;
  };
  published?: boolean;
  pageMode?: number;
  settigMode: number;
  isDropEnabled?: boolean;
  analyticsID?: string;
  dropIndex?: number;
  fonts?: {
    font: string;
    weights: string[];
  }[];
  elements?: any[];
  pages?:Allow
};
