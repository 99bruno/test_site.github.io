const restaurants = [
    { name: "Pizza Place", category: "Italian", location: "Downtown" },
    { name: "Sushi World", category: "Japanese", location: "Uptown" },
    { name: "Burger Hub", category: "Fast Food", location: "Suburb" },
    // Додайте більше ресторанів
];

function displayRestaurants(restaurants) {
    const restaurantList = document.getElementById("restaurantList");
    restaurantList.innerHTML = "";

    restaurants.forEach(restaurant => {
        const restaurantDiv = document.createElement("div");
        restaurantDiv.className = "restaurant";
        restaurantDiv.innerHTML = `<h2>${restaurant.name}</h2>
                                   <p>Category: ${restaurant.category}</p>
                                   <p>Location: ${restaurant.location}</p>`;
        restaurantList.appendChild(restaurantDiv);
    });
}

// Відображаємо всі ресторани при завантаженні сторінки
displayRestaurants(restaurants);

document.getElementById("searchInput").addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase();
    const filteredRestaurants = restaurants.filter(restaurant =>
        restaurant.name.toLowerCase().includes(searchTerm) ||
        restaurant.category.toLowerCase().includes(searchTerm) ||
        restaurant.location.toLowerCase().includes(searchTerm)
    );
    displayRestaurants(filteredRestaurants);
});
