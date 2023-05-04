/*!
* Start Bootstrap - Business Casual v7.0.8 (https://startbootstrap.com/theme/business-casual)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-business-casual/blob/master/LICENSE)
*/
// Highlights current date on contact page
// window.addEventListener('DOMContentLoaded', event => {
//     const listHoursArray = document.body.querySelectorAll('.list-hours li');
//     listHoursArray[new Date().getDay()].classList.add(('today'));
// })

/*********************************************************************
 *                          Maori Fine Crafts Site                   *
 * CIS 5620: Authoring Websites                                      *
 *********************************************************************/

// Data structure containing all product data displayed on the webpage
(() => {


//today's class
const CART = [];
// 2. add products 
// 2.1 update cart with new products

function addProduct() {
    console.log("ADD PRODUCT !!!");

   const productE = $(this);
   console.log(productE.data('product-id'));


    // get the product id
    const productId = $(this).data('product-id');
    //add the product id to the cart array
    CART.push(productId);
    // update cart total
    
    console.log(CART);

}

  // 3. show products in cart
//today's class
function showCart() {
    
    // $("products-cart").empty();
     $("#products-cart").empty();
 
     for(const productId of CART) {
         const productHTML = getProductHTML(productId);
 
         //$("products-cart").append(productHTML);
         $("#products-cart").append(productHTML);
 
     }
 }










    const PRODUCTS = {
        product_1: {
            id: "product_1",
            name: "Hand Grinder",
            description: "Hand-carved traditional Maori style bone Koru pendant",
            price: 50,
            stars: 1,
            image: "assets/img/handgrinder.jpg"
        }, product_2: {
            id: "product_2",
            name: "Hario V 60",
            description: "Maori model war canoe of carved wood, with a raised stern and a prow in the shape of a human head",
            price: 200,
            stars: 5,
            image: "assets/img/hariov60.jpg"
        }, product_3: {
            id: "product_3",
            name: "AeroPress",
            description: "Vintage prominent Maori Tekoteko warrior figure",
            price: 30,
            stars: 4,
            image: "assets/img/aeropress.jpg"
        }, product_4: {
            id: "product_4",
            name: "Chemex Pour Over",
            description: "This fine Maori work is a handcrafted piece of brassware considered highly attractive and artistic",
            price: 150,
            stars: 2,
            image: "assets/img/chemex.jpg" 
        }, product_5: {
            id: "product_5",
            name: "Indonesia Bies Penantan",
            description: "Approximately 15 to 17 Abalone 15x25 mm beads on a 15-inch strand",
            price: 50,
            stars: 3,
            image: "assets/img/indonesia.jpg"
        }, product_6: {
            id: "product_6",
            name: "Passenger Coffee",
            description: "Approximately 15 to 17 Abalone 15x25 mm beads on a 15-inch strand",
            price: 50,
            stars: 3,
            image: "assets/img/passenger.jpg" 
        }
    };
    
    /**
       Generates the HTML for displaying one product given its id in the
       PRODUCTS object. This function follows a clone-find-update approach:
       1. CLONE an HTML element to use as a template
       2. FIND the elements using selectors
       3. UPDATE the elements to customize their content
    
       @param    {number} productId An identifier in the PRODUCTS object to display
    
       @returns  {string} A string with the HTML of the product.
    */
    function getProductHTML(productId) {
        // Obtain product data from the PRODUCTS object
        const product = PRODUCTS[productId];
    
        // CLONE an HTML element to use as a template
        const productHTML = $("#product-template").clone();
    
        // Delete id to avoid duplicates
        productHTML.prop('id', '');
    
        // FIND and UPDATE the product's name
        productHTML.find(".product-name").text(product.name);
        productHTML.find(".product-price").text(product.price.toFixed(2));
    
        // FIND and UPDATE the product's image properties
        productHTML.find("img").
            prop("src", product.image).
            prop("alt", product.name);
    
        // Customize the product's reviews    
        const starHTML = productHTML.find(".product-reviews").find("div");
        for (let starsCounter = 2; starsCounter <= product.stars; starsCounter++) {
            const newStartHTML = starHTML.clone();
            productHTML.find(".product-reviews").append(newStartHTML);
        }

         // Customize the product's "Add to cart" button
         productHTML
         .find(".product-action")
         .text("Add to cart")
         //today's class
         .data("productId", product.id)
         .on("click",addProduct);
    
        // Remove .d-none to make the product visible
        productHTML.removeClass("d-none");
    
        return productHTML;
    }
    
    /**
        Show all products in the application's homepage
    
        @returns  No value.
    */
    function showProducts(products) {
        // Traverse the products object
        for (let product of products) {
    
            // Generate each product's HTML
            const productHTML = getProductHTML(product.id);
            $('#products').append(productHTML);
        }
    }
    
    function search() {
        //  1. create a new search results object(will be empty in the beginning)
            const results = [];
    
        // 2. capture user's query 
        const query = $('#searchQuery').val().toLowerCase().trim();
        console.log(query);
    
    
        // 3. search over the products object for a given user's query
           // match users query against products name and description
           //update results object with the matching products
    
           for (const productId in PRODUCTS) {
            console.log(productId);
            const product = PRODUCTS[productId];
            if(product.name.toLowerCase().includes(query)) {
                results.push(product);
            }
           }
    
        //4. show matching products on page
        console.log(results);
    
        $('#products').empty();
        showProducts(results);
        
    }
    
        // 5. register the search function so it is executed when the user keys in a query
    
     $(document).ready(function () {    
    
    $('#searchQuery').on('keyup', search);
        
    
    showProducts(Object.values(PRODUCTS));

    $("#show-cart").on("click", showCart);
    
    });

    }) ();
    
    
    
    
    
    
    
    
    
    
    
    
