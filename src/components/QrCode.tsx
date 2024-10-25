import { FormSchema } from "../App";
import { config } from "../config";
import { getFinalPrice } from "../utils/getFinalPrice";
import { getReceiverMessage } from "../utils/getReceiverMessage";
import { QRPayment } from "@tedyno/cz-qr-payment";

export interface QrCodeProps {
  data: FormSchema;
}

export const QrCode: React.FC<QrCodeProps> = ({ data }) => {
  const qrPayment = new QRPayment(
    getFinalPrice(data),
    `${config.accountNumber}/${config.bankCode}`,
    {
      message: getReceiverMessage(data),
      SS: String(config.specificSymbol),
      VS: data.members[0].birth,
    },
  );
  return (
    <img
      src={`data:image/svg+xml;utf8,${encodeURIComponent(qrPayment.getSvg())}`}
      alt="QR platba"
    />
  );
};
