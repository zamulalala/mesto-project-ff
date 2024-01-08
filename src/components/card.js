import { likeCard, removeLike, deleteCardGlobal } from "./api.js";

// Получаем шаблон карточки из разметки
const cardTemplate = document.querySelector('#card-template').content;

// Функция возвращает шаблон карточки
function getCardTemplate() {
  return cardTemplate.querySelector('.card').cloneNode(true);
}

//Функция создает карточку на основе данных элемента
function createCard (element, userId, deleteCard, toggleLikeCard, openImgPopup) {
  const cardElement = getCardTemplate(); // Используем getCardTemplate для получения клонированного шаблона

  const cardElementImg = cardElement.querySelector('.card__image'); // Устанавливаем данные карточки
  cardElementImg.src = element.link;
  cardElementImg.alt = `На фотографии изображен географический объект: ${element.name}`;
  cardElement.querySelector('.card__title').textContent = element.name;
  
  const cardElementLikeCount = cardElement.querySelector(".card__like-count");
  cardElementLikeCount.textContent = element.likes.length;

  cardElement.id = element["_id"];

  const buttonDeleteCard = cardElement.querySelector('.card__delete-button'); // Настраиваем обработчики событий
  if (element.owner._id === userId) {
    buttonDeleteCard.addEventListener('click', () => deleteCard(element._id, cardElement));
  } else {
    buttonDeleteCard.remove();
  }

  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', () => toggleLikeCard(element._id, likeButton, cardElementLikeCount));

  cardElementImg.addEventListener('click', (openImgPopup)); // Возвращаем созданную карточку

  return cardElement;
}

//Функция удаляет карточку из DOM
function deleteCard (cardId, cardElement) {
  deleteCardGlobal(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

//Функция переключает состояние лайка на карточке
function toggleLikeCard (cardId, likeButton, cardElementLikeCount) {
  const isLiked = likeButton.classList.contains('card__like-button_is-active');

  if (isLiked) {
    // Если карточка уже лайкнута, снимаем лайк
    removeLike(cardId)
      .then((card) => {
        likeButton.classList.remove('card__like-button_is-active');
        cardElementLikeCount.textContent = card.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    // Если карточка не лайкнута, ставим лайк
    likeCard(cardId)
      .then((card) => {
        likeButton.classList.add('card__like-button_is-active');
        cardElementLikeCount.textContent = card.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

// Экспортируем функции для использования в других модулях
export {createCard, deleteCard, toggleLikeCard};