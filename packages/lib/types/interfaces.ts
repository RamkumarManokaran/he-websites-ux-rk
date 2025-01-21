export interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
  isActive: boolean;
}
export interface Subject {
  description: string;
  url: string;
  category_code: string;
  browse_cat_id: string;
  parent_subject: string | null;
  qual_Code: string;
}
export interface SearchFormHandle {
  activeTab: string;
  isCourseType: boolean;
  isSubjectClicked: boolean;
  isLocationClicked: boolean;
  isAdviceClicked: boolean;
  isUniversityClicked: boolean;
  courseType: string;
  university: string;
  subject: string;
  location: string;
  advice: string;
}

export interface CarouselItem {
  type: "pictureCard" | "videoCard" | "articleCard" | "courseCard";
  id?: string;
  src?: string;
  alt?: string;
  link?: string;
  thumbnailImg?: string;
  playBtn?: string;
  videoTitle?: string;
  authorImg?: string;
  authorName?: string;
  dayPosted?: string;
  uniName?: string;
  articleImg?: string;
  articleTitle?: string;
  articleContent?: string;
  articlePostedDate?: string;
  courseImg?: string;
  closebtn?: string;
  courseTitle?: string;
  uniLogo?: string;
  courseuniName?: string;
  countryFlag?: string;
  countryName?: string;
  degreeType?: string;
  years?: string;
  fees?: string;
  isFastlaneTag?: boolean | undefined;
  subText?: string;
}

export interface CheckboxOption {
  id: string;
  label: string;
}

export interface homepageBanner {
  title: string;
  description: string;
  desktopImg: string;
  mobileImg: string;
  ctaText: string;
}

export interface OnboardingStepProps {
  questionText: string;
  subText: string;
}

export interface CheckboxProps {
  labelText: string;
  fieldId: string;
  name: string;
  checkboxStyles?: string;
  checkboxPadstyles?: string;
  disableChange?: () => void;
}

export interface listDropdownProps {
  options: listDropdownOptionProps[];
}
export interface footerProps {
  title: string;
  description: string;
  ctaText: string;
  linkTitle: string;
  socialLinkTitle: string;
  navLinks: string[];
  socialLinks: string[];
  copyRights: string;
}

export interface MainDropdownProps {
  options: string[];
  isOpen: boolean;
  handleOptionClick: (option: string) => void;
}
export interface logoSliderProps {
  imgSrc: string[];
}

export interface listDropdownOptionProps {
  listDropdownOptionHeader: string;
  listDropDownOptions: dropdownProps[];
}
export interface dropdownProps {
  id: number;
  label: string;
  value: string;
}
export interface logoSliderProps {
  imgSrc: string[];
}

export interface FooterDataInterface {
  footerNavBtmCollection: FooterNavBtmCollection;
  navApplinksCollection: NavApplinksCollection;
  footerNavCollection: FooterNavCollection;
  navSocialLinksCollection: NavSocialLinksCollection;
}

export interface FooterNavCollection {
  items: FooterNavCollectionItem[];
}

export interface FooterNavCollectionItem {
  navTitle: string;
  navChildC1Collection: FooterNavChildCollection;
}
export interface NavSocialLinksCollection {
  items: NavItem[];
}
export interface NavIcon {
  url: string;
  width: number;
  height: number;
}

export interface NavChild {
  navName: string;
  navTitle: string;
  navUrl: string | null;
  navCtaTarget: string | null;
  navIcon: NavIcon;
}

interface NavChildCollection {
  items: NavChild[];
}

interface NavItem {
  navName: string;
  navUrl: string | null | undefined;
  navChildC1Collection: NavChildCollection;
}
export interface FooterNavChildCollection {
  items: FooterNavChildItem[];
}

export interface FooterNavChildItem {
  navTitle: string;
  navUrl: string | null;
  navCtaTarget: "Open in same tab" | "Open in new tab" | null;
}

export interface NavApplinksCollection {
  items: AppLinkItem[];
}

export interface AppLinkItem {
  primaryCtaLabel: string;
  primaryCtaUrl: string;
  primaryCtaEventName: string;
}

export interface FooterNavBtmCollection {
  items: FooterNavItem[];
}

export interface FooterNavItem {
  navTitle: string | null;
  navUrl: string | null;
}

