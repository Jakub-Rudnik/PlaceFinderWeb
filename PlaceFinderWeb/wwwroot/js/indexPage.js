const placesCards = document.querySelectorAll(".place");
const placesBtn = document.querySelector("#showHidePlaces");
const arrowIcon = document.querySelector("#arrowIcon");
const placesModal = document.querySelector("#placesModal");
const placesContainer = document.querySelector("#placesContainer");
const contextMenu = document.querySelector("#contextMenu");
const PLACES_MODAL_TOP_BAR_HEIGHT = document.querySelector("#showHidePlaces").clientHeight;
let popups = [];

function getModalHeight() {
    return placesModal.clientHeight - PLACES_MODAL_TOP_BAR_HEIGHT;
}

places.forEach(place => {
    const latitude = Number(place.latitude);
    const longitude = Number(place.longitude);
    
    popups.push(new L.popup([latitude, longitude], {content: `
           <div class="flex flex-col items-right justify-center gap-4 w-full">
               <img src="${place.imageUrl}" alt="${place.name}" class="w-full h-32 object-cover rounded-lg">
               <h2 class="text-xl font-bold">${place.name}</h2>
               <p class="m-none">${place.description}</p>
           </div>
       `}));
    L.marker([latitude, longitude]).addTo(map).bindPopup(popups[popups.length - 1]);
})


placesCards.forEach(place => place.addEventListener("click", (e) => {
    const placeId = Number(place.dataset.popup);

    placesCards.forEach(place => {
        if (place.dataset.popup !== state.currClickedPlace) {
            place.classList.remove("ring-red-600", "ring-2");
        }
    });

    state.currClickedPlace = placeId;

    if (state.currClickedPlace !== placeId) {
        placesCards[state.currClickedPlace - 1].classList.remove("ring-red-600", "ring-2");
    }

    popups[Number(place.dataset.popup) - 1].toggle();
    map.setView([place.dataset.latitude, place.dataset.longitude])
}));

placesBtn.addEventListener("click", (e) => {
    if (e.target.dataset.open === "1") {
        placesModal.style.transform = `translateY(${getModalHeight()}px)`
        e.target.dataset.open = "0";
        arrowIcon.classList.add("rotate-180");
    } else {
        placesModal.style.transform = `translateY(0)`;
        e.target.dataset.open = "1";
        arrowIcon.classList.remove("rotate-180");
    }
})

map.addEventListener("popupclose", (e) => {
    placesCards[state.currClickedPlace - 1].classList.remove("ring-red-600", "ring-2");
});

map.addEventListener("popupopen", (e) => {
    const latlng = e.popup._latlng;
    placesCards.forEach(place => {
        if (Number(place.dataset.latitude) === latlng.lat && Number(place.dataset.longitude) === latlng.lng) {
            place.classList.add("ring-red-600", "ring-2");
        }
    })
})

window.addEventListener("resize", () => {
    if (placesBtn.dataset.open !== "1") {
        placesModal.style.transform = `translateY(${getModalHeight()}px)`
    }
})

map.addEventListener("contextmenu", (e) => {
    contextMenu.classList.add("flex");
    contextMenu.classList.remove("hidden");
    
    const mouseX = e.containerPoint.x;
    const mouseY = e.containerPoint.y;
    const menuHeight = contextMenu.getBoundingClientRect().height;
    const menuWidth = contextMenu.getBoundingClientRect().width;
    const windowWidth = e.target._size.x;
    const windowHeight =  e.target._size.y
   
    if (windowWidth - mouseX < menuWidth) {
        contextMenu.style.left = 'auto';
        contextMenu.style.right = `${windowWidth - mouseX}px`;
        contextMenu.style.top = `${mouseY + menuHeight/2}px`;
        
        if (windowHeight - mouseY < menuHeight) {
            contextMenu.style.top = `${mouseY - menuHeight/2}px`;
        }
    } else {
        contextMenu.style.right = 'auto';
        contextMenu.style.left = `${mouseX}px`;
        contextMenu.style.top = `${mouseY + menuHeight/2}px`;
        
        if (windowHeight - mouseY < menuHeight) {
            contextMenu.style.top = `${mouseY - menuHeight/2}px`;
        }
    }
   
    contextMenu.children[1].innerText = `${e.latlng.lat}, ${e.latlng.lng}`
})

map.addEventListener("mousedown", (e) => {
    if (contextMenu.classList.contains("flex")) {
        contextMenu.classList.add("hidden");
        contextMenu.classList.remove("flex");
    }
})
