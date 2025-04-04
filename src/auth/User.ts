import { UUID } from "crypto";

export default interface User {
  userId: UUID;
  userToken: string;
  name: string;
}
