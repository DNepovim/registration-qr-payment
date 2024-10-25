import { FormSchema } from "../App";
import { getMemberPrice } from "./getMemberPrice";

export const getFinalPrice = (data: FormSchema): number =>
  data.members.reduce((acc, _, i) => acc + getMemberPrice(data.members, i), 0) +
  (data.gift ?? 0);
