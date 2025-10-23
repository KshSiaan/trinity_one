import { howl } from "@/lib/utils"
import { apiConfig } from "../config";

// >>>>>>>>>>>>>>>>> AUTH <<<<<<<<<<<<<<<<<<<<

export const loginApi = async ({
  body,
}: { body: { email:string,password:string } }) => {
  return howl("/auth/login", {
    method: "POST",
    body,
  });
};

export const employeeLoginApi = async ({
  body,
}: { body: { pin:string } }) => {
  return howl("/auth/employee-login", {
    method: "POST",
    body,
  });
};

export const verifyOtpApi = async ({
  body,
}: { body: { otp: string,email:string } }) => {
  return howl("/auth/verify-otp", {
    method: "POST",
    body,
  });
};

export const forgotPassApi = async ({
  body,
}: { body: { email: string } }) => {
  return howl("/auth/resend-otp", {
    method: "POST",
    body,
  });
};

export const changePasswordApi = async ({
  body,
  token,
}: { body: { password: string; password_confirmation: string }; token: string }) => {
  return howl("/auth/create-password?_method=PUT", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body,
  });
};

export const updatePasswordApi = async ({
  body,
  token,
}: {
  body: {
    current_password: string;
    password: string;
    password_confirmation: string;
  };
  token: string;
}) => {
  return howl("/auth/password-reset?_method=PUT", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body,
  });
};

export const getProfileApi = async (token: string) => {
  return howl("/auth/profile", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const updateProfileApi = async ({
  body,
  token,
}: {
  token: string;
  body: FormData;
}) => {
  const res = await fetch(`${apiConfig.baseUrl}/auth/profile-update?_method=PUT`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body,
  });
  
  if (!res.ok) {
    throw new Error(`Failed to update profile: ${res.statusText}`);
  }
  return res.json();
};
