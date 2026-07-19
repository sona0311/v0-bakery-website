import { test, expect } from '@playwright/test';

test('カート内商品の数量を減らせる', async ({ page }) => {
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

  // 商品をカートに追加
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

  // 数量を2に増やす
  await page
    .getByRole('button', {
      name: 'クロワッサンの数量を増やす',
    })
    .click();

  await expect(
    page.getByLabel('数量: 2')
  ).toBeVisible();

  // 数量を1に減らす
  await page
    .getByRole('button', {
      name: 'クロワッサンの数量を減らす',
    })
    .click();

  // 数量が1になったことを確認
  await expect(
    page.getByLabel('数量: 1')
  ).toBeVisible();

  // 注文内容を確認
  await expect(
    page.getByText('クロワッサン x 1')
  ).toBeVisible();

  // 合計金額を確認
  const totalPrice = page.getByText('¥280').last();
  await expect(totalPrice).toBeVisible();
});