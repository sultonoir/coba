"use client";
import Loader from "@/components/shared/Loader";
import { shootFireworks } from "@/libs/succes";
import { Transition } from "@headlessui/react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-hot-toast";

interface Iparams {
  id: string;
}

const SuccessClient = ({ params }: { params: Iparams }) => {
  const [showMessage, setShowMessage] = React.useState(false);

  React.useEffect(() => {
    axios
      .put("/api/reservations", {
        status: "success",
        reservationId: params.id,
      })
      .then(() => {
        setShowMessage(true);
        shootFireworks();
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally();
  }, []);

  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center">
      {!showMessage ? (
        <Loader />
      ) : (
        <Transition
          show={showMessage}
          enter="transition-opacity duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="flex flex-col items-center">
            <span className="w-[150px] relative">
              <Image
                width={150}
                height={150}
                src="/success.svg"
                alt="success"
              />
            </span>

            <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
            <p className="text-gray-600 text-center">
              Thank you for your payment. Your transaction has been successfully
              processed.
            </p>
            <p className="text-primary text-center">
              tell the receptionist your email for check in
            </p>
            <button
              onClick={() => router.push("/")}
              className="bg-rose-500 hover:bg-rose-600 text-white font-bold px-4 py-2 rounded-md mt-4 focus:outline-none"
            >
              Back to home
            </button>
          </div>
        </Transition>
      )}
    </div>
  );
};

export default SuccessClient;
