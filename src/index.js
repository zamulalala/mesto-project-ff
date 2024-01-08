import './pages/index.css';
import {initialCards} from './scripts/cards.js';
import {createCard, deleteCard, toggleLikeCard} from './components/card.js';
import {openPopup, closePopup} from './components/modal.js';
import {enableValidation, clearValidation, validationConfig} from './components/validation.js';
import {getUserInfo, getInitialCards, updateProfile, addCard, updateAvatar} from './components/api.js';


// Секция мест (карточек)
const placesList = document.querySelector('.places__list');

// Секция профиля
const profileEditButton = document.querySelector('.profile__edit-button');
const buttonOpenAddCardForm = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const profileImage = document.querySelector(".profile__image");

// Попап редактирования профиля
const popupTypeEdit = document.querySelector('.popup_type_edit');
const editProfileFormElement = popupTypeEdit.querySelector('.popup__form');
const nameInput = editProfileFormElement.querySelector('.popup__input_type_name');
const jobInput = editProfileFormElement.querySelector('.popup__input_type_description');

// Попап добавления новой карточки
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const addFormElement = popupTypeNewCard.querySelector('.popup__form');
const cardNameInput = addFormElement.querySelector('.popup__input_type_card-name');
const cardUrlInput = addFormElement.querySelector('.popup__input_type_url');

// Попап изображения
export const popupTypeImage = document.querySelector('.popup_type_image');
export const popupImg = popupTypeImage.querySelector('.popup__image');
export const popupCaption = popupTypeImage.querySelector('.popup__caption');

// Попап редактирования аватара
const popupTypeAvatar = document.querySelector('.popup_type_avatar');
const editAvatarFormElement = popupTypeAvatar.querySelector('.popup__form');
const avatarUrlInput = editAvatarFormElement.querySelector('.popup__input_type_url');

let userId = '';

