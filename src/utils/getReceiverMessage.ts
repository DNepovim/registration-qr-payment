import { FormSchema } from "../App";

export const getReceiverMessage = (data: FormSchema, compact: boolean = false) => {
	const wanted = [
		data.wantGiftConfirmation && "potvrzení",
		data.wantBeOnWeb && "web",
	].filter(Boolean);

    return [
        data.members.map((m) => `${m.name} (${m.birth}${m.isLeader ? ", čin." : m.isSponsor ? ", sp." : ""})`).join(compact ? ", " : "\n"),
        wanted.join(", "),
    ].filter(Boolean).join(compact ? ", " : "\n");
};
