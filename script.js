document.addEventListener("DOMContentLoaded", function() {
    // Variables
    const slideshow = document.getElementById('slideshow');
    const toolbar = document.getElementById('toolbar');
    const toggleToolbar = document.getElementById('toggleToolbar');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const toggleCarousel = document.getElementById('toggleCarousel');
    const randomBtn = document.getElementById('randomBtn');
    const thumbnailsContainer = document.getElementById('thumbnails');
    const prevPageBtn = document.getElementById('prevPageBtn');
    const nextPageBtn = document.getElementById('nextPageBtn');
    const slides = [
        { image: 'images/img1.jpg', legend: 'Portugal'          },
        { image: 'images/img2.jpg', legend: 'Londres'           },
        { image: 'images/img3.jpg', legend: 'Musée du Louvre'   },
        { image: 'images/img4.jpg', legend: 'Valencia'           },
        { image: 'images/img5.jpg', legend: 'Copenhague'        },
        { image: 'images/img6.jpg', legend: 'Istanbul'        },
        { image: 'images/img7.jpg', legend: 'Toronto'           },
        { image: 'images/img8.jpg', legend: 'Sidi Bou Said'             },
        { image: 'images/img9.jpg', legend: 'Tour Eiffel'       },
        { image: 'images/img10.jpg', legend: 'Italie'           }
    ];
    let currentIndex = 0;
    let intervalId = null;
    let currentPage = 0;

    // Fonctions
    function hideToolbar() {
        toolbar.style.display = 'none';
        document.getElementById('thumbnails-container').style.display = 'flex';
    }
    
    function showToolbar() {
        toolbar.style.display = 'flex';
        document.getElementById('thumbnails-container').style.display = 'none';
    }
    

    function toggleToolbarVisibility() {
        var icon;
        if (toolbar.style.display === 'flex') {
            
            hideToolbar();
        } else {
            showToolbar();
        }
        icon = document.querySelector('#toggleToolbar i');
        icon.classList.toggle('fa-arrow-down');
        icon.classList.toggle('fa-arrow-right');
    }
 

    function showImage(index) {
        slideshow.innerHTML = `
            <figure>
                <img src="${slides[index].image}" alt="Image ${index + 1}">
                <figcaption>${slides[index].legend}</figcaption>
            </figure>
        `;
    }
    

    function showThumbnails() {
        const startIndex = currentPage * 5;
        const endIndex = startIndex + 5;
        thumbnailsContainer.innerHTML = '';
        slides.slice(startIndex, endIndex).forEach((slide, index) => {
            const thumbnail = document.createElement('img');
            thumbnail.src = slide.image;
            thumbnail.alt = `Thumbnail ${startIndex + index + 1}`;
            thumbnail.classList.add('thumbnail');
            if (startIndex + index === currentIndex) {
                thumbnail.classList.add('active');
            }
            thumbnail.addEventListener('click', () => {
                currentIndex = startIndex + index;
                showImage(currentIndex);
                document.querySelectorAll('.thumbnail').forEach(thumb => thumb.classList.remove('active'));
                thumbnail.classList.add('active');
            });
            thumbnailsContainer.appendChild(thumbnail);
        });
    }

    function startCarousel() {
        intervalId = setInterval(() => {
            currentIndex = (currentIndex + 1) % slides.length;
            showImage(currentIndex);
            updateThumbnail();
        }, 2000);
        toggleCarousel.innerHTML = '<i class="fas fa-pause"></i>';
    }

    function stopCarousel() {
        clearInterval(intervalId);
        toggleCarousel.innerHTML = '<i class="fas fa-play"></i>';
    }
   
    function toggleCarouselState() {
        if (intervalId) {
            stopCarousel();
        } else {
            startCarousel();
        }
    }

    function updateThumbnail() {
        document.querySelectorAll('.thumbnail').forEach(thumb => thumb.classList.remove('active'));
        thumbnailsContainer.children[currentIndex % 5].classList.add('active');
    }

    function moveSlide(direction) {
        if (direction === 'prev') {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        } else {
            currentIndex = (currentIndex + 1) % slides.length;
        }
        showImage(currentIndex);
        updateThumbnail();
    }

    function randomSlide() {
        let newIndex = currentIndex;
        while (newIndex === currentIndex) {
            newIndex = Math.floor(Math.random() * slides.length);
        }
        currentIndex = newIndex;
        return currentIndex;
    }
    function startCarouselrandom() {
        intervalId = setInterval(() => {
            currentIndex = randomSlide();
            showImage(currentIndex);
            updateThumbnail();
        }, 2000);
        randomBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
    function stopRandomCarousel() {
        clearInterval(intervalId);
        randomBtn.innerHTML = '<i class="fas fa-random"></i>';
    } 
    function toggleRandomCarouselState() {
        if (intervalId) {
            stopRandomCarousel();
        } else {
            startCarouselrandom()
        }
    }

    // function randomSlide1() {
    //     let newIndex = currentIndex;
    //     if (currentIndex === slides.length-1){
    //         while (newIndex === currentIndex) {
    //             newIndex = Math.floor(Math.random() * slides.length);
    //         }
    //     } else{
    //     while (newIndex <= currentIndex){
    //         newIndex = Math.floor(Math.random() * slides.length);
    //     }}
    //     currentIndex = newIndex;
    //     return currentIndex;
    // }

    function nextPage() {
        currentPage++;
        if (currentPage * 5 >= slides.length) {
            currentPage = 0;
        }
        showThumbnails();
    }

   
    function prevPage() {
        currentPage--;
        if (currentPage < 0) {
            currentPage = Math.ceil(slides.length / 5) - 1;
        }
        showThumbnails();
    }
    
    

    
    showImage(0); 

    
    showThumbnails();

    // Écouteurs d'événements
    toggleToolbar.addEventListener('click', toggleToolbarVisibility);
    prevBtn.addEventListener('click', () => moveSlide('prev'));
    nextBtn.addEventListener('click', () => moveSlide('next'));
    toggleCarousel.addEventListener('click', toggleCarouselState);
    randomBtn.addEventListener('click', toggleRandomCarouselState);
    

    prevPageBtn.addEventListener('click', () => {
        prevPage()
       
        if (currentPage === Math.ceil(slides.length / 5) - 1 && currentIndex === slides.length - 1) {
            currentIndex = -1;
        }
    });
    nextPageBtn.addEventListener('click', () => {
        
        nextPage()
       
        if (currentPage === 0 && currentIndex === 0) {
            currentIndex = slides.length;
        }
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowLeft') {
            moveSlide('prev');
        } else if (event.key === 'ArrowRight') {
            moveSlide('next');
        } else if (event.code === 'Space') {
            toggleCarouselState();
        }
    });
});
