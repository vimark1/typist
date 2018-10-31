interface ProviderData {
  uid: string;
  providerId: string;
}

export interface User {
  uid: string;
  email: string;
  displayName: string;
  providerData: ProviderData[];
}

