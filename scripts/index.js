// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

function createCard (el, deleteCard) {
  cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = el.link;
  cardElement.querySelector('.card__image').alt = el.alt;
  cardElement.querySelector('.card__title').textContent = el.name;
  const closeButton = cardElement.querySelector('.card__delete-button');
  closeButton.addEventListener('click', deleteCard);
  return cardElement;
}

function deleteCard (evt) {
  evt.target.closest('.card').remove();
}

initialCards.forEach(function (el) {
  const cardElement = createCard(el, deleteCard);
  placesList.append(cardElement);
})
