/**
 * お知らせデータ
 * 
 * ここでお知らせ情報を管理しています。
 * 新しいお知らせを追加したい場合は、この配列の先頭に新しいオブジェクトを追加してください。
 */

export type News = {
  id: string
  date: string
  title: string
  content: string
  category: 'お知らせ' | '新商品' | 'イベント' | '臨時休業'
}

export const newsList: News[] = [
  {
    id: 'news-001',
    date: '2024-12-20',
    title: '年末年始の営業について',
    content: '年末年始の営業日についてご案内いたします。12月30日〜1月3日まではお休みをいただきます。1月4日より通常営業となります。本年もたくさんのご来店ありがとうございました。来年もよろしくお願いいたします。',
    category: 'お知らせ',
  },
  {
    id: 'news-002',
    date: '2024-12-15',
    title: 'クリスマス限定パンの販売開始',
    content: '今年もクリスマス限定のシュトーレンとパネトーネを販売いたします。数量限定となっておりますので、お早めにご予約ください。ご予約は店頭またはお電話にて承っております。',
    category: '新商品',
  },
  {
    id: 'news-003',
    date: '2024-12-01',
    title: '冬季限定メニューが登場しました',
    content: 'あったかいシチューパンとチョコクロワッサンが冬季限定で登場！寒い季節にぴったりの温かいパンをぜひお試しください。',
    category: '新商品',
  },
  {
    id: 'news-004',
    date: '2024-11-20',
    title: 'パン作り体験教室を開催します',
    content: '12月14日（土）にパン作り体験教室を開催いたします。お子様連れ大歓迎！一緒に楽しくパンを作りませんか？詳細・お申し込みは店頭にて。',
    category: 'イベント',
  },
  {
    id: 'news-005',
    date: '2024-11-10',
    title: '設備メンテナンスによる臨時休業',
    content: '11月25日（月）は設備メンテナンスのため臨時休業とさせていただきます。ご不便をおかけいたしますが、何卒よろしくお願いいたします。',
    category: '臨時休業',
  },
]

/**
 * 最新のお知らせを取得する関数
 */
export function getLatestNews(count: number = 3): News[] {
  return newsList.slice(0, count)
}

/**
 * IDからお知らせを取得する関数
 */
export function getNewsById(id: string): News | undefined {
  return newsList.find((news) => news.id === id)
}
