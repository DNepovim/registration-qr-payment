import { FormMember } from "../App";
import { config } from "../config";
import { isDefaultMember, isLeaderMember, isRestMember } from "../model/Member";

export const getMemberPrice = (members: FormMember[], index: number) => {
  const member = members[index];
  const defaultMember = config.paymentsCategories.find(isDefaultMember);
  const defaultMemberPrice = defaultMember?.price ?? 0;

  if (member.isLeader) {
    const leaderMember = config.paymentsCategories.find(isLeaderMember);
    return leaderMember?.price ?? defaultMemberPrice;
  }

  const countOfLeaders = members.filter((m) => m.isLeader).length;

  const restMember = config.paymentsCategories
    .filter(isRestMember)
    .find((m) => m.order - 1 - countOfLeaders === index);

  return restMember?.price ?? defaultMemberPrice;
};
