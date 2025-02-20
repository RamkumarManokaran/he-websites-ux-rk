declare global {
  interface Window {
    OptanonWrapper?: () => void;
    Optanon?: {
      IsConsented: (categoryId: string) => boolean;
      IsAlertBoxClosed: any;
    };
    OnetrustActiveGroups?: string[];
    googletag?: typeof googletag;
  }

  const OnetrustActiveGroups: string[];

}

export {};