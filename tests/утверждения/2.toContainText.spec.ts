import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://osstep.github.io/assertion_tocontaintext");
});

test("1. Проверка статического текста", async ({ page }) => {
  const statics = page.locator("#static-text");
  await expect(statics).toContainText("static text block");
  await expect(statics).toContainText("important information");
  await expect(statics).not.toContainText("dynamic content");
});

test("2. Проверка динамически изменяемого текста", async ({ page }) => {
  // Задание: Проверить изменение динамического текста
  // 1. Найти элемент #dynamic-text и проверить что он содержит "Initial dynamic text"
  const dynamicText = page.locator("#dynamic-text");
  await expect(dynamicText).toContainText("Initial dynamic text");
  // 2. Нажать кнопку #change-text
  await page.locator("#change-text").click();
  // 3. Проверить что текст теперь содержит "Text was changed at"
  await expect(dynamicText).toContainText("Text was changed at");
  // 4. Нажать кнопку #add-part
  await page.locator("#add-part").click();
  // 5. Проверить что текст теперь содержит "(additional part)"
  await expect(dynamicText).toContainText("additional part");
});

test("3. Проверка списка элементов", async ({ page }) => {
  // Задание: Проверить содержимое списка
  // 1. Найти элемент #item-list
  const items = page.locator("#item-list");
  // 2. Проверить что он содержит текст "Item 1: Basic"
  await expect(items).toContainText("Item 1: Basic");
  // 3. Проверить что он содержит текст "Intermediate"
  await expect(items).toContainText("Intermediate");
  // 4. Нажать кнопку #add-item
  await page.locator("#add-part").click();
  // 5. Проверить что список теперь содержит текст "New added item"
  await expect(items).toContainText("New added item");
});

test("4. Проверка скрытого/отображаемого текста", async ({ page }) => {
  // Задание: Проверить отображение скрытого текста
  // 1. Найти элемент #hidden-content и проверить что он не видим
  const hiddenElement = page.locator("#hidden-content");
  await expect(hiddenElement).toBeHidden();
  // 2. Нажать кнопку #toggle-text
  page.locator("#toggle-text").click();
  // 3. Проверить что элемент теперь содержит текст "special content"
  await expect(hiddenElement).toContainText("special conten");
  // 4. Проверить что элемент содержит текст "hidden but now is visible"
  await expect(hiddenElement).toContainText("hidden but now is visible");
});

test("5. Проверка частичного совпадения в длинном тексте", async ({ page }) => {
  // Задание: Проверить частичные совпадения в длинном тексте
  // 1. Найти элемент #partial-text
  const partial = page.locator("#partial-text");
  // 2. Проверить что он содержит "quick brown fox"
  await expect(partial).toContainText("lazy dog");
  await expect(partial).toContainText("all letters of the English alphabet");
  await expect(partial).not.toContainText(
    "all letters of the Russian alphabet",
  );
  // 3. Проверить что он содержит "lazy dog"
  // 4. Проверить что он содержит "all letters of the English alphabet"
  // 5. Проверить что он НЕ содержит "all letters of the Russian alphabet"
});
