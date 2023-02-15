import product from './product'
import banner from './banner'

// bannerとproductのスキーマをsanityにコネクトする。
// コネクト後はnpm run devでsanityを開き、そこから手作業で商品情報などを入力することができる。
export const schemaTypes = [product, banner]
