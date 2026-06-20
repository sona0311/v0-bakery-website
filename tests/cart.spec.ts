import { test, expect } from '@playwright/test';

test('カートページへ移動後、ホームへ戻る', async ({ page }) => {
  await page.goto('http://localhost:3000/cart');

  await expect(page).toHaveURL(/\/cart\/?$/);

  await expect(
    page.getByText('カートは空です')
  ).toBeVisible();

  await page
    .getByLabel('メインナビゲーション')
    .getByRole('link', { name: 'ホーム' })
    .click();

  await expect(page).toHaveURL('http://localhost:3000/');
});