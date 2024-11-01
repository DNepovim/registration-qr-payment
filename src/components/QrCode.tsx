import { useEffect, useState } from "react";
import { FormSchema } from "../App";
import { config } from "../config";
import { getFinalPrice } from "../utils/getFinalPrice";
import { getReceiverMessage } from "../utils/getReceiverMessage";
import qrcode from "qrcode";

export interface QrCodeProps {
  data: FormSchema;
}

export const QrCode: React.FC<QrCodeProps> = ({ data }) => {
  const MSG = getReceiverMessage(data, true);

  const paymentDescription = {
    ACC: config.accountNumber,
    AM: getFinalPrice(data),
    CC: config.currency,
    MSG,
    "X-SS": config.specificSymbol,
    "X-VS": data.members[0].birth,
  };

  console.log("MSG", MSG, MSG.length);

  const spaidString = `SPD*1.0*${Object.entries(paymentDescription)
    .map(([key, value]) => `${key}:${value}`)
    .join("*")}`;

  const [qrUrl, setQrUrl] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const url = await qrcode.toDataURL(spaidString);
      setQrUrl(url);
    })();
  }, [spaidString]);

  return qrUrl ? (
    <img className="rounded-lg m-0" src={qrUrl} alt="QR platba" />
  ) : (
    "Načítám QR kód..."
  );
};
