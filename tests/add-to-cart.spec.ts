import { test, expect } from '@playwright/test';

test('パン一覧から商品をカートに追加できる', async ({ page }) => {
  await page.goto('http://localhost:3000/login');

  await page.getByPlaceholder('example@email.com').fill('test@example.com');
  await page.getByPlaceholder('パスワードを入力').fill('password123');
  await page.getByRole('button', { name: 'ログイン' }).click();

  await expect(page).toHaveURL('http://localhost:3000/');

  await page.goto('http://localhost:3000/breads');

  await page
    .getByRole('button', { name: 'カートに追加' })
    .first()
    .click();

  await page
    .locator('header a[href="/cart"]')
    .click();

  await expect(page).toHaveURL(/\/cart\/?$/);

  await expect(
    page.getByRole('heading', { name: 'クロワッサン' })
  ).toBeVisible();
});