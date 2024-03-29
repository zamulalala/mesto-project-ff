//Функция открывает попап
function openPopup(popup) {
  popup.classList.add('popup_is-opened'); // Добавляем класс для открытия попапа
  document.addEventListener('keydown', closeByEsc); // Добавляем обработчик события для закрытия по клавише Esc
}

// Функция закрывает попап по клику на оверлей
function closePopupByOverlay(event) {
  // Проверяем, что клик произошел по оверлею
  if (event.target.classList.contains('popup')) {
    closePopup(event.target); // передаем event.target в функцию closePopup
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
  popup.classList.remove('popup_is-opened'); // Удаляем класс для закрытия попапа
  // Удаляем обработчики событий для закрытия
  document.removeEventListener('click', closePopupByOverlay); 
  document.removeEventListener('keydown', closeByEsc);
}

// Экспортируем функции для использования в других модулях
export {openPopup, closePopup, closePopupByOverlay};
