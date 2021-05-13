let editModalWindow = document.querySelector('.edit-modal-window');
let editButton = document.querySelector('.profile__edit-button');


editButton.addEventListener('click', function() {
  editModalWindow.classList.add('edit-modal-window_opened');
});