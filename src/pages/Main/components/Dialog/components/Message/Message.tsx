import React, { FC } from "react";
import classNames from "classnames/dedupe";
import { cn } from "src/helpers/bem";
import { Props } from "./MessageProps";
import "./Message.scss";
import moment from "moment-timezone";
import { DATE_TIME_FORMAT } from "src/helpers/constants";

const b = cn("message");

export const Message: FC<Props> = (props) => {
  const { className, type, content, datetime } = props;

  return (
    <div className={classNames(b({ [type]: true }), className)}>
      <div className={b("content")}>{content}</div>
      <div className={b("date")}>
        {moment(datetime).format(DATE_TIME_FORMAT)}
      </div>
    </div>
  );
};
