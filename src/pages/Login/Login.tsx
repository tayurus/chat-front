import { Button, Form, Input } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { PAGES } from "src/helpers/router";
import { cn } from "src/helpers/bem";
import "./Login.scss";
import { LoginUserBodyParams } from "src/types/backendParams";
import { useAppDispatch } from "src/redux/hooks";
import { login } from "src/redux/user/actions";
import { unwrapResult } from "@reduxjs/toolkit";

const b = cn("login");

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onFinish = async (values: LoginUserBodyParams) => {
    const loginResult = unwrapResult(await dispatch(login(values)));
    if (typeof loginResult === "object" && loginResult.id) {
      navigate(PAGES.DIALOGS);
    }
  };

  return (
    <div className={b()}>
      <Form name="basic" onFinish={onFinish} autoComplete="off">
        <Form.Item
          label="email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={() => navigate(PAGES.REGISTER)}>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
