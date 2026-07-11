import { test, expect } from '@playwright/test';

test('カート内商品の数量を増やせる', async ({ page }) => {
  // ログイン
  await page.goto('http://localhost:3000/login');

  await page
    .getByPlaceholder('example@email.com')
    .fill('test@example.com');

  await page
    .getByPlaceholder('パスワードを入力')
    .fill('password123');

  await page
    .getByRole('button', { name: 'ログイン' })
    .click();

  await expect(page).toHaveURL('http://localhost:3000/');

  // 商品追加
  await page.goto('http://localhost:3000/breads');

  await page
    .getByRole('button', { name: 'カートに追加' })
    .first()
    .click();

  // カートへ移動
  await page
    .locator('header a[href="/cart"]')
    .click();

  await expect(page).toHaveURL(/\/cart\/?$/);

  // ＋ボタンを押す
  await page
    .getByRole('button', {
      name: 'クロワッサンの数量を増やす',
    })
    .click();

  // 数量が2になる
  await expect(
    page.getByLabel('数量: 2')
  ).toBeVisible();

// 注文内容確認
await expect(
  page.getByText('クロワッサン x 2')
).toBeVisible();

// 合計金額確認
const totalPrice = page.getByText('¥560').last();
await expect(totalPrice).toBeVisible();
});