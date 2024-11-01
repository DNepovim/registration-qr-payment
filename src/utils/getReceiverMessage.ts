import { FormSchema } from "../App";

export const getReceiverMessage = (data: FormSchema) =>
  `${data.members.map((m) => `${m.name} (${m.birth})${m.isLeader ? " - činovník" : ""}`).join("\n")}${data.wantGiftConfirmation ? "\nChci potvrzení o daru." : ""}${data.wantBeOnWeb ? "\nChci být uveden na webu." : ""}`;
