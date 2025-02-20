export interface DiscoverContentfulInterface {
  data: {
    contentData?: ContentData;
  };
}

export interface ContentData {
  items?: ContentItem[];
}

export interface ContentItem {
  bodyContentCollection?: BodyContentCollection;
}

export interface BodyContentCollection {
  items?: BodyContentItem[];
}

export interface BodyContentItem {
  mediaCardsCollection?: MediaCardsCollection;
}

export interface MediaCardsCollection {
  items?: MediaCardItem[];
}

export interface MediaCardItem {
  title: string;
  subTitle: string;
  internalName: string;
  backgroundColor: string;
  cta: CallToAction;
  image: Image;
}

export interface CallToAction {
  internalName: string;
  primaryCtaUrl: string;
  primaryCtaLabel: string;
  secondaryCtaUrl: string;
  secondaryCtaLabel: string;
  primaryCtaTarget: string;
  secondaryCtaTarget: string;
  flagStyle: string;
}

export interface Image {
  imageTitle: string;
  imgAltText: string;
  imgUpload: ImageUpload;
}

export interface ImageUpload {
  url: string;
  height: string;
  width: string;
}
