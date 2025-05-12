import PaymentSuccess from "@/components/modules/Payment/PaymentSuccess";

const PaymentSuccessPage = async ({
  params,
}: {
  params: Promise<{ tranId: string }>;
}) => {
    const { tranId } = await params;
  return (
    <div>
      <PaymentSuccess tranId={tranId} />
    </div>
  );
};

export default PaymentSuccessPage;
