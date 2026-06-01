import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://osstep.github.io/assertion_tohaveattribute");
});

test("1. Проверка атрибутов основной кнопки", async ({ page }) => {
  // Задание: Проверить атрибуты основной кнопки
  // 1. Найти кнопку "Отправить" по тексту
  const button = page.getByText("Отправить");
  // 2. Проверить что она имеет атрибут data-action="submit"
  await expect(button).toHaveAttribute("data-action", "submit");
  // 3. Проверить что она имеет атрибут title="Основная кнопка"
  await expect(button).toHaveAttribute("title", "Основная кнопка");
  await page.getByRole("button", { name: "Переключить атрибуты" }).click();
  // 4. Нажать кнопку "Переключить атрибуты"
  // 5. Проверить что атрибут data-action изменился на "cancel"
  await expect(button).toHaveAttribute("data-action", "cancel");
  // 6. Проверить что атрибут title изменился на "Отмена действия"
  await expect(button).toHaveAttribute("title", "Отмена действия");
});

test("2. Проверка отключения кнопки", async ({ page }) => {
  // Задание: Проверить изменение состояния кнопки
  // 1. Найти кнопку "Отправить" и проверить что у нее нет атрибута disabled
  const button = page.getByText("Отправить");
  await expect(button).not.toHaveAttribute("disabled");
  // 2. Нажать кнопку "Отключить кнопку"
  await page.getByRole("button", { name: "Отключить кнопку" }).click();
  // 3. Проверить что кнопка "Отправить" получила атрибут disabled
  await expect(button).toHaveAttribute("disabled", "");
  // 4. Проверить что значение атрибута disabled равно пустой строке
  // 5. Еще раз нажать "Отключить кнопку"
  await page.getByRole("button", { name: "Отключить кнопку" }).click();
  // 6. Проверить что атрибут disabled отсутствует
  await expect(button).not.toHaveAttribute("disabled");
});

test("3. Проверка атрибутов изображения", async ({ page }) => {
  // Задание: Проверить атрибуты изображения
  // 1. Найти изображение по атрибуту alt
  const img = page.getByAltText("Аватар пользователя");
  await expect(img).toHaveAttribute("src", "user.jpg");
  // 2. Проверить что оно имеет src="user.jpg"
  // 3. Проверить что оно имеет alt="Аватар пользователя"
  await expect(img).toHaveAttribute("alt", "Аватар пользователя");

  // 4. Проверить что оно имеет width="200"
  await expect(img).toHaveAttribute("width", "200");
});

test("4. Проверка атрибутов формы", async ({ page }) => {
  // Задание: Проверить атрибуты полей формы
  const inputName = page.getByRole("textbox", { name: "Имя пользователя" });
  await expect(inputName).toHaveAttribute("required", "");
  await expect(inputName).toHaveAttribute("minlength", "3");
  // 1. Найти поле "Имя пользователя" и проверить:
  //    - имеет атрибут required
  //    - имеет атрибут minlength="3"
  // 2. Найти поле "Email" и проверить что оно имеет атрибут disabled
  const emailInput = page.getByRole("textbox", { name: "Email" });
  await expect(emailInput).toHaveAttribute("disabled");
  // 3. Нажать кнопку "Активировать email"
  await page.getByRole("button", { name: "Активировать email" }).click();
  // 4. Проверить что поле "Email" больше не имеет атрибута disabled
  await expect(emailInput).not.toHaveAttribute("disabled");
  // 5. Проверить что placeholder изменился на "Введите ваш email"
  await expect(emailInput).toHaveAttribute("placeholder", "Введите ваш email");
});

test("5. Проверка data-атрибутов", async ({ page }) => {
  // Задание: Проверить data-атрибуты контейнера
  // 1. Найти контейнер по тексту
  const container = page.getByText("Контейнер с data-атрибутами");
  await expect(container).toHaveAttribute("data-role", "container");
  await expect(container).toHaveAttribute("data-visible", "true");
  await expect(container).toHaveAttribute("data-user-id", "12345");
  // 2. Проверить что он имеет:
  //    - data-role="container"
  //    - data-visible="true"
  //    - data-user-id="12345"
  // 3. Нажать кнопку "Обновить data-атрибуты"
  await page.getByRole("button", { name: "Обновить data-атрибуты" }).click();

  await expect(container).toHaveAttribute("data-visible", "false");
  await expect(container).not.toHaveAttribute("data-user-id", "12345");
  // 4. Проверить что data-visible изменился на "false"
  // 5. Проверить что data-user-id изменился (не равен "12345")
  // 6. Еще раз нажать кнопку
  await page.getByRole("button", { name: "Обновить data-атрибуты" }).click();
  await expect(container).toHaveAttribute("data-visible", "true");
  // 7. Проверить что data-visible снова "true"
});
