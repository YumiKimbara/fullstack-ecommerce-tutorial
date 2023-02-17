import React from "react";
// Nextの<Head>コンポーネントを使用することで、ページごとに異なる<title>タグ、<meta>タグ、スタイルシート、スクリプトなどを追加することができます。
// 例えば下記では<title>タグを動的に設定している。
import Head from "next/head";

import Navbar from "./Navbar";
import Footer from "./Footer";

// _app.jsからきたComponentをchildrenとして受け取ることができる。
const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Head>
        <title>JS Mastery Store</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className="main-container">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
