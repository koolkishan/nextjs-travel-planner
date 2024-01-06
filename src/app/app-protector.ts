"use client";

import { apiClient } from "@/lib";
import { useAppStore } from "@/store";
import { USER_API_ROUTES } from "@/utils";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const AppProtector = () => {
  const router = useRouter();
  const pathName = usePathname();
  const { userInfo, setUserInfo } = useAppStore();
  useEffect(() => {
    if (!userInfo) {
      const getUserInfo = async () => {
        const response = await apiClient.get(USER_API_ROUTES.ME);
        if (response.data.userInfo) {
          setUserInfo(response.data.userInfo);
        }
      };
      getUserInfo();
    }
  }, [pathName, userInfo, setUserInfo, router]);

  return null;
};

export default AppProtector;
