import { test, expect } from '@playwright/test';

test.describe('In-place Reset', () => {
  test('Reset button clears the board without page reload', async ({ page }) => {
    await page.goto('/');

    // Make some moves
    await page.locator('id=1').click();
    await page.locator('id=2').click();

    await expect(page.locator('id=1')).toHaveText(/X|O/);
    await expect(page.locator('id=2')).toHaveText(/X|O/);

    // Get the current message
    const initialMsg = await page.locator('#msg').innerText();

    // Click reset
    await page.locator('#reset').click();

    // Board should be clear
    await expect(page.locator('id=1')).toHaveText('');
    await expect(page.locator('id=2')).toHaveText('');

    // AI toggle should be enabled
    const aiToggle = page.locator('#aiToggle');
    await expect(aiToggle).toBeEnabled();
    await expect(aiToggle).toHaveCSS('opacity', '1');

    // Message should be updated (turn might be different)
    const resetMsg = await page.locator('#msg').innerText();
    expect(resetMsg).toMatch(/goes first!/);
  });

  test('Reset button clears winning highlights', async ({ page }) => {
    await page.goto('/');

    // Force a win (e.g., top row)
    // We don't know who starts, so we just click until someone wins or it's full
    // But for a reliable test, we can just perform the clicks and check for highlight
    await page.locator('id=1').click();
    await page.locator('id=4').click();
    await page.locator('id=2').click();
    await page.locator('id=5').click();
    await page.locator('id=3').click();

    await expect(page.locator('id=1')).toHaveClass(/win-highlight/);

    // Click reset
    await page.locator('#reset').click();

    // Highlights should be gone
    await expect(page.locator('id=1')).not.toHaveClass(/win-highlight/);
    await expect(page.locator('#msg')).not.toHaveClass('winner');
  });
});
