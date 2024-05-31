if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {


  var quantityInputs = document.getElementsByClassName('cart-quantity-input');
  for (var i = 0; i < quantityInputs.length; i++) {
      var input = quantityInputs[i];
      input.addEventListener('change', quantityChanged);
  }








    // Get all the "Remove" buttons

    // Rest of your code...



    // Rest of your code...
    var addToCartButtons = document.getElementsByClassName('shop-item-button');
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i];
        button.addEventListener('click', addToCartClicked);
    }


    var calendarCells = document.getElementsByClassName('calendar-cell');
    for (var i = 0; i < calendarCells.length; i++) {
        calendarCells[i].addEventListener('click', function(event) {
            // Get the item details from the clicked calendar cell
            var title = event.target.dataset.title;
            var id = event.target.dataset.id;

            // Call the addToCartClicked function with the selected item details
            addToCartClicked(event);
        });
    }

}

// ... Rest of the functions ...

// Call the ready function when the document is fully loaded


var stripeHandler = StripeCheckout.configure({
    key: publicKey,
    locale: 'en',
    token: function(token) {
  //      var items = []
  //      var cartItemContainer = document.getElementsByClassName('cart-items')[0]
  //      var cartRows = cartItemContainer.getElementsByClassName('cart-row')
  //      for (var i = 0; i < cartRows.length; i++) {
  //          var cartRow = cartRows[i]
  //          var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
  //          var quantity = quantityElement.value
  //          var id = cartRow.datase
  t.itemId
  //          items.push({
  //              id: id,
  //              quantity: quantity
  fetch('../book', {
    method : 'POST',
    headers : {
      'Content-Type': 'application/json',
      'headers': 'application/json'
    },
    body:JSON.stringify({
      stripeTokenId:token.id,
        })

    })
  }
})


  //      fetch('/purchase', {
  //          method: 'POST',
  //          headers: {
  //              'Content-Type': 'application/json',
  //              'Accept': 'application/json'
  //          },
  //          body: JSON.stringify({
  //              stripeTokenId: token.id,
  //              items: items
  //          })
  //      }).then(function(res) {
  //          return res.json()
  //      }).then(function(data) {
  //          alert(data.message)
  //          var cartItems = document.getElementsByClassName('cart-items')[0]
  //          while (cartItems.hasChildNodes()) {
  //              cartItems.removeChild(cartItems.firstChild)
  //          }
  //          updateCartTotal()
  //      }).catch(function(error) {
  //          console.error(error)
  //      })
  //  }
// })

//var stripeHandler = StripeCheckout.configure({


//    key: publicKey,
//    locale: 'en',
//    token: function(token) {


// }})



function purchaseClicked() {
    var priceElement = 1000;
    stripeHandler.open({
        amount: 5500
  })
}





function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}



function addToCartClicked(event) {
    var button = event.target
    let object = document.getElementById('info')
    var title = object.dataset.title
    var price = object.dataset.price
    var imageSrc = object.dataset.image
    var id = object.dataset.id

    addItemToCart(title, price, imageSrc, id)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc, id) {
    var cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    cartRow.dataset.itemId = id;

    const cartRowContents = `
            <div class="cart-item cart-column">
                <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
                <span class="cart-item-title">${title}</span>
            </div>
            <span class="cart-price cart-column">${price}</span>
            <div class="cart-quantity cart-column">
                <input class="cart-quantity-input" type="number" value="1">
                <button class="btn-danger" type="button">REMOVE</button>
            </div>
    `;

      cartRow.innerHTML = cartRowContents;
      var cartItems = document.getElementsByClassName('cart-items')[0];
      cartItems.append(cartRow);
      let removeButtons = document.getElementsByClassName('btn-danger');
      // Attach the event listener to each "Remove" button
      for (var i = 0; i < removeButtons.length; i++) {
        removeButtons[i].addEventListener('click', removeCartItem);
      }
      function removeCartItem(event) {
          var buttonClicked = event.target;
          var cartRow = buttonClicked.parentElement.parentElement;
          cartRow.remove();
          updateCartTotal();
        }

}
function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    var total = 0;

    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart-price')[0];
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        var price = parseFloat(priceElement.innerText.replace('$', ''));
        var quantity = quantityElement.value;
        total += price * quantity;
    }






    total = Math.round(total) / 100;
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total;
}
