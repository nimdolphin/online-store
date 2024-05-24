"use client";

import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { loginUser, getUserInfo } from "../../../utils/data";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/userSlice";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const credentials = {
        username: values.username,
        password: values.password,
      };
      const response = await loginUser(credentials);
      if (response.token) {
        const userInfo = await getUserInfo(response.token);
        dispatch(setUser({ user: userInfo, token: response.token }));
        message.success("Login successful");
      } else {
        throw new Error("No token received");
      }
    } catch (error) {
      message.error("Login failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onFinish={onFinish}>
      <Form.Item name="username" label="Username" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="password" label="Password" rules={[{ required: true }]}>
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
