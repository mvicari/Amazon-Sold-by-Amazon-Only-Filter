// ==UserScript==
// @name         Amazon Sold by Amazon Only Filter
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Modify Amazon search to show only items sold by Amazon
// @author       mvicari
// @match        *://*.amazon.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to modify the search
    function modifySearch(e) {
        // Prevent the default search
        e.preventDefault();
        // Get the search input
        var searchInput = document.getElementById('twotabsearchtextbox');
        var searchValue = searchInput ? searchInput.value : '';
        // Redirect to the search results with the 'rh' parameter included
        window.location.href = `/s?k=${encodeURIComponent(searchValue)}&rh=p_6%3AATVPDKIKX0DER`;
    }

    // Add event listener to the search form
    var searchForm = document.querySelector('form[name="site-search"]');
    if (searchForm) {
        searchForm.addEventListener('submit', modifySearch);
    }

    // Check if the user is already on a search results page
    const url = new URL(window.location.href);
    const storeIdEncoded = "p_6:ATVPDKIKX0DER";
    const hasRhParam = url.searchParams.get('rh') ? url.searchParams.get('rh').includes(storeIdEncoded) : false;
    
    // If the 'rh' parameter does not contain the store ID, modify the URL
    if (!hasRhParam && url.pathname.startsWith("/s")) {
        let existingRhParam = url.searchParams.get('rh') ? url.searchParams.get('rh') + ',' : '';
        url.searchParams.set('rh', `${existingRhParam}${storeIdEncoded}`);
        window.location.href = url.toString();
    }
})();