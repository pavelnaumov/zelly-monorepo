import { UserAgeRange, UserCountry, UserEmail, UserId, UserPassword, UserToken } from '../Utility/User';

export interface RegisterRequestBody {
  email: UserEmail;
  password: UserPassword;
  country: UserCountry;
  ageRange: UserAgeRange;
}

export interface UserResponse {
  country: UserCountry;
  id: UserId;
  email: UserEmail;
  token: UserToken;
}

export interface UserAdminResponse extends UserResponse {
  isAdmin: true
}

export type ZellyUser = UserResponse;
