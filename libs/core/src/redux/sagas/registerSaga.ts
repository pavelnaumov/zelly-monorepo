import { Platform } from "react-native";
import { all, call, put, takeEvery } from "redux-saga/effects";
import { useAuthService } from "../../services/AuthService";
import { UserResponse } from "../../types/Auth/LoginResponse";
import { UserCountry, UserLanguage } from "../../types/Utility/User";
import { authUser } from "../authSlice";
import { toggleLoading } from "../ui/uiSlice";
import { setUser } from "../userSlice";
import { LoginUserPayload } from "./authSaga";
import { sagaActions } from "./sagaActions";

export type RegisterUserPayload = LoginUserPayload & {
  language: UserLanguage;
  country: UserCountry;
};

function* registerUser(payload: RegisterUserPayload) {
  const { register } = useAuthService();
  yield put(toggleLoading(true));
  try {
    const user: UserResponse = yield call(() => register(payload));
    if (user.token) {
      yield put(authUser(user.token));
      yield put(setUser({ user }));
      yield put(toggleLoading(false));
    }
  } catch (e: any) {
    yield put(toggleLoading(false));

    if (Platform.OS !== "web") {
      // @TODO: CHANGE
      // Toast.showToast("error", "Error", e.message || "");
    }
    console.log(e);
  }
}

export function* watchRegisterUser() {
  yield takeEvery(sagaActions.REGISTER_USER, registerUser);
}

export function runRegisterUser(payload: Omit<RegisterUserPayload, "type">) {
  const { email, password, language, country } = payload;
  return {
    type: sagaActions.REGISTER_USER,
    email,
    password,
    language,
    country,
  };
}

export function* registrationSagas() {
  yield all([watchRegisterUser()]);
}
