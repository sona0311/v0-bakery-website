import { test, expect } from '@playwright/test';

test('ログインページへ移動後、ホームへ戻る', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page
    .locator('header')
    .getByRole('link', { name: 'ログイン' })
    .click();

  await expect(page).toHaveURL(/\/login\/?$/);

  await expect(
    page.getByText('アカウントにログインしてください')
  ).toBeVisible();

  await page
    .getByLabel('メインナビゲーション')
    .getByRole('link', { name: 'ホーム' })
    .click();

  await expect(page).toHaveURL('http://localhost:3000/');
});