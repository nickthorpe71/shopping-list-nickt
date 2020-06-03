'use strict';

/**
 * Ensures button state matches item state
 */
function correctState() {
  let list = $('.shopping-item');

  $.each(list, function (index, item) {
    let buttonLabel = $(item).parent().find('.shopping-item-toggle .button-label');
    if ($(item).hasClass('shopping-item__checked')) {
      buttonLabel.text('uncheck');
    } else {
      buttonLabel.text('check');
    }
  });
}

function handleUserInput() {

  //set up a listener on the input field of the add item form
  $('#js-shopping-list-form input').on('keypress', function (event) {
    //if user enters text and hits return
    if (event.which === 13) {
      event.preventDefault();
      //create a new shopping item at the bottom of the list
      crateNewItem(this.value);
    }
  });

  //set up a listener on the add item form
  //if user clicks the add item button
  $('#js-shopping-list-form').submit(function (event) {
    event.preventDefault();
    //create a new shopping item at the bottom of the list
    crateNewItem($('input').first().val());
  });

  //add a listener to the .shopping-list class
  $('.shopping-list').on('click', 'button', function () {
    //check which button was pressed
    let buttonLabel = $(this).find('.button-label');
    //check the list item name
    let item = $(this).closest('li').find('.shopping-item');
    //if delete was pressed
    if (buttonLabel.text() === 'delete') {
      deleteItem(item);
    }
    //if delete was pressed
    else if (buttonLabel.text() === 'check' || buttonLabel.text() === 'uncheck') {
      toggleItem(item, buttonLabel);
    }
  });
}

function toggleItem(item, buttonLabel) {
  if (item.css('text-decoration').indexOf('line-through') >= 0) {
    $(item.css('text-decoration', 'none'));
    buttonLabel.text('check');
  }
  else {
    $(item.css('text-decoration', 'line-through'));
    buttonLabel.text('uncheck');
  }
  $(item.toggleClass('shopping-item__checked'));
}

function deleteItem(item) {
  item.parent().remove();
}

function crateNewItem(item) {
  console.log(`Creating item: ${item}`);

  $('.shopping-list').append(
    `<li>
        <span class="shopping-item">${item}</span>
        <div class="shopping-item-controls">
          <button class="shopping-item-toggle">
            <span class="button-label">check</span>
          </button>
          <button class="shopping-item-delete">
            <span class="button-label">delete</span>
          </button>
        </div>
      </li>`
  );
}

$(function () {
  correctState();
  handleUserInput();
});