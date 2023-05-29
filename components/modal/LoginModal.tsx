"use client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "@/hooks/useRegisterModal";
import { useCallback, useState } from "react";
import Modal from "./Modal";
import Heading from "../shared/Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import useLoginModal from "@/hooks/useLoginModal";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginModal = () => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginmodal = useLoginModal();
  const [isloading, setIsloading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsloading(true);
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      if (callback?.ok) {
        toast.success("Login successful");
        router.refresh();
        loginmodal.onClose();
      }
      if (callback?.error) {
        toast.error(callback?.error);
        setIsloading(false);
      }
    });
  };

  const toggle = useCallback(() => {
    loginmodal.onClose();
    registerModal.onOpen();
  }, [loginmodal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="welcome to Kyouka"
        subtitle="Login to your account"
      />
      <Input
        id="email"
        type="email"
        label="email"
        disabled={isloading}
        register={register}
        errors={errors}
        required
      />

      <Input
        id="password"
        type="password"
        label="Password"
        disabled={isloading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-3 mt-3">
      <div className="mt-4 text-neutral-500 text-center font-light">
        <div className="flex flex-row items-center gap-2 justify-center">
          <div>First time using KyOuka ?</div>
          <div
            onClick={toggle}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Create an account
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <Modal
      disabled={isloading}
      isOpen={loginmodal.isOpen}
      title="Login"
      actionLabel="Login"
      onClose={loginmodal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
