import { useMutation } from "react-query";
import { TError, TLoginParams, TUser } from "../type";

export async function login(params: TLoginParams) {
  return await fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...params,
      // expiresInMins: 60, // optional
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message) throw new Error(data.message);
      return data as TUser;
    });
  // .catch((e) => Promise.reject<TError>(e));
}

export const useLogin = () => {
  return useMutation<TUser, TError, TLoginParams>(login);
};
