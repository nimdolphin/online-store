"use client";

import React, { useState } from "react";
import { loginUser, getUserInfoByUsername } from "@/api/data";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { logoutUser } from "@/api/data";
import { setUser, clearUser } from "@/store/userSlice";
import { Form, Input, Button, message, Space } from "antd";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const onLogout = () => {
    logoutUser();
    dispatch(clearUser());
    message.success("You have successfully logged out.");
    location.reload();
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const credentials = {
        username: values.username,
        password: values.password,
      };
      const response = await loginUser(credentials);
      if (response.token) {
        Cookies.set("token", response.token, { expires: 7 });
        Cookies.set("username", values.username, { expires: 7 });
        const userInfo = await getUserInfoByUsername(values.username);
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
    <Space>
      {!user ? ( // Добавлен условный рендеринг для показа формы логина или кнопки logout
        <Form onFinish={onFinish}>
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Login
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <Button onClick={onLogout} style={{ margin: "10px" }}>
          Logout
        </Button>
      )}
    </Space>
  );
};

export default Login;
