import { FormSchema } from "../App";

export const getReceiverMessage = (data: FormSchema) => {
  const wanted = [
    data.wantGiftConfirmation && "potvrzení",
    data.wantBeOnWeb && "web",
  ].filter(Boolean);

  const message = [
    data.members
      .map(
        (m) =>
          `${m.name} (${m.birth}${m.isLeader ? ", č." : m.isSponsor ? ", s." : ""})`,
      )
      .join(", "),
    wanted.join(", "),
  ]
    .filter(Boolean)
    .join(", ");

  if (message.length <= 140) {
    return message;
  }

  return [
    data.members
      .map(
        (m) =>
          `${m.name
            .split(" ")
            .map((s) => s.substring(0, 1))
            .join(
              "",
            )} (${m.birth}${m.isLeader ? ", č." : m.isSponsor ? ", s." : ""})`,
      )
      .join(", "),
    wanted.join(", "),
  ]
    .filter(Boolean)
    .join(", ");
};
