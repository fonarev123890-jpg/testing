import { test, expect } from "@playwright/test";

test.describe("Тестирование видимости элементов с toBeVisible()", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://osstep.github.io/assertion_tobevisible");
  });

  test("Базовый тест видимости элемента", async ({ page }) => {
    const visibleElement = page.locator("#always-visible");
    await expect(visibleElement).toBeVisible();
    await expect(visibleElement).toHaveText("Всегда видимый элемент");
  });

  test("Тест элементов с разными типами скрытия", async ({ page }) => {
    // Задание 2: Проверка скрытых элементов
    const toggleDis = page.locator("#toggle-display");
    const toggleVis = page.locator("#toggle-visibility");
    const toggleOpa = page.locator("#toggle-opacity");

    await expect(toggleDis).not.toBeVisible();
    await expect(toggleVis).not.toBeVisible();
    await expect(toggleOpa).toBeVisible();
  });

  test("Тест изменения видимости элементов", async ({ page }) => {
    // Задание 3: Проверка изменения видимости
    // 1. Найти три кнопки для показа элементов:
    await page.locator("#show-display").click();
    await expect(page.locator("#toggle-display")).toBeVisible();
    await expect(page.locator("#toggle-display")).toHaveCSS("display", "block");

    await page.locator("#show-visibility").click();
    await expect(page.locator("#toggle-visibility")).toBeVisible();
    await expect(page.locator("#toggle-visibility")).toHaveCSS(
      "visibility",
      "visible",
    );

    await page.locator("#show-opacity").click();
    await expect(page.locator("#toggle-opacity")).toBeVisible();
    await expect(page.locator("#toggle-opacity")).toHaveCSS("opacity", "1");
  });

  test("Тест элемента с задержкой появления", async ({ page }) => {
    // Задание 4: Проверка элемента с задержкой
    // 1. Найти элемент #delayed-element
    const delayedElement = page.locator("#delayed-element");
    await expect(delayedElement).not.toBeVisible();

    page.getByRole("button", { name: "Показать с задержкой" }).click();
    await expect(delayedElement).toBeVisible({ timeout: 3000 });
    await expect(delayedElement).toHaveText("Элемент с задержкой появления");
    // 2. Проверить что он не видим
    // 3. Найти кнопку #show-delayed и кликнуть по ней
    // 4. С таймаутом 3 секунды дождаться появления элемента
    // 5. Проверить что элемент содержит текст "Элемент с задержкой появления"
  });
});
