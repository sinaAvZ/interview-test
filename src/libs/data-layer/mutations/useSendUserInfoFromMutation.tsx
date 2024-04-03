import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { UserInfo } from "../../../pages/InterView";
interface Dto {
  gender?: "male" | "female";
  fullName: string;
}

export const useSendUserInfoFromMutation = () => {
  return useMutation({
    retry: false,
    mutationFn: (dto?: Dto) =>
      axios.post<UserInfo>("https://fakeUrl", dto).then(({ data }) => data),
  });
};
