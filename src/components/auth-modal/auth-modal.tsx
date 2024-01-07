"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Link,
} from "@nextui-org/react";
import { Architects_Daughter } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { USER_API_ROUTES } from "@/utils";
import { apiClient } from "@/lib";
import { useAppStore } from "@/store";

const ArchitectsDaughter = Architects_Daughter({
  weight: "400", // if single weight, otherwise you use array like [400, 500, 700],
  style: "normal", // if single style, otherwise you use array like ['normal', 'italic']
  subsets: ["latin"],
});

const AuthModal = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpen?: () => void;
  onOpenChange: () => void;
}) => {
  const [modalType, setModalType] = useState("login");
  const router = useRouter();
  const { setUserInfo } = useAppStore();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (onClose: () => void) => {
    const response = await apiClient.post(USER_API_ROUTES.SIGNUP, {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    });
    if (response.data.userInfo) {
      setUserInfo(response.data.userInfo);
      onClose();
    }
  };

  const handleLogin = async (onClose: () => void) => {
    const response = await apiClient.post(USER_API_ROUTES.LOGIN, {
      email,
      password,
    });
    if (response.data.userInfo) {
      setUserInfo(response.data.userInfo);
      onClose();
    }
  };

  const switchModalType = () => {
    if (modalType === "login") setModalType("signup");
    else setModalType("login");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      backdrop="blur"
      className=" bg-opacity-50 bg-purple-200"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 capitalize text-3xl items-center">
              {modalType}
            </ModalHeader>
            <ModalBody className="flex flex-col items-center w-full justify-center">
              <div className="">
                <Image
                  src="/logo.png"
                  alt="logo"
                  height={80}
                  width={80}
                  className="cursor-pointer"
                  onClick={() => router.push("/admin/dashboard")}
                />
                <span className="text-xl uppercase font-medium italic">
                  <span className={ArchitectsDaughter.className}>ARKLYTE</span>
                </span>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <Input
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {modalType === "signup" && (
                  <>
                    <Input
                      placeholder="First Name"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <Input
                      placeholder="Last Name"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </>
                )}
                <Input
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </ModalBody>
            <ModalFooter className="flex flex-col gap-2 items-center justify-center">
              <Button
                color="primary"
                onPress={() => {
                  modalType === "login"
                    ? handleLogin(onClose)
                    : handleSignup(onClose);
                }}
                className="w-full capitalize"
              >
                {modalType}
              </Button>
              {modalType === "signup" && (
                <p>
                  Already have an account?&nbsp;
                  <Link
                    className="cursor-pointer"
                    onClick={() => switchModalType()}
                  >
                    {" "}
                    Login Now
                  </Link>
                </p>
              )}
              {modalType === "login" && (
                <p>
                  Don{`'`}t have an account?&nbsp;
                  <Link
                    className="cursor-pointer"
                    onClick={() => {
                      switchModalType();
                    }}
                  >
                    {" "}
                    Signup Now
                  </Link>
                </p>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AuthModal;
