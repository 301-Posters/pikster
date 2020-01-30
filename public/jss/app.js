'use strict';
console.log('help');

$('#change_password').on('click', event => {
  event.preventDefault();
  let newPassword = prompt('What would you like your new password to be?');
  $.post('/newPassword', {newPassword: newPassword});
})
