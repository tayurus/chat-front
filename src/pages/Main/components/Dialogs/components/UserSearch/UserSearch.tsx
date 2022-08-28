import React, { FC } from "react";
import classNames from "classnames/dedupe";
import { cn } from "src/helpers/bem";
import { Props } from "src/pages/Main/components/Dialogs/components/UserSearch/UserSearchProps";
import "src/pages/Main/components/Dialogs/components/UserSearch/UserSearch.scss";
import { Avatar, Comment } from "antd";

const b = cn("user-search");

export const UserSearch: FC<Props> = (props) => {
  const { className, items, onUserClick } = props;

  if (!Array.isArray(items)) {
    return <div className={classNames(b(), className)}>Ничего не найдено</div>;
  }

  return (
    <div className={classNames(b(), className)}>
      {items.map((it) => (
        <div onClick={() => onUserClick(it)} className={b("item")}>
          <Comment
            author={<span>{`${it.last_name} ${it.first_name}`}</span>}
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
            content={<p>last seen at never</p>}
          />
        </div>
      ))}
    </div>
  );
};
