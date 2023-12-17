// Получаем шаблон карточки из разметки
const cardTemplate = document.querySelector('#card-template').content;

//Функция создает карточку на основе данных элемента.
function createCard (element, deleteCard, toggleLikeCard, openImgPopup) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true); // Клонируем шаблон карточки

  const cardElementImg = cardElement.querySelector('.card__image'); // Устанавливаем данные карточки
  cardElementImg.src = element.link;
  cardElementImg.alt = `На фотографии изображен географический объект: ${element.name}`;
  cardElement.querySelector('.card__title').textContent = element.name;

  const closeButton = cardElement.querySelector('.card__delete-button'); // Настраиваем обработчики событий
  closeButton.addEventListener('click', deleteCard);
  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', toggleLikeCard);
  cardElementImg.addEventListener('click', (openImgPopup)); // Возвращаем созданную карточку

  return cardElement;
}

//Функция удаляет карточку из DOM
function deleteCard (event) {
  event.target.closest('.card').remove();
}

//Функция переключает состояние лайка на карточке
function toggleLikeCard (event) {
  event.target.classList.toggle('card__like-button_is-active');
}

// Экспортируем функции для использования в других модулях
export {createCard, deleteCard, toggleLikeCard};