import React, { FC, useEffect } from "react";
import classNames from "classnames/dedupe";
import { cn } from "src/helpers/bem";
import { Props } from "src/pages/Main/components/Dialogs/components/Menu/MenuProps";
import "./Menu.scss";
import { Drawer } from "antd";
import { ChangePasswordForm, ChangeProfilePhoto } from "./components";
import { api } from "src/helpers/api";
import {
  BASE_ROUTES,
  FILE_ROUTES,
} from "src/types/backendAndFrontendCommonTypes/routes";
import { useAppDispatch } from "src/redux/hooks";
import { uploadFile } from "src/redux/file/actions";
import { FILE_UPLOAD } from "src/types/backendAndFrontendCommonTypes/constants";

const b = cn("site-menu");

export const Menu: FC<Props> = (props) => {
  const { className, visible, onClose } = props;
  const dispatch = useAppDispatch();

  useEffect(() => {
    api
      .get(
        `${BASE_ROUTES.FILE}${FILE_ROUTES.UPLOAD_STORAGE}/1abf2d164f789624e3295f4e9ebaa03a.jpg`
      )
      .then((data) => {
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
      <ChangeProfilePhoto />
    </Drawer>
  );
};
