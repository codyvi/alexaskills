// Copyright 2018-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// Licensed under the Amazon Software License
// http://aws.amazon.com/asl/

/**
 * This file defines utilities to manage recipes
 */

// Images for known recipes
const RECIPE_IMAGES = {
    HON: "data:image/png;base64,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",
    BBQ: "https://s3.amazonaws.com/ask-samples-resources/images/sauce-boss/barbecue-sauce-500x500.png",
    THO: "https://s3.amazonaws.com/ask-samples-resources/images/sauce-boss/thousand island-sauce-500x500.png",
    PES: "https://s3.amazonaws.com/ask-samples-resources/images/sauce-boss/pesto-sauce-500x500.png",
    TAR: "https://s3.amazonaws.com/ask-samples-resources/images/sauce-boss/tartar-sauce-500x500.png",
    PIZ: "https://s3.amazonaws.com/ask-samples-resources/images/sauce-boss/pizza-sauce-500x500.png",
    CRA: "https://s3.amazonaws.com/ask-samples-resources/images/sauce-boss/cranberry-sauce-500x500.png",
    SEC: "https://s3.amazonaws.com/ask-samples-resources/images/sauce-boss/secret-sauce-500x500.png"
};
// Image for unknown recipes
const RECIPE_DEFAULT_IMAGE = "https://s3.amazonaws.com/ask-samples-resources/images/sauce-boss/secret-sauce-500x500.png";

module.exports = {

    /**
     * Returns an object containing the recipe (sauce) ID & spoken value by the User from the JSON request
     * Values are computing from slot "Item" or from Alexa.Presentation.APL.UserEvent arguments
     */
    getSauceItem(request){
        let sauceItem = {};
        // Touch Event Request ?
        if (request.type === 'Alexa.Presentation.APL.UserEvent') {
            sauceItem.id = request.arguments[1];
        } else {
            // Voice Intent Request
            const itemSlot = request.intent.slots["Item"];
            // Capture spoken value by the User
            if (itemSlot && itemSlot.value) {
                sauceItem.spoken = itemSlot.value;
            }
            // Find associated Sauce Id from Entity Resolution (if a match has been made)
            if (itemSlot &&
                itemSlot.resolutions &&
                itemSlot.resolutions.resolutionsPerAuthority[0] &&
                itemSlot.resolutions.resolutionsPerAuthority[0].status &&
                itemSlot.resolutions.resolutionsPerAuthority[0].status.code === 'ER_SUCCESS_MATCH') {
                sauceItem.id = itemSlot.resolutions.resolutionsPerAuthority[0].values[0].value.id;
            }
        }
        return sauceItem;
    },

    /**
     * Returns a random localized recipe from the list of available recipes
     */
    getRandomRecipe(handlerInput){
        const recipes = handlerInput.t('RECIPES');
        const keys = Object.keys(recipes);
        const randomIndex = Math.floor(Math.random() * keys.length);
        return recipes[keys[randomIndex]];
    },

    /**
     * Returns the Image URL associated to a recipe ID
     * When no dedicated Image is found, fallback to a default image 
     */
    getSauceImage(id){
        const url = RECIPE_IMAGES[id];
        if (url){
            return url;
        }
        return RECIPE_DEFAULT_IMAGE;
    }
}