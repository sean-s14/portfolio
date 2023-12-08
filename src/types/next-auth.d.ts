import { DefaultUser } from "next-auth";
declare module "next-auth" {
  interface Session {
    user?: DefaultUser & { id: string; admin: boolean };
  }
  interface User extends DefaultUser {
    admin: boolean;
  }
}
