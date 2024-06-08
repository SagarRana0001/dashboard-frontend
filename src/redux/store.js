import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slice/slice.js";
import loginApi from "./services/logintoolkit.js";
import { setupListeners } from "@reduxjs/toolkit/query";
import SignUpApi from "./services/signuptoolkit.js";
import AllDataApi from "./services/alldatatoolkit.js";
import DeleteApi from "./services/deletetoolkit.js";
import PermanentDeleteApi from "./services/permanentDeleteApi.js";
import UpdateApi from "./services/updateApi.js";
import UploadImgApi from "./services/uploadImgApi.js";
import UploadCsvDataApi from "./services/uploadCsvDataApi.js";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [loginApi.reducerPath]: loginApi.reducer,
    [SignUpApi.reducerPath]: SignUpApi.reducer,
    [AllDataApi.reducerPath]: AllDataApi.reducer,
    [DeleteApi.reducerPath]: DeleteApi.reducer,
    [PermanentDeleteApi.reducerPath]: PermanentDeleteApi.reducer,
    [UpdateApi.reducerPath]: UpdateApi.reducer,
    [UploadImgApi.reducerPath]: UploadImgApi.reducer,
    [UploadCsvDataApi.reducerPath]: UploadCsvDataApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      loginApi.middleware,
      SignUpApi.middleware,
      AllDataApi.middleware,
      DeleteApi.middleware,
      PermanentDeleteApi.middleware,
      UpdateApi.middleware,
      UploadImgApi.middleware,
      UploadCsvDataApi.middleware
    ),
});
setupListeners(store.dispatch);
