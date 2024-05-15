/* global Papa */



document.addEventListener("DOMContentLoaded", function () {
    Papa.parse("data/Restaurants.csv", {
        download: true,
        header: true,
        complete: function (results) {
            const restaurants = results.data;
            displayRestaurants(restaurants);
            setupSearch(restaurants);
        }
    });
});

function displayRestaurants(restaurants) {
    const restaurantList = document.getElementById("restaurantList");
    restaurantList.innerHTML = "";

    restaurants.forEach(restaurant => {
        const restaurantDiv = document.createElement("div");
        restaurantDiv.className = "restaurant";
        restaurantDiv.innerHTML = `
            <h2><a href="restaurants/restaurant_${restaurant.Google_ID}.html">${restaurant.Name}</a></h2>
            <p>Address: ${restaurant.Address}</p>
            <p>Open time: ${restaurant['Monday Open time']}</p>
            <p>Overall price level: ${restaurant['Overall price level']}</p>`;
        restaurantList.appendChild(restaurantDiv);
    });
}

function setupSearch(restaurants) {
    document.getElementById("searchInput").addEventListener("input", function () {
        const searchTerm = this.value.toLowerCase();
        const filteredRestaurants = restaurants.filter(restaurant =>
            restaurant.Name.toLowerCase().includes(searchTerm) ||
            restaurant.Address.toLowerCase().includes(searchTerm) ||
            restaurant.Type.toLowerCase().includes(searchTerm)
        );
        displayRestaurants(filteredRestaurants);
    });
}
