import React from "react";
import styles from "./background.module.css";
import Image from "next/image";

export default function Background({ children }) {
  const Spot = ({ x, y }) => {
    return (
      <div
        className={styles.spot}
        style={{ transform: `translateX(${x}) translateY(${y})` }}
      />
    );
  };

  return (
    <div className={styles.backgroundContainer}>
      <div
        className={"flex"}
        style={{
          borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
          padding: 10,
        }}
      >
        <div className={"flex-1"}>
          <Image
            priority
            src="/images/logo-1.svg"
            height={36}
            width={102}
            alt="soci"
          />
        </div>
        <Image
          priority
          src="/images/logo-2.svg"
          height={60}
          width={60}
          alt="logo"
        />
      </div>
      <Spot x="25%" y="-40%" />
      <Spot x="-50%" y="20%" />
      <div className={styles.backgroundContent}>{children}</div>
    </div>
  );
}
