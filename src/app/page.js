import Image from "next/image";
import Link from "next/link";
import { Col, Row, Button, Typography } from "antd";

export const metadata = {
  title: "online-store",
};

export default function Home() {
  return (
    <Row gutter={[32, 16]} align="middle" style={{ height: "80vh" }}>
      <Col span={12}>
        <Image
          src="/hero.jpg"
          alt="hero image"
          width={500}
          height={500}
          style={{ objectFit: "contain", width: "100%", height: "auto" }}
          priority
        />
      </Col>
      <Col span={12}>
        <Image
          src="/clothes.png"
          alt="clothes image"
          width={500}
          height={500}
          style={{ objectFit: "contain", width: "100%", height: "auto" }}
          priority
        />
        <Typography style={{ textAlign: "left", marginTop: "25px" }}>
          Some description text about the product. This is where you provide
          details about the product.
        </Typography>
        <Button
          style={{ marginTop: "16px", display: "flex", justifyContent: "left" }}
        >
          <Link href="/catalog">Buy Now</Link>
        </Button>
      </Col>
    </Row>
  );
}