const loadInitialData = () => {
  return Promise.all([getUserInfo(), getInitialCards()])
    .then(([userInfo, initialCards]) => {
      userId = userInfo._id;
      profileName.textContent = userInfo.name;
      profileJob.textContent = userInfo.about;
      profileImage.style.backgroundImage = `url(${userInfo.avatar})`;

      initialCards.forEach(function (card) {
        const cardElement = createCard(card, userId, deleteCard, toggleLikeCard, openImgPopup);
        placesList.append(cardElement);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Обработчик клика по кнопке редактирования профиля
profileEditButton.addEventListener('click', function () {
  openPopup(popupTypeEdit);
  // Заполняем инпуты значениями из профиля
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  const inputList = Array.from(editProfileFormElement.querySelectorAll('.popup__input'));
  const buttonElement = editProfileFormElement.querySelector('.popup__button');
  clearValidation(inputList, buttonElement, editProfileFormElement, validationConfig);
});

// Обработчик клика по кнопке добавления новой карточки
buttonOpenAddCardForm.addEventListener('click', function () {
  openPopup(popupTypeNewCard);
  const inputList = Array.from(addFormElement.querySelectorAll('.popup__input'));
  const buttonElement = addFormElement.querySelector('.popup__button');
  clearValidation(inputList, buttonElement, addFormElement, validationConfig);
  // Сбрасываем значения формы добавления карточки
  addFormElement.reset();
});

profileImage.addEventListener('click', function () {
  openPopup(popupTypeAvatar);
  const inputList = Array.from(editAvatarFormElement.querySelectorAll('.popup__input'));
  const buttonElement = editAvatarFormElement.querySelector('.popup__button');
  clearValidation(inputList, buttonElement, editAvatarFormElement, validationConfig);
  editAvatarFormElement.reset();
})

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

// Функция для отображения состояния загрузки
function showLoadingIndicator(isLoading, buttonElement) {
  if (isLoading) {
    buttonElement.textContent = 'Сохранение...';
  } else {
    buttonElement.textContent = 'Сохранить';
  }
}

// Обработчик сабмита формы редактирования профиля
function handleEditProfileFormSubmit(event) {
  event.preventDefault()
  // Получаем значения из инпутов
  const newName = nameInput.value;
  const newJob = jobInput.value;

  // Показываем состояние загрузки
  showLoadingIndicator(1, popupTypeEdit.querySelector(".popup__button"));

  // Вызываем функцию обновления профиля
  updateProfile(newName, newJob)
    .then(() => {
      // Обновляем значения профиля после успешного обновления на сервере
      profileName.textContent = newName;
      profileJob.textContent = newJob;

      // Закрываем попап
      closePopup(popupTypeEdit);
    })
    .catch((err) => {
      // Обработка ошибки при обновлении профиля
      console.log(err);
    })
    .finally(() => {
      // Скрываем состояние загрузки
      showLoadingIndicator(0, popupTypeEdit.querySelector(".popup__button"));
    });
}


// Обработчик сабмита формы добавления карточки
function handleAddFormSubmit(event) {
  event.preventDefault();

  // Получаем значения из инпутов
  const name = cardNameInput.value;
  const link = cardUrlInput.value;

  // Показываем состояние загрузки
  showLoadingIndicator(1, popupTypeNewCard.querySelector(".popup__button"));

  // Вызываем функцию добавления карточки на сервер
  addCard(name, link)
    .then((card) => {
      // Создаем новую карточку и добавляем ее в начало списка
      const cardElement = createCard(
        card,
        userId,
        deleteCard, // Передаем функцию удаления карточки
        toggleLikeCard, // Передаем функцию переключения лайка
        openImgPopup // Передаем функцию открытия изображения
      );
      placesList.prepend(cardElement);

      // Закрываем попап
      closePopup(popupTypeNewCard);
    })
    .catch((err) => {
      // Обработка ошибки при добавлении карточки
      console.error(err);
    })
    .finally(() => {
      // Скрываем состояние загрузки
      showLoadingIndicator(0, popupTypeNewCard.querySelector(".popup__button"));
    });
}

// Обработчик сабмита формы редактирования аватара
function handleEditAvatarFormSubmit(event) {
  event.preventDefault();

  // Получаем значение из инпута
  const avatarUrl = avatarUrlInput.value;

  // Показываем состояние загрузки
  showLoadingIndicator(1, popupTypeAvatar.querySelector(".popup__button"));

  // Вызываем функцию обновления аватара на сервере
  updateAvatar(avatarUrl)
    .then((userInfo) => {
      // Обновляем аватар после успешного обновления на сервере
      profileImage.style.backgroundImage = `url(${userInfo.avatar})`;

      // Закрываем попап
      closePopup(popupTypeAvatar);
    })
    .catch((err) => {
      // Обработка ошибки при обновлении аватара
      console.error(err);
    })
    .finally(() => {
      // Скрываем состояние загрузки
      showLoadingIndicator(0, popupTypeAvatar.querySelector(".popup__button"));
    });
}

const popupTypeEditCloseButton = popupTypeEdit.querySelector('.popup__close');
const popupTypeNewCardButton = popupTypeNewCard.querySelector('.popup__close');
const popupTypeImageButton = popupTypeImage.querySelector('.popup__close');
const popupTypeAvatarButton = popupTypeAvatar.querySelector('.popup__close');

popupTypeEditCloseButton.addEventListener('click', () => closePopup(popupTypeEdit));
popupTypeNewCardButton.addEventListener('click', () => closePopup(popupTypeNewCard));
popupTypeImageButton.addEventListener('click', () => closePopup(popupTypeImage));
popupTypeAvatarButton.addEventListener('click', () => closePopup(popupTypeAvatar))

// Устанавливаем обработчики сабмита форм
editProfileFormElement.addEventListener('submit', handleEditProfileFormSubmit);
addFormElement.addEventListener('submit', handleAddFormSubmit);
editAvatarFormElement.addEventListener('submit', handleEditAvatarFormSubmit);

enableValidation(validationConfig);

// Вызов функции для загрузки данных
loadInitialData();