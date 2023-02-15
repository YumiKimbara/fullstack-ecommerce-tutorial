import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// SanityのcreateClientは、Sanity APIに接続するためのクライアントを作成するための関数。
// Sanityのデータを読み取るために必須。
export const client = createClient({
  // cd sanity-ecommerce -> sanity manageで開いたページにProjectID記載されている
  projectId: "c9zxumy0",
  // cd sanity-ecommerce -> sanity manageで開いた後、datasetsを見るとtitleが記載されている。
  dataset: "production",
  // 作成日の日付
  apiVersion: "2023-02-15",
  useCdn: true,
  // sanity manage -> Tokens -> Add API TokenでToken作成。
  // securityのため.envを作成し、そこにTOKENを貼り付けし、その名前をここに記載する。
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

// imageUrlBuilderは画像のURLを構築するためのヘルパーメソッド
// サイズ変更、トリミング、フォーマットの変更など、さまざまな画像処理操作を実行できます。
const builder = imageUrlBuilder(client);

// builder.imageを単独で使用する場合、引数に渡されたsourceを元に画像のURLを構築するだけ。
// ここに色々なプロパティを追加して画像処理操作を実行できる。
export const urlFor = (source) => builder.image(source);
