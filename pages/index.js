import React from "react";

import { client } from "@/lib/client";
import { Product, FooterBanner, HeroBanner } from "../components";

// getServerSidePropsでゲットしたpropsを引数にとる。
const Home = ({ products, bannerData }) => {
  return (
    <>
      <HeroBanner />
      <div className="products-heading">
        <h2>aaaaaaaaa</h2>
        <p>aaaaaaaaaa</p>
      </div>
      <div className="products-container">
        {products?.map((product) => product.name)}
      </div>
      <FooterBanner />
    </>
  );
};

// getServerSidePropsはNextのfunction
// サーバーサイドでのみ実行される特別な関数で、ページコンポーネントの初回のレンダリング時に実行されます。
// getServerSidePropsを使用すると、ページコンポーネントに必要なデータを事前にサーバーサイドで取得することができるため、ページの初回のレンダリングが高速化されます。また、SEOにも良い影響を与えます。
export const getServerSideProps = async () => {
  // async awaitを使い、データをゲットする。
  // SanityのGROQクエリを設定
  // productの箇所はおそらくsanityをnpm run devでlocalhost:3333で開いた時に自分で設定するContentのtitleと合致しているっぽい
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  // SanityのGROQクエリを設定
  // bannerの箇所はおそらくsanityをnpm run devでlocalhost:3333で開いた時に自分で設定するContentのtitleと合致しているっぽい
  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  // getServerSidePropsはpropsにAPIから受け取ったデータを返す。
  return {
    props: { products, bannerData },
  };
};

export default Home;
