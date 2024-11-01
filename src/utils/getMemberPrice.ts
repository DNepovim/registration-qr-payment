import { FormMember } from "../App";
import { config } from "../config";
import { isDefaultMember, isLeaderMember, isRestMember, isSponsorMember } from "../model/Member";

export const getMemberPaymentCategory = (
  members: FormMember[],
  index: number,
) => {
  const member = members[index];
  const defaultMember = config.paymentsCategories.find(isDefaultMember);

  if (member.isLeader) {
    const leaderMember = config.paymentsCategories.find(isLeaderMember);
    return leaderMember ?? defaultMember;
  }


  if (member.isSponsor) {
    const leaderMember = config.paymentsCategories.find(isSponsorMember);
    return leaderMember ?? defaultMember;
  }

  const countOfLeadersAfter = members.reduce(
    (acc, m, i) => ((m.isLeader || m.isSponsor) && i > index ? acc + 1 : acc),
    0,
  );

  const restMember = config.paymentsCategories
    .filter(isRestMember)
    .find((m) => m.order - 1 - countOfLeadersAfter === index);

  return restMember ?? defaultMember;
};
