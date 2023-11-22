// Data for the form elements
const menuOptions = [
    "Strawberry and Banana Smoothie", 
    "Peanut Butter and Banana Smoothie", 
    "Mixed Berries Smoothie", 
    "Green Kale & Spinach Smoothie", 
    "Chocoholic Smoothie",
    "Build your own Smoothie"
];
const baseOptions = ["Milk", "Yogurt", "Almond Milk", "Soy Milk"];
const fruitOptions = ["Strawberries", "Bananas", "Mixed Berries", "Apples", "Peaches"];
const vegetableOptions = ["Spinach", "Kale", "Celery", "Cucumber"];
const extrasOptions = ["Chia Seeds", "Protein Powder", "Honey", "Peanut Butter", "Cocoa Powder"];

// Function to populate a select dropdown
function populateSelect(selectId, options) {
    const select = document.getElementById(selectId);
    options.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option;
        opt.innerHTML = option;
        select.appendChild(opt);
    });
}

// Function to populate checkboxes
function populateCheckboxes(containerId, options) {
    const container = document.getElementById(containerId);
    options.forEach(option => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = option;
        checkbox.name = option;

        const label = document.createElement('label');
        label.htmlFor = option;
        label.textContent = option;

        container.appendChild(checkbox);
        container.appendChild(label);
        container.appendChild(document.createElement('br'));
    });
}

// Populating form elements
populateSelect('menu', menuOptions);
populateSelect('base', baseOptions);
populateCheckboxes('fruits', fruitOptions);
populateCheckboxes('Vegetable', vegetableOptions);
populateCheckboxes('extras', extrasOptions);

// Smoothie class
class Smoothie {
    constructor(menu, base, fruits, vegetables, extras) {
        this.menu = menu;
        this.base = base;
        this.fruits = fruits;
        this.vegetables = vegetables;
        this.extras = extras;
    }

    getDescription() {
        let description = `You selected the "${this.menu}" with a base of ${this.base}.`;
        if (this.menu === 'Build your own Smoothie') {
            description += this.fruits.length > 0 ? ` Fruits: ${this.fruits.join(', ')}.` : '';
            description += this.vegetables.length > 0 ? ` Vegetables: ${this.vegetables.join(', ')}.` : '';
            description += this.extras.length > 0 ? ` Extras: ${this.extras.join(', ')}.` : '';
        }
        return description;
    }

    calculatePrice() {
        let price = 0;
        price += 3; // base price for any smoothie
        price += this.fruits.length * 0.5;
        price += this.vegetables.length * 0.75;
        price += this.extras.length * 1;
        return price;
    }
}

// Event listener for the form submission
document.getElementById('generateButton').addEventListener('click', function() {
    const menu = document.getElementById('menu').value;
    const base = document.getElementById('base').value;
    const fruits = Array.from(document.querySelectorAll('#fruits input[type="checkbox"]:checked')).map(el => el.id);
    const vegetables = Array.from(document.querySelectorAll('#Vegetable input[type="checkbox"]:checked')).map(el => el.id);
    const extras = Array.from(document.querySelectorAll('#extras input[type="checkbox"]:checked')).map(el => el.id);

    const smoothie = new Smoothie(menu, base, fruits, vegetables, extras);

    // Display the smoothie description
    document.getElementById('smoothieDescription').textContent = smoothie.getDescription();

    // Calculate and display the total price
    const totalPrice = smoothie.calculatePrice();
    document.getElementById('billDetails').textContent = `Total Price: $${totalPrice.toFixed(2)}`;

    // Display the corresponding smoothie image
    const smoothieImageSrc = document.querySelector(`[alt="${smoothie.menu}"]`).src;
    const smoothieImage = document.getElementById('smoothieImage');
    smoothieImage.src = smoothieImageSrc;
    smoothieImage.style.display = 'block';
});