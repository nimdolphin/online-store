"use client";
import React from "react";
import { Provider } from "react-redux";
import store from "@/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/userSlice";
import Cookies from "js-cookie";
import { getUserInfo } from "@/utils/data";
import { Inter } from "next/font/google";
import Navbar from "@/components/ui/navbar/Navbar";
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
          console.error("Error fetching user info:", error);
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
