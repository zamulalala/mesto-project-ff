import './pages/index.css';
import {initialCards} from './scripts/cards.js';
import {createCard, deleteCard, toggleLikeCard} from './components/card.js';
import {openPopup, closePopup, closePopupByOverlay} from './components/modal.js';
import {enableValidation, clearValidation} from './components/validation.js';
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
  
  clearValidation(editProfileFormElement, validationConfig);
});

// Обработчик клика по кнопке добавления новой карточки
buttonOpenAddCardForm.addEventListener('click', function () {
  openPopup(popupTypeNewCard);
  
  clearValidation(addFormElement, validationConfig);
  // Сбрасываем значения формы добавления карточки
  addFormElement.reset();
});

profileImage.addEventListener('click', function () {
  openPopup(popupTypeAvatar);
  
  clearValidation(editAvatarFormElement, validationConfig);
  editAvatarFormElement.reset();
})

// Функция открывает попап изображения
function openImgPopup(event) {
  const card = event.target.closest('.card'); // Находим родительскую карточку, из которой было вызвано открытие

  if (card) {
    const cardData = {
      link: card.querySelector('.card__image').src,
      caption: card.querySelector('.card__title').textContent
    };

    setPopupImageContent(cardData.link, cardData.caption); // Устанавливаем изображение и подпись в попап изображения
    openPopup(popupTypeImage); // Открываем попап изображения
  }
}

// Функция устанавливает контент для попапа изображения
function setPopupImageContent(link, caption) {
  popupImg.src = link;
  popupImg.alt = `На фотографии изображен географический объект: ${caption}`;
  popupCaption.textContent = caption;
}

// Инициализация слушателя событий на все попапы (клик по оверлею)
document.querySelectorAll('.popup').forEach((popup) => {
  popup.addEventListener('click', closePopupByOverlay);
});

// Функция для отображения состояния загрузки
function showLoadingIndicator(isLoading, buttonElement, loadingText = 'Сохранение...', defaultText = 'Сохранить') {
  buttonElement.textContent = isLoading ? loadingText : defaultText;
}


// Обработчик сабмита формы редактирования профиля
function handleEditProfileFormSubmit(event) {
  event.preventDefault()
  // Получаем значения из инпутов
  const newName = nameInput.value;
  const newJob = jobInput.value;

  // Показываем состояние загрузки
  showLoadingIndicator(true, event.submitter);

  // Вызываем функцию обновления профиля
  updateProfile(newName, newJob)
    .then((userInfo) => {
      // Обновляем значения профиля после успешного обновления на сервере
      profileName.textContent = userInfo.name;
      profileJob.textContent = userInfo.about;

      // Закрываем попап
      closePopup(popupTypeEdit);
    })
    .catch((err) => {
      // Обработка ошибки при обновлении профиля
      console.log(err);
    })
    .finally(() => {
      // Скрываем состояние загрузки
      showLoadingIndicator(false, event.submitter);
    });
}


// Обработчик сабмита формы добавления карточки
function handleAddFormSubmit(event) {
  event.preventDefault();

  // Получаем значения из инпутов
  const name = cardNameInput.value;
  const link = cardUrlInput.value;

  // Показываем состояние загрузки
  showLoadingIndicator(true, event.submitter);

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
      showLoadingIndicator(false, event.submitter);
    });
}

// Обработчик сабмита формы редактирования аватара
function handleEditAvatarFormSubmit(event) {
  event.preventDefault();

  // Получаем значение из инпута
  const avatarUrl = avatarUrlInput.value;

  // Показываем состояние загрузки
  showLoadingIndicator(true, event.submitter);

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
      showLoadingIndicator(false, event.submitter);
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


// Объект с настройками валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

enableValidation(validationConfig);

// Вызов функции для загрузки данных
loadInitialData();