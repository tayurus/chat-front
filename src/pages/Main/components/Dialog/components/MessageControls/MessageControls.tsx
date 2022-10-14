import React, { ChangeEvent, FC, useEffect, useState } from "react";
import classNames from "classnames/dedupe";
import { cn } from "src/helpers/bem";
import { Props } from "./MessageControlsProps";
import "./MessageControls.scss";
import { WebSocketModule } from "src/helpers/websocket";
import { NEW_DIALOG_ID } from "src/helpers/constants";
import { UserTyping } from "src/types/backendAndFrontendCommonTypes/userTyping";
import {
  REACT_NATIVE_LOCAL_STORAGE_KEYS,
  reactNativeLocalStorage,
} from "src/helpers/storage";

const b = cn("message-controls");

export const MessageControls: FC<Props> = (props) => {
  const { className, sendMessage, dialogId } = props;
  const [userMessage, setUserMessage] = useState("");

  useEffect(() => {
    reactNativeLocalStorage
      .load({
        key: REACT_NATIVE_LOCAL_STORAGE_KEYS.LAST_MESSAGE_INPUT_STATE,
      })
      .then((data) => {
        setUserMessage(data.text);
      })
      .catch(() => {});
  }, []);
  const handleSendClick = async () => {
    const sendResult = await sendMessage(userMessage);
    if (sendResult) {
      setUserMessage("");
    }
  };

  const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (dialogId && dialogId !== NEW_DIALOG_ID) {
      WebSocketModule.sendUserTypingInfo({
        typingType: UserTyping.TEXT,
        dialogId,
      });
    }

    setUserMessage(text);
    reactNativeLocalStorage.save({
      key: REACT_NATIVE_LOCAL_STORAGE_KEYS.LAST_MESSAGE_INPUT_STATE,
      data: {
        text,
      },
    });
  };

  return (
    <div className={classNames(b(), className)}>
      <label className={b("attach")}>
        <input type="file" />
      </label>

      <textarea
        onChange={handleMessageChange}
        value={userMessage}
        className={b("message-input")}
        placeholder="Type your message..."
      />

      {/*<div className={b("emojis-wrapper">*/}
      {/*  <div className={b("emojis" />*/}
      {/*  <div className={b("emojis-list">*/}
      {/*    <div*/}
      {/*      onClick={() => this.props.sendMessage("bitch", "emoji")}*/}
      {/*      className={b("emojis-item emoji__bitch"*/}
      {/*    />*/}
      {/*    <div*/}
      {/*      onClick={() => this.props.sendMessage("coolstory", "emoji")}*/}
      {/*      className={b("emojis-item emoji__coolstory"*/}
      {/*    />*/}
      {/*    <div*/}
      {/*      onClick={() => this.props.sendMessage("fu", "emoji")}*/}
      {/*      className={b("emojis-item emoji__fu"*/}
      {/*    />*/}
      {/*    <div*/}
      {/*      onClick={() => this.props.sendMessage("kaboom", "emoji")}*/}
      {/*      className={b("emojis-item emoji__kaboom"*/}
      {/*    />*/}
      {/*    <div*/}
      {/*      onClick={() => this.props.sendMessage("perfect", "emoji")}*/}
      {/*      className={b("emojis-item emoji__perfect"*/}
      {/*    />*/}
      {/*    <div*/}
      {/*      onClick={() => this.props.sendMessage("sup", "emoji")}*/}
      {/*      className={b("emojis-item emoji__sup"*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*</div>*/}

      <button className={b("send")} onClick={handleSendClick} />
    </div>
  );
};
