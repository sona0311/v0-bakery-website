import { test, expect } from '@playwright/test';

test('お知らせページへ移動後、ホームへ戻る', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page
    .getByLabel('メインナビゲーション')
    .getByRole('link', { name: 'お知らせ' })
    .click();

  await expect(page).toHaveURL(/\/news\/?$/);

  await expect(
    page.getByRole('heading', { level: 1, name: 'お知らせ' })
  ).toBeVisible();

  await page
    .getByLabel('メインナビゲーション')
    .getByRole('link', { name: 'ホーム' })
    .click();

  await expect(page).toHaveURL('http://localhost:3000/');
});