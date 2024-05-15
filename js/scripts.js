const restaurants = [
    { name: "Pizza Place", category: "Italian", location: "Downtown", url: "Restaurant_1.html" },
    { name: "Sushi World", category: "Japanese", location: "Uptown", url: "restaurant2.html" },
    { name: "Burger Hub", category: "Fast Food", location: "Suburb", url: "restaurant3.html" },
    // Додайте більше ресторанів
];

function displayRestaurants(restaurants) {
    const restaurantList = document.getElementById("restaurantList");
    restaurantList.innerHTML = "";

    restaurants.forEach(restaurant => {
        const restaurantDiv = document.createElement("div");
        restaurantDiv.className = "restaurant";
        restaurantDiv.innerHTML = `<h2><a href="${restaurant.url}">${restaurant.name}</a></h2>
                                   <p>Category: ${restaurant.category}</p>
                                   <p>Location: ${restaurant.location}</p>`;
        restaurantList.appendChild(restaurantDiv);
    });
}

document.getElementById("searchInput").addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase();
    const filteredRestaurants = restaurants.filter(restaurant =>
        restaurant.name.toLowerCase().includes(searchTerm) ||
        restaurant.category.toLowerCase().includes(searchTerm) ||
        restaurant.location.toLowerCase().includes(searchTerm)
    );
    displayRestaurants(filteredRestaurants);
});

// Відображаємо всі ресторани при завантаженні сторінки
displayRestaurants(restaurants);
