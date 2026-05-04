/**
 * パン商品データ
 * 
 * ここでパンの情報を一括管理しています。
 * 新しいパンを追加したい場合は、この配列に新しいオブジェクトを追加してください。
 * 画像を差し替えたい場合は、imageプロパティのパスを変更してください。
 */

export type Bread = {
  id: string
  name: string
  price: number
  description: string
  image: string
  ingredients: string[]
  allergens: string[]
  recommendation: string
  isRecommended: boolean
}

export const breads: Bread[] = [
  {
    id: 'croissant',
    name: 'クロワッサン',
    price: 280,
    description: 'フランス産発酵バターをたっぷり使用した、サクサクの食感が自慢のクロワッサン。何層にも折り重ねた生地が、焼き上げることで美しい層を作り出します。',
    image: '/images/croissant.jpg',
    ingredients: ['小麦粉', '発酵バター', '牛乳', '砂糖', '塩', 'イースト'],
    allergens: ['小麦', '乳'],
    recommendation: '朝食やティータイムにぴったり。温め直すとさらにサクサク感がアップします。',
    isRecommended: true,
  },
  {
    id: 'anpan',
    name: 'あんぱん',
    price: 200,
    description: '北海道産小豆を使った自家製つぶあんがたっぷり入った、昔ながらの優しい味わいのあんぱん。ふんわり柔らかな生地との相性は抜群です。',
    image: '/images/anpan.jpg',
    ingredients: ['小麦粉', '小豆', '砂糖', 'バター', '牛乳', '卵', 'イースト', '塩'],
    allergens: ['小麦', '卵', '乳'],
    recommendation: 'お子様からご年配の方まで愛される定番の味。温かいお茶と一緒にどうぞ。',
    isRecommended: true,
  },
  {
    id: 'melonpan',
    name: 'メロンパン',
    price: 220,
    description: '外はサクサク、中はふわふわ。クッキー生地をのせて焼き上げた、みんな大好きなメロンパン。メロンの形をした格子模様が可愛らしい一品です。',
    image: '/images/melonpan.jpg',
    ingredients: ['小麦粉', 'バター', '砂糖', '卵', '牛乳', 'イースト', 'バニラエッセンス'],
    allergens: ['小麦', '卵', '乳'],
    recommendation: 'おやつや軽食にぴったり。焼きたてはもちろん、翌日でも美味しくお召し上がりいただけます。',
    isRecommended: true,
  },
  {
    id: 'shokupan',
    name: '食パン',
    price: 350,
    description: '毎朝焼き上げる、ふんわりしっとりの食パン。そのままでも、トーストしても美味しい、毎日の食卓に欠かせない一品です。',
    image: '/images/shokupan.jpg',
    ingredients: ['小麦粉', 'バター', '牛乳', '砂糖', '塩', 'イースト'],
    allergens: ['小麦', '乳'],
    recommendation: '厚切りでトーストがおすすめ。バターやジャムとの相性も抜群です。',
    isRecommended: false,
  },
  {
    id: 'currypan',
    name: 'カレーパン',
    price: 250,
    description: 'スパイシーな自家製カレーを包み込み、カリッと揚げた人気の惣菜パン。外はカリカリ、中はジューシーなカレーがあふれ出します。',
    image: '/images/currypan.jpg',
    ingredients: ['小麦粉', '牛肉', '玉ねぎ', 'カレー粉', 'パン粉', '卵', '牛乳', 'イースト'],
    allergens: ['小麦', '卵', '乳', '牛肉'],
    recommendation: 'ランチや小腹が空いた時に。揚げたてが一番美味しいですが、トースターで温め直しても◎',
    isRecommended: true,
  },
  {
    id: 'baguette',
    name: 'バゲット',
    price: 320,
    description: 'パリッとした皮ともっちりした中身が特徴のフランスパン。シンプルな材料で作る本格的な味わい。お料理の付け合わせにも最適です。',
    image: '/images/baguette.jpg',
    ingredients: ['小麦粉', '塩', 'イースト', 'モルト'],
    allergens: ['小麦'],
    recommendation: 'オリーブオイルやバターをつけて。サンドイッチやブルスケッタにもおすすめです。',
    isRecommended: false,
  },
]

/**
 * IDからパンを検索する関数
 */
export function getBreadById(id: string): Bread | undefined {
  return breads.find((bread) => bread.id === id)
}

/**
 * おすすめパンのみを取得する関数
 */
export function getRecommendedBreads(): Bread[] {
  return breads.filter((bread) => bread.isRecommended)
}
