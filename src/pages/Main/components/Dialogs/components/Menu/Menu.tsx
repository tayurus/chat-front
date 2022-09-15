import React, { FC } from "react";
import classNames from "classnames/dedupe";
import { cn } from "src/helpers/bem";
import { Props } from "src/pages/Main/components/Dialogs/components/Menu/MenuProps";
import "src/pages/Main/components/Dialogs/components/Menu/Menu.scss";
import { Drawer } from "antd";

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
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
  );
};
