
type IrelstrArray=Array<Allow>
type LinkHTMLType= [__url:string,__type:TargetType,__relStr:IrelstrArray]
enum IcurrentMode {
    none = "none",
    url = "url",
    email = "email",
    phone = "phone",
    scroll = "scroll"
}
enum TargetType{
    "_self",
    "blank"
}
enum TargetSroll{
    "top",
    "bottom"
}
type ILinkState={
    currentMode: IcurrentMode;
    urlLink:IUrlLink
    emailLink: {
        targetEmail: string;
        targetSubject: string;
    };
    phoneLink: {
        targetPhone: string
    };
    scrollLink: {
        targetScroll: TargetSroll
    };
}
type IUrlLink={
    targetURL: string;
    targetType: TargetType;
    rel: {
        opner: boolean;
        refer: boolean;
        follow: boolean;
        sponsored: boolean;
    };
}

export const createLinkHTMLFromURI = ([__url, __type, _relStr]:LinkHTMLType):HTMLAnchorElement => {
    let a = document.createElement('a');
    a.href = __url;
    a.target = __type as unknown as string;
    a.rel = _relStr.join(" ");
    return a;
}

export const createLinkHTML = (addLinkState:ILinkState):LinkHTMLType => {
    let __url = addLinkState.urlLink.targetURL;
    let __type = addLinkState.urlLink.targetType;
    let __rel = addLinkState.urlLink.rel;
    let _relStr = [];

    if (__rel.follow) {
        _relStr.push("nofollow");
    }

    if (__rel.opner) {
        _relStr.push("noopner")
    }

    if (__rel.refer) {
        _relStr.push("noreffer")
    }

    if (__rel.sponsored) {
        _relStr.push("sponsored")
    }

    return [__url, __type, _relStr];
}

export const createEmailHTML = (addLinkState:ILinkState):LinkHTMLType => {
    let __url = "mailto:";
    __url += addLinkState.emailLink.targetEmail;

    if (addLinkState.emailLink.targetSubject) {
        __url += "?subject=" + addLinkState.emailLink.targetSubject;
    }

    return [__url, TargetType._self, []];
}

export const createPhoneHTML = (addLinkState:ILinkState):LinkHTMLType => {
    let __url = "tel:";
    __url += addLinkState.phoneLink.targetPhone;

    return [__url, TargetType._self, []];
}

export const createScrollHTML = (addLinkState:ILinkState):LinkHTMLType => {
    let __url = "modify:";

    if (addLinkState.scrollLink.targetScroll === TargetSroll.top) {
        __url += "pageFunctionMoveToTop"
    } else {
        __url += "pageFunctionMoveToBottom"
    }
    // __url += addLinkState.phoneLink.targetPhone;

    return [__url, TargetType._self, []];
}