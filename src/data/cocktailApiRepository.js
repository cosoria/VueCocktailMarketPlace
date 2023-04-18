import axios from "axios";

const baseURL = 'https://www.thecocktaildb.com/api/json/v1/1/';

export function searchByFirstLetter(firstLetter) {
    return new Promise((resolve, reject) => {
        axios.get(`${baseURL}/search.php?f=${firstLetter}`).then(response => {
            if(response?.data?.drinks) {
                const products = response.data.drinks.map(c => _mapCocktail(c));
                resolve(products);
            } else {
                reject(null);
            }
        }).catch(error => {
            reject(error);
        });
    });
}

function _mapCocktail(cocktail) {
    return {
        id: cocktail.idDrink,
        name: cocktail.strDrink,
        instructions: cocktail.strInstructions,
        imgUrl: cocktail.strDrinkThumb,
        inventoryCount: 0,
        price: 0,
        salePrice: 0
    };
}