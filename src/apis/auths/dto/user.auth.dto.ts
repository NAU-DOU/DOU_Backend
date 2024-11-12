export class SilentRefreshAuthOutputDto {
  ok: boolean;
  eid_access_token?: string;
  userId?: number;
  userNickname?: string;
  error?: string;
}

export class LogoutAuthOutputDto {
  ok: boolean;
  error?: string;
}
