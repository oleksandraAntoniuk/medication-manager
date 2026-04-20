import { test, expect } from '@playwright/test';

test('додавання нового препарату через форму', async ({ page }) => {
  await page.goto('http://localhost:5173');

  const inputs = page.locator('input');

  await inputs.nth(0).fill('Test Medicine');
  await inputs.nth(1).fill('2');

  await page.getByRole('button', { name: 'Додати' }).click();

  await expect(page.getByText('Test Medicine')).toBeVisible();
});

test('препарат не додається з порожньою назвою', async ({ page }) => {
  await page.goto('http://localhost:5173');

  const inputs = page.locator('input');

  await inputs.nth(0).fill('');
  await inputs.nth(1).fill('2');

  await page.getByRole('button', { name: 'Додати' }).click();

  await expect(page.getByText('Test Medicine')).not.toBeVisible();
});