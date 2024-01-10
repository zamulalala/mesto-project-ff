(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-3",headers:{authorization:"0de2e1ff-8abf-4de1-b944-8a530ff1f5b4","Content-Type":"application/json"}},t=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))},n=document.querySelector("#card-template").content;function r(e,t,r,o,c){var a=n.querySelector(".card").cloneNode(!0),u=a.querySelector(".card__image");u.src=e.link,u.alt="На фотографии изображен географический объект: ".concat(e.name),a.querySelector(".card__title").textContent=e.name;var i=a.querySelector(".card__like-count");i.textContent=e.likes.length;var l=a.querySelector(".card__delete-button");e.owner._id===t?l.addEventListener("click",(function(){return r(e._id,a)})):l.remove();var s=a.querySelector(".card__like-button");return s.addEventListener("click",(function(){return o(e._id,s,i)})),u.addEventListener("click",c),a}function o(n,r){(function(n){return fetch("".concat(e.baseUrl,"/cards/").concat(n),{method:"DELETE",headers:e.headers}).then((function(e){return t(e)}))})(n).then((function(){r.remove()})).catch((function(e){console.log(e)}))}function c(n,r,o){r.classList.contains("card__like-button_is-active")?function(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"DELETE",headers:e.headers}).then((function(e){return t(e)}))}(n).then((function(e){r.classList.remove("card__like-button_is-active"),o.textContent=e.likes.length})).catch((function(e){console.log(e)})):function(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"PUT",headers:e.headers}).then((function(e){return t(e)}))}(n).then((function(e){r.classList.add("card__like-button_is-active"),o.textContent=e.likes.length})).catch((function(e){console.log(e)}))}function a(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",i)}function u(e){e.target.classList.contains("popup")&&l(e.target)}function i(e){"Escape"===e.key&&l(document.querySelector(".popup_is-opened"))}function l(e){e.classList.remove("popup_is-opened"),document.removeEventListener("click",u),document.removeEventListener("keydown",i)}var s=function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""};function d(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))}function p(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);r.disabled=!0,r.classList.add(t.inactiveButtonClass),n.forEach((function(n){s(e,n,t)}))}function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var _=document.querySelector(".places__list"),v=document.querySelector(".profile__edit-button"),y=document.querySelector(".profile__add-button"),m=document.querySelector(".profile__title"),h=document.querySelector(".profile__description"),S=document.querySelector(".profile__image"),b=document.querySelector(".popup_type_edit"),q=b.querySelector(".popup__form"),E=q.querySelector(".popup__input_type_name"),g=q.querySelector(".popup__input_type_description"),L=document.querySelector(".popup_type_new-card"),k=L.querySelector(".popup__form"),C=k.querySelector(".popup__input_type_card-name"),x=k.querySelector(".popup__input_type_url"),A=document.querySelector(".popup_type_image"),U=A.querySelector(".popup__image"),w=A.querySelector(".popup__caption"),j=document.querySelector(".popup_type_avatar"),O=j.querySelector(".popup__form"),T=O.querySelector(".popup__input_type_url"),B="";function P(e){var t,n,r=e.target.closest(".card");if(r){var o={link:r.querySelector(".card__image").src,caption:r.querySelector(".card__title").textContent};t=o.link,n=o.caption,U.src=t,U.alt="На фотографии изображен географический объект: ".concat(n),w.textContent=n,a(A)}}function D(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Сохранение...",r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"Сохранить";t.textContent=e?n:r}v.addEventListener("click",(function(){a(b),E.value=m.textContent,g.value=h.textContent,p(q,H)})),y.addEventListener("click",(function(){a(L),p(k,H),k.reset()})),S.addEventListener("click",(function(){a(j),p(O,H),O.reset()})),document.querySelectorAll(".popup").forEach((function(e){e.addEventListener("click",u)}));var I=b.querySelector(".popup__close"),M=L.querySelector(".popup__close"),N=A.querySelector(".popup__close"),J=j.querySelector(".popup__close");I.addEventListener("click",(function(){return l(b)})),M.addEventListener("click",(function(){return l(L)})),N.addEventListener("click",(function(){return l(A)})),J.addEventListener("click",(function(){return l(j)})),q.addEventListener("submit",(function(n){n.preventDefault();var r=E.value,o=g.value;D(!0,n.submitter),function(n,r){var o={name:n,about:r};return fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify(o)}).then((function(e){return t(e)}))}(r,o).then((function(e){m.textContent=e.name,h.textContent=e.about,l(b)})).catch((function(e){console.log(e)})).finally((function(){D(!1,n.submitter)}))})),k.addEventListener("submit",(function(n){n.preventDefault();var a=C.value,u=x.value;D(!0,n.submitter),function(n,r){var o={name:n,link:r};return fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify(o)}).then((function(e){return t(e)}))}(a,u).then((function(e){var t=r(e,B,o,c,P);_.prepend(t),l(L)})).catch((function(e){console.error(e)})).finally((function(){D(!1,n.submitter)}))})),O.addEventListener("submit",(function(n){n.preventDefault();var r=T.value;D(!0,n.submitter),function(n){var r={avatar:n};return fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify(r)}).then((function(e){return t(e)}))}(r).then((function(e){S.style.backgroundImage="url(".concat(e.avatar,")"),l(j)})).catch((function(e){console.error(e)})).finally((function(){D(!1,n.submitter)}))}));var H={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};!function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);d(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?s(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)}(e,t,t.validationMessage,n)}(e,o,t),d(n,r,t)}))}))}(t,e)}))}(H),Promise.all([fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then((function(e){return t(e)})),fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then((function(e){return t(e)}))]).then((function(e){var t,n,a=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,u=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(u.push(r.value),u.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return u}}(t,n)||function(e,t){if(e){if("string"==typeof e)return f(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?f(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),u=a[0],i=a[1];B=u._id,m.textContent=u.name,h.textContent=u.about,S.style.backgroundImage="url(".concat(u.avatar,")"),i.forEach((function(e){var t=r(e,B,o,c,P);_.append(t)}))})).catch((function(e){console.log(e)}))})();