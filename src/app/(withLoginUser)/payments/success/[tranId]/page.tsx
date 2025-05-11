import PaymentSuccess from "@/components/modules/Payment/PaymentSuccess";

const PaymentSuccessPage = ({ params }: { params: { tranId: string } }) => {
  return (
    <div>
      <PaymentSuccess tranId={params.tranId} />
    </div>
  );
};

export default PaymentSuccessPage;
