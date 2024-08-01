document.addEventListener('DOMContentLoaded', function() {
    const cartItems = [];
    const cartElement = document.querySelector('.cart-items');
    const orderButton = document.querySelector('.order-button');
    const header = document.querySelector('header');

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
        let message = "Orden de Cafetería Las Palmas:\n\n";
        cartItems.forEach(item => {
            message += `${item.name} (x${item.quantity}): ${item.price}\n`;
        });
        
        const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    });

    function updateCart() {
        cartElement.innerHTML = '';
        cartItems.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${item.name} - ${item.price}</span>
                <div class="cart-item-controls">
                    <button class="decrease">-</button>
                    <span>x${item.quantity}</span>
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

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            document.body.classList.add('scrolled');
        } else {
            document.body.classList.remove('scrolled');
        }
    });
});
