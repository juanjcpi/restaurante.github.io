document.addEventListener('DOMContentLoaded', function() {
    const cartItems = [];
    const cartElement = document.querySelector('.cart-items');
    const orderButton = document.querySelector('.order-button');

    document.querySelectorAll('.menu-item button').forEach(button => {
        button.addEventListener('click', function() {
            const menuItem = this.closest('.menu-item');
            const itemName = menuItem.querySelector('h3').innerText;
            const itemPrice = menuItem.querySelector('.price').innerText;
            
            const existingItem = cartItems.find(item => item.name === itemName);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cartItems.push({ name: itemName, price: itemPrice, quantity: 1 });
            }
            
            updateCart();
        });
    });

    orderButton.addEventListener('click', function() {
        let message = "Hola, quiero realizar la siguiente orden:\n";
        
        cartItems.forEach(item => {
            message += `${item.name} (x${item.quantity}): ${item.price}\n`;
        });
        
        const whatsappUrl = `https://wa.me/+573053270668?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    });

    function updateCart() {
        cartElement.innerHTML = '';
        cartItems.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${item.name} - ${item.price}</span>
                <div class="cart-item-controls">
                    <span>x${item.quantity}</span>
                    <button class="decrease">-</button>
                    <button class="remove">Eliminar</button>
                </div>
            `;

            li.querySelector('.decrease').addEventListener('click', function() {
                if (item.quantity > 1) {
                    item.quantity--;
                } else {
                    cartItems.splice(cartItems.indexOf(item), 1);
                }
                updateCart();
            });

            li.querySelector('.remove').addEventListener('click', function() {
                cartItems.splice(cartItems.indexOf(item), 1);
                updateCart();
            });

            cartElement.appendChild(li);
        });
    }
});
