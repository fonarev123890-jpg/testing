import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://osstep.github.io/assertion_tohavevalue");
});

test("1. Проверка начальных значений полей", async ({ page }) => {
  // Задание: Проверить начальные значения всех полей формы
  // 1. Найти поле "Имя пользователя" по лейблу и проверить значение "Гость"
  const names = await page.getByLabel("Имя пользователя:");
  await expect(names).toHaveText("Гость");

  // 2. Найти поле "Электронная почта" и проверить что оно пустое
  const email = await page.getByRole("textbox", { name: "Электронная почта:" });
  await expect(email).toHaveValue("");

  // 3. Найти поле "Телефон" и проверить значение "+7"
  const tell = await page.getByRole("textbox", { name: "Телефон:" });
  await expect(tell).toContainText("+7");
  // 4. Найти поле "Комментарии" и проверить что оно пустое
  const comments = await page.getByRole("textbox", { name: "Комментарии:" });
  await expect(comments).toHaveValue("");

  // 5. Найти выпадающий список "Страна" и проверить значение "ru"
  const optionsCountry = await page.getByLabel("Страна:");
  await expect(optionsCountry).toHaveValue("ru");
});

test("2. Проверка изменения значений полей", async ({ page }) => {
  const inputName = page.getByLabel("Имя пользователя:");
  const inputEmail = page.getByLabel("Электронная почта:");
  const inputPhone = page.getByLabel("Телефон:");
  const inputComments = page.getByLabel("Комментарии:");
  const optionCountry = page.getByLabel("Страна:");

  // действия
  await inputName.fill("Алексей");
  await inputEmail.fill("alex@example.com");
  await inputPhone.fill("+7 (123) 456-78-90");
  await inputComments.fill("Тестовый комментарий");
  await optionCountry.selectOption("kz");

  // проверки
  await expect(inputName).toHaveValue("Алексей");
  await expect(inputEmail).toHaveValue("alex@example.com");
  await expect(inputPhone).toHaveValue("+7 (123) 456-78-90");
  await expect(inputComments).toHaveValue("Тестовый комментарий");
  await expect(optionCountry).toHaveValue("kz");
});

test("3. Проверка сброса формы", async ({ page }) => {
  // Задание: Проверить сброс значений формы к начальным
  // 1. Изменить поле "Имя пользователя" на "Петр"
  // 2. Изменить поле "Электронная почта" на "test@test.ru"
  // 3. Выбрать в списке "Страна" значение "Беларусь" (by)
  // 4. Нажать кнопку "Сбросить"
  // 5. Проверить что поле "Имя пользователя" содержит "Гость"
  // 6. Проверить что поле "Электронная почта" пустое
  // 7. Проверить что поле "Телефон" содержит "+7"
  // 8. Проверить что список "Страна" содержит значение "ru"
  const inputName = page.getByLabel("Имя пользователя:");
  const inputEmail = page.getByLabel("Электронная почта:");
  const inputPhone = page.getByLabel("Телефон:");
  const inputComments = page.getByLabel("Комментарии:");
  const optionCountry = page.getByLabel("Страна:");
  const buttonReset = page.getByRole("button", { name: "Сбросить" });

  await inputName.fill("Петр");
  await inputEmail.fill("test@test.ru");
  await optionCountry.selectOption("by");
  await buttonReset.click();
  await expect(inputName).toHaveValue("Гость");
  await expect(inputEmail).toHaveValue("");
  await expect(optionCountry).toHaveValue("ru");
  await expect(inputPhone).toHaveValue("+7");
});

test("4. Проверка обновления данных", async ({ page }) => {
  const inputName = page.getByLabel("Имя пользователя:");
  const inputEmail = page.getByLabel("Электронная почта:");
  const inputComments = page.getByLabel("Комментарии:");
  const buttonReset = page.getByRole("button", { name: "Обновить данные" });

  await inputName.fill("Петр");
  await inputEmail.fill("test@test.ru");
  await inputComments.fill("Важный комментарий");
  await buttonReset.click();

  const boxText = await page.locator("#output").textContent();

  expect(boxText).toContain("Петр");
  expect(boxText).toContain("test@test.ru");
  expect(boxText).toContain("Важный комментарий");
  // Задание: Проверить отображение введенных данных
  // 1. Заполнить поле "Имя пользователя" значением "Мария"
  // 2. Заполнить поле "Электронная почта" значением "maria@mail.ru"
  // 3. Заполнить поле "Комментарии" значением "Важный комментарий"
  // 4. Нажать кнопку "Обновить данные"
  // 5. Проверить что в блоке вывода содержится текст с введенными данными
});

test("5. Проверка пустых значений", async ({ page }) => {
  // Задание: Проверить обработку пустых значений
  // 1. Очистить поле "Имя пользователя"
  // 2. Очистить поле "Телефон"
  // 3. Выбрать пустое значение в списке "Страна"
  // 4. Проверить что поле "Имя пользователя" пустое
  // 5. Проверить что поле "Телефон" пустое
  // 6. Проверить что список "Страна" содержит пустое значение
  // 7. Проверить что изначально пустое поле "Электронная почта" осталось пустым

  const inputName = page.getByLabel("Имя пользователя:");
  const inputEmail = page.getByLabel("Электронная почта:");
  const inputPhone = page.getByLabel("Телефон:");
  const inputComments = page.getByLabel("Комментарии:");
  const optionCountry = page.getByLabel("Страна:");

  // действия
  await inputName.clear();
  await inputPhone.clear();
  await optionCountry.selectOption("");

  await expect(inputName).toHaveValue("");
  await expect(inputPhone).toHaveValue("");
  await expect(optionCountry).toHaveValue("");
  await expect(inputEmail).toHaveValue("");
});
