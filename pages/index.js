import React from "react";

import { client } from "@/lib/client";
import { Product, FooterBanner, HeroBanner } from "../components";
import banner from "@/sanity-ecommerce/schemas/banner";

// getServerSidePropsでゲットしたpropsを引数にとる。
const Home = ({ products, bannerData }) => {
  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      <div className="products-heading">
        <h2>aaaaaaaaa</h2>
        <p>aaaaaaaaaa</p>
      </div>
      <div className="products-container">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  );
};

// getServerSidePropsはNextのfunction
// サーバーサイドレンダリングを使用する場合実行される特別な関数で、ページコンポーネントの初回のレンダリング時に実行されます。
// getServerSidePropsを使用すると、ページコンポーネントに必要なデータを事前にサーバーサイドで取得することができるため、ページの初回のレンダリングが高速化されます。また、SEOにも良い影響を与えます。
// 外部データに頻繁にアクセスする必要がある場合、リアルタイムでデータの更新が必要な場合にサーバーサイドレンダリングが使用される。
// getServerSidePropsはリクエスト時に実行されます。
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
