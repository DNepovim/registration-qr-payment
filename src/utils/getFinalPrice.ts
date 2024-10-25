import { FormSchema } from "../App";
import { getMemberPaymentCatogory } from "./getMemberPrice";

export const getFinalPrice = (data: FormSchema): number =>
  data.members.reduce(
    (acc, _, i) =>
      acc + (getMemberPaymentCatogory(data.members, i)?.price ?? 0),
    0,
  ) + (data.gift ?? 0);
