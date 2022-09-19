import React, { FC, useEffect } from "react";
import classNames from "classnames/dedupe";
import { cn } from "src/helpers/bem";
import { Props } from "src/pages/Main/components/Dialogs/components/Menu/MenuProps";
import "./Menu.scss";
import { Drawer } from "antd";
import { ChangePasswordForm } from "./components";
import { api } from "src/helpers/api";
import {
  BASE_ROUTES,
  FILE_ROUTES,
} from "src/types/backendAndFrontendCommonTypes/routes";

const b = cn("site-menu");

export const Menu: FC<Props> = (props) => {
  const { className, visible, onClose } = props;

      useEffect(() => {
        api.get(`${BASE_ROUTES.FILE}/image.png`).then((data) => {
          // @ts-ignore
        });
  }, []);

  return (
    <Drawer
      className={classNames(b(), className)}
      title="Settings"
      placement="left"
      onClose={onClose}
      visible={visible}
    >
      <ChangePasswordForm />
      {/*<img src={img} alt="shit" />*/}
      <input
        type="file"
        onChange={(e) => {
          const formData = new FormData();

          formData.append("file", e.target.files![0]);
          api.post(`${BASE_ROUTES.FILE}${FILE_ROUTES.UPLOAD}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
        }}
      />
    </Drawer>
  );
};
