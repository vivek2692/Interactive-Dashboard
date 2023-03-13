import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import { PersistGate } from "redux-persist/integration/react";
// import store from "./store/store";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";
import storageSession from "redux-persist/lib/storage/session";
import userReducer from "./store/userSlice";


const persistConfig = {
  key: "user-store",
  storage,
};

const Loading = () => {
  return <div>Loading New</div>;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
const authPersistConfig = { key: "auth", storage: storageSession };
const rootReducer = combineReducers({
  user: persistReducer(authPersistConfig, userReducer),
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(ReduxThunk));

const persistor = persistStore(store);

root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<Loading />}>
        <App />
      </PersistGate>
    </Provider>
  // </React.StrictMode>
);
