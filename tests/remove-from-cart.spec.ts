import { test, expect } from '@playwright/test';

test('カートから商品を削除できる', async ({ page }) => {
  // ログイン
  await page.goto('http://localhost:3000/login');

  await page
    .getByPlaceholder('example@email.com')
    .fill('test@example.com');

  await page
    .getByPlaceholder('パスワードを入力')
    .fill('password123');

  await page.getByRole('button', { name: 'ログイン' }).click();

  await expect(page).toHaveURL('http://localhost:3000/');

  // パン一覧へ移動
  await page.goto('http://localhost:3000/breads');

  // 商品をカートに追加
  await page
    .getByRole('button', { name: 'カートに追加' })
    .first()
    .click();

  // カートへ移動
  await page
    .locator('header a[href="/cart"]')
    .click();

  await expect(page).toHaveURL(/\/cart\/?$/);

  // 商品があることを確認
  await expect(
    page.getByRole('heading', { name: 'クロワッサン' })
  ).toBeVisible();

  // 削除ボタンをクリック
  await page
    .getByRole('button', { name: /カートから削除/ })
    .click();

  // カートが空になったことを確認
  await expect(
    page.getByText('カートは空です')
  ).toBeVisible();
});