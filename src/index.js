import './pages/index.css';
import {initialCards} from './scripts/cards.js';
import {createCard, deleteCard, toggleLikeCard} from './components/card.js';
import {openPopup, closePopup} from './components/modal.js';


// Секция мест (карточек)
const placesList = document.querySelector('.places__list');

// Секция профиля
const profileEditButton = document.querySelector('.profile__edit-button');
const buttonOpenAddCardForm = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

// Попап редактирования профиля
const popupTypeEdit = document.querySelector('.popup_type_edit');
const editFormElement = popupTypeEdit.querySelector('.popup__form');
const nameInput = editFormElement.querySelector('.popup__input_type_name');
const jobInput = editFormElement.querySelector('.popup__input_type_description');

// Попап добавления новой карточки
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const addFormElement = popupTypeNewCard.querySelector('.popup__form');
const cardNameInput = addFormElement.querySelector('.popup__input_type_card-name');
const cardUrlInput = addFormElement.querySelector('.popup__input_type_url');

// Попап изображения
export const popupTypeImage = document.querySelector('.popup_type_image');
export const popupImg = popupTypeImage.querySelector('.popup__image');
export const popupCaption = popupTypeImage.querySelector('.popup__caption');

// Заполняем список карточек из initialCards
initialCards.forEach(function (element) {
  const cardElement = createCard(element, deleteCard, toggleLikeCard, openImgPopup);
  placesList.append(cardElement);
})

// Обработчик клика по кнопке редактирования профиля
profileEditButton.addEventListener('click', function () {
  openPopup(popupTypeEdit);
  // Заполняем инпуты значениями из профиля
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

// Обработчик клика по кнопке добавления новой карточки
buttonOpenAddCardForm.addEventListener('click', function () {
  openPopup(popupTypeNewCard);
  // Сбрасываем значения формы добавления карточки
  addFormElement.reset();
});

//Функция открывает попап изображения
function openImgPopup (event) {
  const card = event.target.closest('.card'); // Находим родительскую карточку, из которой было вызвано открытие
  const cardImg = card.querySelector('.card__image'); // Находим изображение и подпись на карточке
  const cardCaption = card.querySelector('.card__title');
  popupImg.src = cardImg.src; // Устанавливаем изображение и подпись в попап изображения
  popupImg.alt = `На фотографии изображен географический объект: ${cardCaption.textContent}`;
  popupCaption.textContent = cardCaption.textContent;
  openPopup(popupTypeImage); // Открываем попап изображения
}

// Обработчик сабмита формы редактирования профиля
function handleEditFormSubmit(event) {
    event.preventDefault();
    // Обновляем значения профиля
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    // Закрываем попап
    closePopup(popupTypeEdit);
}

// Обработчик сабмита формы добавления карточки
function handleAddFormSubmit(event) {
  event.preventDefault();
  // Создаем новую карточку и добавляем ее в начало списка
  const element = { 
    name: cardNameInput.value,
    link: cardUrlInput.value
  };
  const cardElement = createCard(element, deleteCard, toggleLikeCard, openImgPopup);
  placesList.prepend(cardElement);
  // Закрываем попап
  closePopup(popupTypeNewCard);
}

const popupTypeEditCloseButton = popupTypeEdit.querySelector('.popup__close');
const popupTypeNewCardButton = popupTypeNewCard.querySelector('.popup__close');
const popupTypeImageButton = popupTypeImage.querySelector('.popup__close');

popupTypeEditCloseButton.addEventListener('click', () => closePopup(popupTypeEdit));
popupTypeNewCardButton.addEventListener('click', () => closePopup(popupTypeNewCard));
popupTypeImageButton.addEventListener('click', () => closePopup(popupTypeImage));

// Устанавливаем обработчики сабмита форм
editFormElement.addEventListener('submit', handleEditFormSubmit);
addFormElement.addEventListener('submit', handleAddFormSubmit);