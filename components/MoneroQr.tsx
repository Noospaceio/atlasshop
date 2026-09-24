export default function MoneroQr({
  address,
  amount,
}: {
  address: string;
  amount?: number;
}) {
  const uri = amount
    ? `monero:${address}?tx_amount=${amount}`
    : `monero:${address}`;
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=8&data=${encodeURIComponent(
    uri
  )}`;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="border border-umber/30 bg-vellum p-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={qrSrc}
          alt="QR code encoding the Monero payment address"
          width={240}
          height={240}
        />
      </div>
      <p className="text-xs text-umber/70">
        Scan with a Monero wallet to fill in the address{amount ? " and amount" : ""}.
      </p>
    </div>
  );
}
