// Chargement des éléments existants depuis le localStorage
let savedItems = JSON.parse(localStorage.getItem('shoppingItems')) || []

// Fonction pour sauvegarder les éléments dans le localStorage
function saveToLocalStorage(items) {
    localStorage.setItem('shoppingItems', JSON.stringify(items))
}


// Affichage des éléments existants
let shoppingList = document.getElementById('shopping-list')
savedItems.forEach(function (item) {
    let newItem = createShoppingItemElement(item)
    shoppingList.appendChild(newItem)
});

document.getElementById('add-shopping-item').addEventListener('submit', function (event) {
    event.preventDefault();

    let input = document.getElementById('shopping-item-label')
    let input_value = input.value

    // Créer un nouvel élément li avec la classe Bootstrap
    let newItem = createShoppingItemElement({ label: input_value, checked: false })

    // Ajouter le nouvel élément à la liste
    shoppingList.appendChild(newItem)

    // Ajouter l'élément à la liste des éléments sauvegardés
    savedItems.push({ label: input_value, checked: false })
    saveToLocalStorage(savedItems);

    // Effacer la zone de saisie
    input.value = ''
})


// Fonction pour créer un élément li à partir d'un objet d'article
function createShoppingItemElement(item) {
    let newItem = document.createElement('li')
    newItem.className = 'list-group-item d-flex align-items-center'

    // Insérer une checkbox dans le nouvel élément li
    newItem.innerHTML = `<input class="from-check-input" type="checkbox" ${item.checked ? 'checked' : ''}>` +
        `<label class="ms-2 from-check-label">${item.label}</label>` +
        '<div class="remote-btn ms-auto ">' +
        `<button class="btn btn-success btn-sm" onclick="deleteItem(this)"><i class="bi bi-trash"></i></button>` +
        '<button class="btn btn-danger btn-sm"><i class="bi bi-pencil"></i></button>' +
        '</div>';

    return newItem;
}

// Fonction pour supprimer un élément de la liste et du localStorage
function deleteItem(button) {
    let listItem = button.closest('li')
    let label = listItem.querySelector('.from-check-label').innerText

    // Supprimer l'élément de la liste
    shoppingList.removeChild(listItem)

    // Supprimer l'élément du localStorage
    savedItems = savedItems.filter(item => item.label !== label)
    saveToLocalStorage(savedItems)
}
