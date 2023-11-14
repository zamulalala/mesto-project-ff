"use strict";
// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

function createCard (element, deleteCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardElementImg = cardElement.querySelector('.card__image');
  cardElementImg.src = element.link;
  cardElementImg.alt = element.alt;
  cardElement.querySelector('.card__title').textContent = element.name;
  const closeButton = cardElement.querySelector('.card__delete-button');
  closeButton.addEventListener('click', deleteCard);
  return cardElement;
}

function deleteCard (evt) {
  evt.target.closest('.card').remove();
}

initialCards.forEach(function (element) {
  const cardElement = createCard(element, deleteCard);
  placesList.append(cardElement);
})
