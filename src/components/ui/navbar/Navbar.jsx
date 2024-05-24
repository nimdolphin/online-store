"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Breadcrumb, Row, Col } from "antd";
import { theme } from "antd";

const Navbar = () => {
  const pathname = usePathname();

  const breadcrumbItems = [
    { title: "Home", url: "/" },
    { title: "Catalog", url: "/catalog" },
    { title: "Log In", url: "/login" },
    { title: "Sign up", url: "/authorization" },
  ];

  const { token } = theme.useToken();
  const primaryColor = token.colorPrimary;

  return (
    <Row justify="center" style={{ margin: "10px" }}>
      <Col>
        <Breadcrumb
          style={{
            textAlign: "center",
            justifyContent: "center",
            margin: "10px",
          }}
        >
          {breadcrumbItems.map((item, index) => (
            <Breadcrumb.Item key={index}>
              <Link
                style={{
                  margin: "0 40px",
                  color: pathname === item.url ? primaryColor : "",
                }}
                href={item.url}
              >
                {item.title}
              </Link>
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
      </Col>
    </Row>
  );
};

export default Navbar;
