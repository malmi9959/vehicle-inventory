import { getWithExpiry } from "../utils/localStorage";

export function getUser() {
  const user = getWithExpiry("user");
  return user;
}
