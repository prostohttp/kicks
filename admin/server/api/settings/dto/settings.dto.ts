export interface SettingsDto {
  _id: string;
  logo: string;
  localeDashboard: string;
  localeStore: string;
  currency: string;
  en: {
    title: string;
    description: string;
    email: string;
    address: string;
  };
  ru: {
    title: string;
    description: string;
    email: string;
    address: string;
  };
}
