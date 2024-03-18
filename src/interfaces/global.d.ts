// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare type Allow<T = any> = T | null;

interface ILinkElement {
  previmg: string;
  elid: string;
  inHTML: string;
  desc: string;
  attributes: IAttributeType | null;
  elementType: string;
  linktype?: IlinkType;
  classList: string;
  styles: {
    [key: string]: string;
  };
  elemType: string;
  elemEditable: boolean;
  enableDropping: boolean;
  fonts?: FontOption[];
  elements: ILinkElement[]; // This property is occurring recursively
}
interface Option {
  label?: string
  value?: string | boolean | number
}