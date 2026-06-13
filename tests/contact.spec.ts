import { test, expect } from '@playwright/test';

test('お問い合わせページへ移動後、ホームへ戻る', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page
    .getByLabel('メインナビゲーション')
    .getByRole('link', { name: 'お問い合わせ' })
    .click();

  await expect(page).toHaveURL(/\/contact\/?$/);

await expect(
  page.getByRole('heading', { level: 1, name: 'お問い合わせ' })
).toBeVisible();

  await page
    .getByLabel('メインナビゲーション')
    .getByRole('link', { name: 'ホーム' })
    .click();

  await expect(page).toHaveURL('http://localhost:3000/');
});