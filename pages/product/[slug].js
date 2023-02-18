import { client } from "@/lib/client";
import React from "react";

import { urlFor } from "@/lib/client";

// getStaticPropsででゲットしたpropsを引数にとる。
function ProductDetail({ product, products }) {
  const { image, name, details, price } = product;

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img src={urlFor(image && image[0])} />
          </div>
        </div>
      </div>
    </div>
  );
}

// 動的なルートの生成を可能にするために使用されます。たとえば、ブログの記事の場合、/posts/[slug]のような動的なルートがあるかもしれません。
// 各パラメータに対してどのページを生成するかを指定することができます。
// 静的なページのコンテンツを取得するgetStaticPropsと併用することで、動的なルートを持つ静的なサイトを簡単に作成することができます。
// [slug]は、Next.jsのルーティングシステムにおける動的なパラメータの1つです。この機能を使うことで、URLに動的な値を含めることができます。たとえば、ブログの記事のページを生成する場合、/posts/first-postのようなURLを生成することができます。(slugの部分にfirst-postが当てはまる)
export const getStaticPaths = async () => {
  // current propertyがあるproductだけ返す(sanity)
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }
  `;

  const products = await client.fetch(query);
  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

// 静的サイト生成を使用する場合に使われる。
// 静的サイト生成は、ページが頻繁に変更されない場合、遅延が許容できる場合、ページが外部データに依存していない場合などに使われる。
// getStaticPropsはビルド時に実行される。
export const getStaticProps = async ({ params: { slug } }) => {
  // async awaitを使い、データをゲットする。
  // SanityのGROQクエリを設定
  // productの箇所はおそらくsanityをnpm run devでlocalhost:3333で開いた時に自分で設定するContentのtitleと合致しているっぽい
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = `*[_type == "product"]`;
  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  // propsにAPIから受け取ったデータを返す。
  return {
    props: { products, product },
  };
};

export default ProductDetail;
