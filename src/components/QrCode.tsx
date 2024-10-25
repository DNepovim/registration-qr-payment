import { FormSchema } from "../App";
import { config } from "../config";
import { getFinalPrice } from "../utils/getFinalPrice";
import { getReceiverMessage } from "../utils/getReceiverMessage";

const env = import.meta.env;

export interface QrCodeProps {
  data: FormSchema;
}

export const QrCode: React.FC<QrCodeProps> = ({ data }) => {
  const query = new URLSearchParams();
  query.set("accountNumber", String(config.accountNumber));
  query.set("bankCode", String(config.bankCode));
  query.set("amount", String(getFinalPrice(data)));
  query.set("ss", String(config.specificSymbol));
  query.set("currency", "CZK");
  query.set("vs", data.members[0].birth);
  query.set("message", getReceiverMessage(data));

  return <img src={`${env.VITE_API_BASE_URL}?${query.toString()}`} />;
};
