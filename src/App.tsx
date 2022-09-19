import React from "react";
import "src/App.scss";
import { Register, Login } from "src/pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PAGES } from "src/helpers/router";
import { cn } from "src/helpers/bem";
import { PrivateRoute } from "src/components/PrivateRoute/PrivateRoute";
import { Spin } from "antd";
import { useAppSelector } from "src/redux/hooks";
import { LOADING_TYPE } from "src/types/loading";
import { Dialog, Dialogs } from "src/pages/Main/components";

const b = cn("app");

function App() {
  const state = useAppSelector((state) => state);
  const {
    user: { userLoading },
    dialogs: { dialogsLoading, dialogLoading },
    loader: { visible: loaderVisible },
    file: { fileLoading },
  } = state;
  const showSpinner = () => {
    return [userLoading, dialogsLoading, dialogLoading, fileLoading].some(
      (it) => it === LOADING_TYPE.LOADING
    ) || loaderVisible ? (
      <Spin className={b("spinner")} size="large" style={{ zIndex: 1000000 }} />
    ) : null;
  };

  return (
    <div className={b()}>
      {showSpinner()}
      <BrowserRouter>
        <Routes>
          <Route
            path={PAGES.DIALOGS}
            element={
              <PrivateRoute>
                <Dialogs />
              </PrivateRoute>
            }
          />
          <Route path={PAGES.LOGIN} element={<Login />} />
          <Route path={PAGES.REGISTER} element={<Register />} />
          <Route
            path={`${PAGES.DIALOG}/:dialogId`}
            element={
              <PrivateRoute>
                <div className={b("row")}>
                  <Dialogs />
                  <Dialog />
                </div>
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
