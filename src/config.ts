import { Members } from "./model/Member";

interface Config {
  iban: string;
  accountNumber: string;
  recipientName: string;
  specificSymbol: number;
  currency: string;
  paymentsCategories: Members;
}

export const config: Config = {
  iban: "CZ3220100000002801050859",
  accountNumber: "2801050859/2010",
  recipientName: "Středisko Střelka",
  specificSymbol: 2026,
  currency: "CZK",
  paymentsCategories: [
    {
      name: "Další z rodiny",
      isDefault: true,
      price: 1300,
    },
    {
      name: "První z rodiny",
      order: 1,
      price: 2000,
    },
    {
      name: "Druhý z rodiny",
      order: 2,
      price: 1600,
    },
    {
      name: "Činovník",
      isLeader: true,
      price: 1000,
    },
    {
      name: "Sponzor",
      isSponsor: true,
      price: 5000,
    },
  ],
};
