import { FormSchema } from "../App";

export const getReceiverMessage = (data: FormSchema) => `
${data.members.map((m) => `${m.name} (${m.birth})${m.isLeader ? " – činnovník" : ""}`).join("\n")}
${data.gift ? `Dar: ${data.gift}${data.wantGiftConfirmation ? ", chci potvrzení o daru" : ""}${data.wantBeOnWeb ? ", chci být uveden na webu" : ""}.` : ""}
`;
