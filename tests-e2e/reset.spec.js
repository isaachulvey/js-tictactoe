import { test, expect } from '@playwright/test';

test.describe('Reset Functionality', () => {
  test('Reset button clears board and resets state', async ({ page }) => {
    await page.goto('/');

    // Make some moves
    await page.locator('id=1').click();
    await page.locator('id=2').click();

    await expect(page.locator('id=1')).toHaveText(/X|O/);
    await expect(page.locator('id=1')).toBeDisabled();

    // Click reset
    await page.locator('#reset').click();

    // Verify board is clear
    await expect(page.locator('id=1')).toHaveText('');
    await expect(page.locator('id=1')).toBeEnabled();
    await expect(page.locator('id=1')).toHaveAttribute('aria-label', 'Cell 1, empty');

    // Verify AI toggle is re-enabled
    await expect(page.locator('#aiToggle')).toBeEnabled();
  });
});
