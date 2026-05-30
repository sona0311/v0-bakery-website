import { test, expect } from '@playwright/test';

test('店舗情報ページへ移動後、ホームへ戻る', async ({ page }) => {

  // ホーム画面を開く
  await page.goto('http://localhost:3000');

  // 店舗情報をクリック
await page
  .getByLabel('メインナビゲーション')
  .getByRole('link', { name: '店舗情報' })
  .click();

  // /shop に遷移確認
  await expect(page).toHaveURL(/\/shop\/?$/);

  // 店舗情報ページの見出し確認
// 店舗情報ページの見出し確認
await expect(
  page.getByRole('heading', { name: '店舗情報' })
).toBeVisible();

  // ホームをクリック
await page
  .getByLabel('メインナビゲーション')
  .getByRole('link', { name: 'ホーム' })
  .click();

  // ホーム画面に戻ったことを確認
  await expect(page).toHaveURL('http://localhost:3000/');

});