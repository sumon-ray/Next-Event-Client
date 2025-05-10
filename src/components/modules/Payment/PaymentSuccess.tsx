"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/ui/Loader/Loader";
import { paymentValidate } from "@/services/PaymentService";
import Swal from "sweetalert2";

interface Props {
  tranId: string;
}

const PaymentSuccess = ({ tranId }: Props) => {
  const [message, setMessage] = useState("Validating your payment...");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      if (!tranId) {
        window.location.reload();
      }
    }, 1000);

    const validatePayment = async () => {
      if (!tranId) {
        setMessage("Transaction ID is missing.");
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Transaction ID not found!",
          footer: '<a href="#">Why do I have this issue?</a>',
          confirmButtonText: "OK",
          allowOutsideClick: true,
        }).then(() => {
          router.push("/events");
        });
        return;
      }

      try {
        const response = await paymentValidate(tranId);

        if (response?.success) {
          setMessage("Payment validated successfully!");
          Swal.fire({
            icon: "success",
            title: "Payment Successful",
            text: "Click OK or outside to continue.",
            confirmButtonText: "OK",
            allowOutsideClick: true,
          }).then(() => {
            router.push("/events");
          });
        } else {
          setMessage("Payment validation failed. Please contact support.");
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Payment validation failed.",
            footer: '<a href="#">Why do I have this issue?</a>',
            confirmButtonText: "OK",
            allowOutsideClick: true,
          }).then(() => {
            router.push("/events");
          });
        }
      } catch (error) {
        console.error("Validation error:", error);
        setMessage("An error occurred during payment validation.");
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<a href="#">Why do I have this issue?</a>',
          confirmButtonText: "OK",
          allowOutsideClick: true,
        }).then(() => {
          router.push("/events");
        });
      } finally {
        setLoading(false);
      }
    };

    validatePayment();
  }, [tranId, router]);

  return (
    <div className="flex flex-col items-center justify-center h-[60dvh] text-center space-y-4">
      {loading && <Loader />}
      <p className="text-lg font-semibold text-gray-700">{message}</p>
    </div>
  );
};

export default PaymentSuccess;
