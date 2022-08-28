import { Button, Form, Input } from "antd";
import React from "react";
import { cn } from "src/helpers/bem";
import "./Register.scss";
import { PAGES } from "src/helpers/router";
import { useNavigate } from "react-router-dom";
import { register } from "src/redux/user/actions";
import { RegisterUserBodyParams } from "src/types/backendParams";
import { useAppDispatch } from "src/redux/hooks";
import { unwrapResult } from "@reduxjs/toolkit";

const b = cn("register");

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onFinish = async (values: RegisterUserBodyParams) => {
    const registrationResult = unwrapResult(
      await dispatch(
        register({
          queryParams: {},
          urlParams: {},
          bodyParams: values,
        })
      )
    );
    if (registrationResult.id) {
      navigate(PAGES.DIALOGS);
    }
  };

  return (
    <div className={b()}>
      <h1>Registration</h1>
      <Form name="register" onFinish={onFinish} autoComplete="off">
        <Form.Item
          label="First name"
          name="first_name"
          rules={[
            {
              required: true,
              type: "string",
              message: "Please input your first name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Last name"
          name="last_name"
          rules={[
            {
              required: true,
              type: "string",
              message: "Please input your last name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
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
          rules={[
            {
              required: true,
              type: "string",
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
