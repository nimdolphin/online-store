"use client";

import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { addUser } from "@/api/data";

const formFields = [
  { name: "email", label: "Email", rules: [{ required: true }] },
  { name: "username", label: "Username", rules: [{ required: true }] },
  {
    name: "password",
    label: "Password",
    rules: [{ required: true }],
    inputType: "password",
  },
  { name: "firstname", label: "First Name", rules: [{ required: true }] },
  { name: "lastname", label: "Last Name", rules: [{ required: true }] },
  { name: "city", label: "City", rules: [{ required: true }] },
  { name: "street", label: "Street", rules: [{ required: true }] },
  { name: "number", label: "Number", rules: [{ required: true }] },
  { name: "zipcode", label: "Zip Code", rules: [{ required: true }] },
];

const Signup = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const user = {
        email: values.email,
        username: values.username,
        password: values.password,
        name: {
          firstname: values.firstname,
          lastname: values.lastname,
        },
        address: {
          city: values.city,
          street: values.street,
          number: values.number,
          zipcode: values.zipcode,
        },
      };
      await addUser(user);
      message.success("User added successfully");
    } catch (error) {
      message.error("Failed to add user: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onFinish={onFinish} layout="vertical">
      {formFields.map((field) => (
        <Form.Item
          key={field.name}
          name={field.name}
          label={field.label}
          rules={field.rules}
        >
          {field.inputType === "password" ? <Input.Password /> : <Input />}
        </Form.Item>
      ))}
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          style={{ width: "100%" }}
        >
          Sign Up
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Signup;
