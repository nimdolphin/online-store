"use client";

import React from "react";
import { Provider } from "react-redux";
import { useEffect } from "react";
import store from "@/store";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { getUserInfo } from "@/api/data";
import Navbar from "@/components/ui/navbar/Navbar";
import { setUser } from "@/store/userSlice";
import { Inter } from "next/font/google";
import { Col, Row } from "antd";

const inter = Inter({ subsets: ["latin"] });

function AppProvider({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const fetchUserInfo = async () => {
        try {
          const userInfo = await getUserInfo(token);
          dispatch(setUser({ user: userInfo, token }));
        } catch (error) {
          Cookies.remove("token");
        }
      };
      fetchUserInfo();
    }
  }, [dispatch]);

  return <>{children}</>;
}

export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body className={inter.className}>
          <Row
            justify="center"
            align="middle"
            style={{ textAlign: "center", justifyContent: "center" }}
          >
            <Col>
              <Navbar />
              <AppProvider>{children}</AppProvider>
            </Col>
          </Row>
        </body>
      </html>
    </Provider>
  );
}
