import './pages/index.css';
import {initialCards} from './scripts/cards.js';
import {createCard, deleteCard, toggleLikeCard} from './components/card.js';
import {openPopup, openImgPopup, closePopup} from './components/modal.js';


// Секция мест (карточек)
const placesList = document.querySelector('.places__list');

// Секция профиля
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

// Попап редактирования профиля
const popupTypeEdit = document.querySelector('.popup_type_edit');
const EditformElement = popupTypeEdit.querySelector('.popup__form');
const nameInput = EditformElement.querySelector('.popup__input_type_name');
const jobInput = EditformElement.querySelector('.popup__input_type_description');

// Попап добавления новой карточки
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const AddformElement = popupTypeNewCard.querySelector('.popup__form');
const cardNameInput = AddformElement.querySelector('.popup__input_type_card-name');
const cardUrlInput = AddformElement.querySelector('.popup__input_type_url');


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
profileAddButton.addEventListener('click', function () {
  openPopup(popupTypeNewCard);
  // Очищаем инпуты формы добавления карточки
  cardNameInput.value = '';
  cardUrlInput.value = '';
});

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

// Устанавливаем обработчики сабмита форм
EditformElement.addEventListener('submit', handleEditFormSubmit);
AddformElement.addEventListener('submit', handleAddFormSubmit);