import { test, expect } from '@playwright/test';

test.describe('Responsive Layout', () => {

  test('Desktop layout (1280px)', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');

    const board = page.locator('#gameBoard');
    const boardBox = await board.boundingBox();

    // Check max-width constraint (600px)
    expect(boardBox.width).toBeCloseTo(600, 1);
    expect(boardBox.height).toBeCloseTo(600, 1);

    // Check button layout (should be horizontal in a row)
    const controls = page.locator('.controls');
    await expect(controls).toHaveCSS('flex-direction', 'row');
  });

  test('Mobile layout (375px)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const board = page.locator('#gameBoard');
    const boardBox = await board.boundingBox();

    // Check responsive width (90vw of 375 is 337.5)
    expect(boardBox.width).toBeCloseTo(375 * 0.9, 1);
    expect(boardBox.height).toBeCloseTo(375 * 0.9, 1);

    // Check button layout (should be vertical/column)
    const controls = page.locator('.controls');
    await expect(controls).toHaveCSS('flex-direction', 'column');
  });

  test('Font size scaling', async ({ page }) => {
    // Desktop
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    const desktopCell = page.locator('.cell').first();
    const desktopFontSize = await desktopCell.evaluate(el => parseFloat(window.getComputedStyle(el).fontSize));

    // Mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    const mobileCell = page.locator('.cell').first();
    const mobileFontSize = await mobileCell.evaluate(el => parseFloat(window.getComputedStyle(el).fontSize));

    expect(mobileFontSize).toBeLessThan(desktopFontSize);
  });
});

test.describe('Game Logic E2E', () => {
  test('Win detection and highlighting', async ({ page }) => {
    await page.goto('/');

    // Play a winning game (top row)
    await page.locator('id=1').click();
    await page.locator('id=4').click();
    await page.locator('id=2').click();
    await page.locator('id=5').click();
    await page.locator('id=3').click();

    await expect(page.locator('#msg')).toContainText('wins!');

    // Verify highlight class
    await expect(page.locator('id=1')).toHaveClass(/win-highlight/);
    await expect(page.locator('id=2')).toHaveClass(/win-highlight/);
    await expect(page.locator('id=3')).toHaveClass(/win-highlight/);
  });
});
