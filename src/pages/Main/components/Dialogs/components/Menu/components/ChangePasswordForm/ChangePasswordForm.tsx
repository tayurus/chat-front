import React, { FC } from "react";
import classNames from "classnames/dedupe";
import { cn } from "src/helpers/bem";
import { Props } from "./ChangePasswordFormProps";
import "./ChangePasswordForm.scss";
import { Form, Input, Button } from "antd";
import { useAppDispatch } from "src/redux/hooks";
import { updatePassword } from "src/redux/user/actions";

const b = cn("change-password-form");

export const ChangePasswordForm: FC<Props> = (props) => {
  const { className } = props;
  const dispatch = useAppDispatch();

  const [form] = Form.useForm();

  const onFinish = (values: {
    newPassword: string;
    oldPassword: string;
    confirm: string;
  }) => {
    dispatch(
      updatePassword({
        bodyParams: {
          newPassword: values.newPassword,
          oldPassword: values.oldPassword,
        },
        queryParams: {},
        urlParams: {},
      })
    );
  };

  const formItemLayout = {
    labelCol: {
      sm: { span: 10 },
    },
  };

  return (
    <div className={classNames(b(), className)}>
      <Form
        name="change-password"
        {...formItemLayout}
        form={form}
        onFinish={onFinish}
      >
        <Form.Item
          name="oldPassword"
          label="Current Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="newPassword"
          label="New Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Change Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