export interface SliderBannerCollection {
  items: DynamicMediaComponent[];
}
export interface DynamicMediaComponentArray {
  dynamicMediaComponent: DynamicMediaComponent[];
}

export interface DynamicMediaComponent {
  __typename: "DynamicMediaComponent";
  longDescription: LongDescription;
  title: string;
  internalName: string;
  backgroundColor: string;
  cta: CTA | null;
  image: Imagee;
  video: null;
}

export interface Imagee {
  imageTitle: string | null;
  imgAltText: string;
  imgUpload: ImageUpload;
}

export interface ImageUpload {
  url: string;
  height: number;
  width: number;
}
export interface LongDescription {
  json: JSONContent;
}

export interface JSONContent {
  data: Record<string, any>;
  content: Paragraph[];
  nodeType: string;
}

export interface Paragraph {
  data: Record<string, any>;
  content: TextNode[];
  nodeType: string;
}

export interface TextNode {
  data: Record<string, any>;
  marks: any[];
  value: string;
  nodeType: string;
}

export interface MultipleCardContainer {
  __typename: "MultipleCardContainer";
  sys: {
    id: string;
  };
  internalName: string;
  cardSectionTitle: string;
  shortDescription: string;
  longDescription: string | null;
  flagComponentStyle: string;
  callToAction: CallToAction | null;
}

export interface CallToAction {
  __typename: "CallToActionCta";
  internalName: string;
  primaryCtaLabel: string;
  primaryCtaUrl: string;
  primaryCtaTarget: string;
  primaryCtaEventName: string | null;
  flagStyle: string;
}

export interface ReviewDetailsList {
  reviewDetail: ReviewDetails[];
}

export interface ReviewDetails {
  reviewerName: string;
  comment: string;
  initial: string;
  collegetextkey: string;
  to_char: string;
  collegeId: string;
  collegeName: string;
  courseTitle: string;
  overallRating: string;
}

export interface CTA {
  internalName: string;
  primaryCtaUrl: string | null;
  primaryCtaLabel: string | null;
  primaryCtaEventName: string | null;
  secondaryCtaUrl: string | null;
  secondaryCtaLabel: string | null;
  primaryCtaTarget: string | null;
  secondaryCtaTarget: string | null;
  flagStyle: string | null;
}

export interface Icon {
  url: string;
  width: number;
  height: number;
  title: string;
}
export interface Image {
  sys: {
    id: string;
  };
  url: string;
  width: number;
  height: number;
  title: string;
}
export interface Cta {
  primaryCtaLabel: string;
  primaryCtaUrl: string;
  primaryCtaEventName: string;
}

export interface StatInfo {
  internalName: string;
  statLabel: string;
  statNumber: string;
  icon: Icon;
}

export interface PageStatPodContainerInterface {
  bgColor: string;
  sys: { id: string };
  marginPadding: string;
  statPodContainerName: string;
  statinfoCollection: {
    items: StatInfo[];
  };
  image: Image;
  cta: Cta;
}

export interface HomePageStatInterface {
  data: {
    contentData: {
      items: [
        {
          bodyContentCollection: {
            items: Array<{
              __typename: string;
              mediaCardsCollection: {
                items: PageStatPodContainerInterface[];
              };
            }>;
          };
        },
      ];
    };
  };
}

export interface DataInterface {
  items: DynamicMediaComponent[];
}

export interface LongDescription {
  json: JSONContent;
}

export interface JSONContent {
  data: Record<string, any>;
  content: Paragraph[];
  nodeType: string;
}

export interface Paragraph {
  data: Record<string, any>;
  content: TextNode[];
  nodeType: string;
}

export interface TextNode {
  data: Record<string, any>;
  marks: any[];
  value: string;
  nodeType: string;
}

export interface ImageUpload {
  url: string;
  height: number;
  width: number;
}

export interface MultipleCardContainer {
  __typename: "MultipleCardContainer";
  internalName: string;
  cardSectionTitle: string;
  shortDescription: string;
  longDescription: string | null;
  flagComponentStyle: string;
}

export interface MultipleCardContainer {
  __typename: "MultipleCardContainer";
  internalName: string;
  cardSectionTitle: string;
  shortDescription: string;
  longDescription: string | null;
  flagComponentStyle: string;
}

export interface TagCloudDataInterface {
  tagName: string;
  tagUrl: string | null;
}

