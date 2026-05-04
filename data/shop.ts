/**
 * 店舗情報データ
 * 
 * ここで店舗の基本情報を管理しています。
 * 営業時間や住所などを変更したい場合は、ここを編集してください。
 */

export const shopInfo = {
  name: 'ぱんのいえ',
  catchphrase: '毎日焼きたて、心を込めた手作りパン',
  description: '小さな町の片隅で、毎朝心を込めてパンを焼いています。素材にこだわり、一つ一つ丁寧に作り上げるパンは、きっとあなたの日常に小さな幸せをお届けします。',
  address: {
    postalCode: '〒123-4567',
    prefecture: '東京都',
    city: '世田谷区',
    street: 'ぱん町1-2-3',
    full: '東京都世田谷区ぱん町1-2-3',
  },
  phone: '03-1234-5678',
  businessHours: {
    weekday: '7:00 〜 18:00',
    weekend: '8:00 〜 17:00',
    note: '焼きたてパンは午前中がおすすめです',
  },
  closedDays: '毎週月曜日・第3火曜日',
  access: [
    '〇〇線「ぱん駅」より徒歩5分',
    '駐車場：店舗前に2台分あり',
  ],
  // Googleマップ埋め込み用URL（実際のお店の座標に変更してください）
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.7479754683745!2d139.6917!3d35.6895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDQxJzIyLjIiTiAxMznCsDQxJzMwLjEiRQ!5e0!3m2!1sja!2sjp!4v1234567890',
  sns: {
    instagram: 'https://instagram.com/pannoie',
    twitter: 'https://twitter.com/pannoie',
  },
}
