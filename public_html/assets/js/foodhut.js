/*!
=========================================================
* FoodHut Landing page
=========================================================

* Copyright: 2019 DevCRUD (https://devcrud.com)
* Licensed: (https://devcrud.com/licenses)
* Coded by www.devcrud.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// smooth scroll
$(document).ready(function(){
    $(".navbar .nav-link").on('click', function(event) {

        if (this.hash !== "") {

            event.preventDefault();

            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 700, function(){
                window.location.hash = hash;
            });
        } 
    });
});

new WOW().init();

function initMap() {
    var uluru = {lat: 37.227837, lng: -95.700513};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 8,
      center: uluru
    });
    var marker = new google.maps.Marker({
      position: uluru,
      map: map
    });
 }


 // Back to top button
 $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
        $('.back-to-top').fadeIn('slow');
    } else {
        $('.back-to-top').fadeOut('slow');
    }
});
$('.back-to-top').click(function () {
    $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
    return false;
});



function fetchImages() {
    const folderPath = 'assets/img/';
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    const sliderContainer = document.querySelector('.slider-container');
    const slider = sliderContainer.querySelector('.slider');

    fetch(folderPath, {
        headers: {
            Accept: 'application/json'
        }
    })
        .then(response => response.text())
        .then(data => {
            const files = JSON.parse(data); // Parse the data string into a JSON array
            const images = [];
    
            files.forEach((file, index) => {
                const filePath = folderPath + file;
                const fileExtension = file.split('.').pop().toLowerCase();
                if (imageExtensions.includes(fileExtension)) {
                    const img = document.createElement('img');
                    img.src = filePath;
                    img.id = `slide-${index + 1}`; // Add an id attribute
                    images.push(img);
                    slider.appendChild(img); // Add the img element to the slider container
                }
            });

            // Create navigation links for each image
            const sliderNav = sliderContainer.querySelector('.slider-nav');
            images.forEach((img, index) => {
                const navLink = document.createElement('a');
                navLink.href = `#slide-${index + 1}`;
                sliderNav.appendChild(navLink);
            });
        })
}

fetchImages();