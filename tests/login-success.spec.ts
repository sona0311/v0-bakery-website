import { test, expect } from '@playwright/test';

test('テストアカウントでログインできる', async ({ page }) => {
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

  await expect(
    page.getByText('テストユーザーさん')
  ).toBeVisible();

  await expect(
    page.getByRole('button', { name: 'ログアウト' })
  ).toBeVisible();
});