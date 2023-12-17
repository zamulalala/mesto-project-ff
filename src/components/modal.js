// Получаем доступ к элементам попапа изображения
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImg = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');

// Устанавливаем стиль для фона попапа изображения
popupTypeImage.style.background = "rgba(0, 0, 0, .9)";

//Функция открывает попап
function openPopup(popup) {
  if (popup) {
    popup.classList.add('popup_is-opened'); // Добавляем класс для открытия попапа
    document.addEventListener('keydown', closeByEsc); // Добавляем обработчик события для закрытия по клавише Esc
    popup.querySelector('.popup__close').addEventListener('click', () => closePopup(popup)); // Добавляем обработчик события для закрытия по крестику
    document.addEventListener('click', closePopupByOverlay); // Добавляем обработчик события для закрытия по клику вне попапа
  }
}

//Функция открывает попап изображения
function openImgPopup (event) {
  const card = event.target.closest('.card'); // Находим родительскую карточку, из которой было вызвано открытие
  const cardImg = card.querySelector('.card__image'); // Находим изображение и подпись на карточке
  const cardCaption = card.querySelector('.card__title');
  popupImg.src = cardImg.src; // Устанавливаем изображение и подпись в попап изображения
  popupCaption.textContent = cardCaption.textContent;
  openPopup(popupTypeImage); // Открываем попап изображения
}

//Функция закрывает попап по клику на оверлей
function closePopupByOverlay(event) {
  // Проверяем, что клик произошел по оверлею и не по содержимому попапа
  if (event.target.classList.contains('popup') && !event.target.classList.contains('popup__content')) {
    const openedPopup = document.querySelector('.popup_is-opened'); // Находим открытый попап и закрываем его
    closePopup(openedPopup);
  }
}

//Функция закрывает попап по нажатию клавиши Esc
function closeByEsc(event) {
  // Проверяем, что нажата клавиша Esc
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened'); // Находим открытый попап и закрываем его
    closePopup(openedPopup);
  }
}

//Функция закрывает попап
function closePopup(popup) {
  if (popup) {
    popup.classList.remove('popup_is-opened'); // Удаляем класс для закрытия попапа
    // Удаляем обработчики событий для закрытия
    document.removeEventListener('click', closePopupByOverlay); 
    document.removeEventListener('keydown', closeByEsc);
    popup.querySelector('.popup__close').removeEventListener('click', () => closePopup(popup));
  }
}

// Экспортируем функции для использования в других модулях
export {openPopup, openImgPopup, closePopup};
