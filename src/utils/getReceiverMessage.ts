import { FormSchema } from "../App";

export const getReceiverMessage = (data: FormSchema) => `
${data.members.map((m) => `${m.name} (${m.birth})${m.isLeader ? " – činnovník" : ""}`).join("\n")}
${data.wantGiftConfirmation ? "Chci potvrzení o daru." : ""}
${data.wantBeOnWeb ? "Chci být uveden na webu." : ""}
`;
