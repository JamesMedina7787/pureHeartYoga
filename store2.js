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
  //          var id = cartRow.dataset.itemId
  //          items.push({
  //              id: id,
  //              quantity: quantity
            })
        }

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

function purchaseClicked() {
    var priceElement = 1000;
    var price = 10000;
    stripeHandler.open({
        amount: price
    })
}