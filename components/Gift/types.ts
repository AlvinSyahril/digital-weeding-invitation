export interface BankAccount {
  name: string;
  account: string;
  recipient: string;
}

export interface GiftData {
  title: string;
  description: string;
  banks: BankAccount[];
}

export interface GiftProps {
  gift: GiftData | null;
}
