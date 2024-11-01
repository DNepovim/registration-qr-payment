import { FormSchema } from "../App";

export const getReceiverMessage = (data: FormSchema, compact: boolean = false) => {
	const wanted = [
		data.wantGiftConfirmation && "potvrzení o daru",
		data.wantBeOnWeb && "být na webu",
	].filter(Boolean);

    return [
        data.members.map((m) => `${m.name} (${m.birth}${m.isLeader ? ", činovník" : m.isSponsor ? ", sponzor" : ""})`).join(compact ? ", " : "\n"),
        wanted.length && `Chci ${wanted.join(" a ")}.`,
    ].filter(Boolean).join(compact ? ". " : "\n");
};
