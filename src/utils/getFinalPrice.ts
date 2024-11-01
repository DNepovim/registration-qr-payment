import { FormSchema } from "../App";
import { getMemberPaymentCategory } from "./getMemberPrice";

export const getFinalPrice = (data: FormSchema): number =>
  data.members.reduce(
    (acc, _, i) =>
      acc + (getMemberPaymentCategory(data.members, i)?.price ?? 0),
    0,
  );
