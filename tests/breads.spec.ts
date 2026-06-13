import { test, expect } from '@playwright/test';

test('パン一覧ページへ移動後、ホームへ戻る', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page
    .getByLabel('メインナビゲーション')
    .getByRole('link', { name: 'パン一覧' })
    .click();

  await expect(page).toHaveURL(/\/breads\/?$/);

  await expect(
    page.getByRole('heading', { name: 'パン一覧' })
  ).toBeVisible();

  await page
    .getByLabel('メインナビゲーション')
    .getByRole('link', { name: 'ホーム' })
    .click();

  await expect(page).toHaveURL('http://localhost:3000/');
});