import React, { FC } from "react";
import classNames from "classnames/dedupe";
import { cn } from "src/helpers/bem";
import { Props } from "src/pages/Main/components/Dialogs/components/Menu/MenuProps";
import "./Menu.scss";
import { Drawer } from "antd";
import { ChangePasswordForm } from "./components";

const b = cn("site-menu");

export const Menu: FC<Props> = (props) => {
  const { className, visible, onClose } = props;

  return (
    <Drawer
      className={classNames(b(), className)}
      title="Настройки"
      placement="left"
      onClose={onClose}
      visible={visible}
    >
      <ChangePasswordForm />
    </Drawer>
  );
};
