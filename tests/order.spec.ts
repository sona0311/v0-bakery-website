import { test, expect } from '@playwright/test';

test('オンライン注文ページへ移動後、ホームへ戻る', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page
    .getByLabel('メインナビゲーション')
    .getByRole('link', { name: 'オンライン注文' })
    .click();

  await expect(page).toHaveURL(/\/order\/?$/);

  await expect(
    page.getByRole('heading', { level: 1, name: 'オンライン注文' })
  ).toBeVisible();

  await page
    .getByLabel('メインナビゲーション')
    .getByRole('link', { name: 'ホーム' })
    .click();

  await expect(page).toHaveURL('http://localhost:3000/');
});