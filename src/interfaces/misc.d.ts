import { HtmlHTMLAttributes } from "react";

interface IAttributeType extends HtmlHTMLAttributes {
  src?: string;
  href?: string;
  target?: string;
  linktype?: IlinkType;
  width?: string;
  height?: string;
  alt?: string;
  allowtransparency?: string;
}
