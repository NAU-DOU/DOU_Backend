export class SilentRefreshAuthOutputDto {
  ok: boolean;
  eid_access_token?: string;
  error?: string;
}

export class LogoutAuthOutputDto {
  ok: boolean;
  error?: string;
}
