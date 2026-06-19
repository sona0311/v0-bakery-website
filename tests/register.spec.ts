import { test, expect } from '@playwright/test';

test('新規会員登録ページへ移動後、ホームへ戻る', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page
    .locator('header')
    .getByRole('link', { name: '新規会員登録' })
    .click();

  await expect(page).toHaveURL(/\/register\/?$/);

  await expect(
    page.getByText('アカウントを作成して、便利な機能をご利用ください')
  ).toBeVisible();

  await page
    .getByLabel('メインナビゲーション')
    .getByRole('link', { name: 'ホーム' })
    .click();

  await expect(page).toHaveURL('http://localhost:3000/');
});