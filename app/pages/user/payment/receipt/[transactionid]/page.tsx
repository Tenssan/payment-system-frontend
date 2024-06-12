"use client";
import Receipt from "@/app/components/payment/Receipt";
import { useParams } from "next/navigation";

const PaymentReceiptPage: React.FC = () => {
  const params = useParams();
  console.log("t", params);
  return <Receipt transactionId={params.transactionid as string} />;
};

export default PaymentReceiptPage;