export interface HomePageInterface {
  data: {
    contentData: {
      items: [
        {
          gaPageName: any;
          bodyContentCollection: {
            items: Array<{
              __typename: string;
              mediaCardsCollection: {
                items: TagCloudDataInterface[];
              };
            }>;
          };
        },
      ];
    };
  };
}

export interface MultipleCardContainer {
  __typename: "MultipleCardContainer";
  internalName: string;
  cardSectionTitle: string;
  shortDescription: string;
  longDescription: string | null;
  flagComponentStyle: string;
}

export interface TagCloudDataInterface {
  tagName: string;
  tagUrl: string | null;
  eventName: string | null;
}

export interface HomePageInterface {
  data: {
    contentData: {
      items: [
        {
          gaPageName: any;
          bodyContentCollection: {
            items: Array<{
              __typename: string;
              mediaCardsCollection: {
                items: TagCloudDataInterface[];
              };
            }>;
          };
        },
      ];
    };
  };
}
export interface StudyLevel {
  qualUrl: string;
  qualCode: string;
  qualDesc: string;
}

export interface CourseDetail {
  description: string | null;
  url: string | null;
  categoryCode: string | null;
  browseCatId: string;
  parentSubject: string | null;
  qualCode: string | null;
}

export interface Location {
  regionId: number;
  regionUrl: string | null;
  regionName: string;
}

export interface CourseData {
  studyLevelList: StudyLevel[];
  courseDetails: CourseDetail[];
  locationList: Location[];
}

// Types for uni_data
export interface University {
  collegeId: number;
  collegeNameDisplay: string;
  collegeNameAlias: string;
  collegeName: string;
}

export type UniData = University[];
export interface Topnav {
  data: Data;
}

export interface Data {
  contentData: ContentData;
}

export interface ContentData {
  items: Item[];
}

export interface Item {
  headerTrackingScripts: any;
  websiteLogo: WebsiteLogo;
  universalSearchPanel: UniversalSearchPanel;
  headerMainMenuCollection: HeaderMainMenuCollection;
}

export interface WebsiteLogo {
  url: string;
  width: number;
  height: number;
}

export interface UniversalSearchPanel {
  internalName: string;
  navigationElementsCollection: NavigationElementsCollection;
}

export interface NavigationElementsCollection {
  items: Item2[];
}

export interface Item2 {
  navName: string;
  navUrl: any;
  navCtAlabel: string;
  navIcon: any;
  navCtaTarget: any;
  flagNavItemStyle: string;
}

export interface HeaderMainMenuCollection {
  items: Item3[];
}

export interface Item3 {
  navName: string;
  navTitle: string;
  navUrl: any;
  navIcon?: NavIcon;
  navChildC1Collection: NavChildC1Collection;
  navChildC2Collection: NavChildC2Collection;
  navChildC3Collection: NavChildC3Collection;
  navChildC4Collection: NavChildC4Collection;
}

export interface NavIcon {
  url: string;
  width: number;
  height: number;
}

export interface NavChildC1Collection {
  items: Item4[];
}

export interface Item4 {
  navName: string;
  navUrl?: string;
  navTitle: string;
  navCtAlabel: any;
  navIcon: any;
  navCtaTarget?: string;
  flagNavItemStyle?: string;
}

export interface NavChildC2Collection {
  items: Item5[];
}

export interface Item5 {
  navName: string;
  navUrl: any;
  navTitle: string;
  navCtAlabel: any;
  navIcon?: NavIcon2;
  navCtaTarget: any;
  flagNavItemStyle: string;
}

export interface NavIcon2 {
  url: string;
  width: number;
  height: number;
}

export interface NavChildC3Collection {
  items: Item6[];
}

export interface Item6 {
  navName: string;
  navTitle: string;
  navUrl?: string;
  navCtAlabel: any;
  navIcon?: NavIcon3;
  navCtaTarget?: string;
  flagNavItemStyle: string;
}

export interface NavIcon3 {
  url: string;
  width: number;
  height: number;
}

export interface NavChildC4Collection {
  items: Item7[];
}

export interface Item7 {
  navName: string;
  navUrl?: string;
  navTitle: string;
  navCtAlabel: any;
  navIcon?: NavIcon4;
  navCtaTarget?: string;
  flagNavItemStyle: string;
}

export interface NavIcon4 {
  url: string;
  width: number;
  height: number;
}
