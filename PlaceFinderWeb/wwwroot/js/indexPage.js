const placesCards = document.querySelectorAll(".place");
const placesBtn = document.querySelector("#showHidePlaces");
const arrowIcon = document.querySelector("#arrowIcon");
const placesModal = document.querySelector("#placesModal");
const placesContainer = document.querySelector("#placesContainer");
const contextMenuContainer = document.querySelector("#contextMenuContainer");
const contextMenu = document.querySelector("#contextMenu");
const contextMenuLatLang = document.querySelector("#contextMenuLatLang");
const contextMenuCreateLink = document.querySelector("#contextMenuCreateLink");
const PLACES_MODAL_TOP_BAR_HEIGHT = document.querySelector("#showHidePlaces").getBoundingClientRect().height;
let popups = [];

function getModalHeight() {
    return placesContainer.getBoundingClientRect().height;
}

function addPlaceIdToUrl(placeId) {
    const url = new URL(window.location.href);
    
    url.searchParams.set("placeid", placeId);
    
    window.history.pushState({placeId: placeId}, "", url);
}

function findPlaceCardIdx(placeId) {
   placesCards.forEach((place, i) => {
       console.log(Number(place.dataset.popup), placeId, i)
       if (Number(place.dataset.popup) === placeId) {
           console.log(i)
           return i;
       }
   }) 
}

function findPopup(lat, lng) {
    return popups.find(popup => popup._latlng.lat === lat && popup._latlng.lng === lng);
}

places.forEach(place => {
    const latitude = Number(place.latitude);
    const longitude = Number(place.longitude);
    
    popups.push(new L.popup([latitude, longitude], {content: `
           <div class="flex flex-col items-right justify-center gap-3 w-full">
               <img src="images//places/${place.imageUrl}" alt="${place.name}" class="w-full h-32 object-cover rounded-lg">
               <h2 class="text-xl font-bold">${place.name}</h2>
               <p class="m-none">${place.description}</p>
           </div>
       `, closeButton: false}));
    L.marker([latitude, longitude]).addTo(map).bindPopup(popups[popups.length - 1]);
})

//After popups are created, we can check if the url has a placeId query parameter and open the popup with that id
const url = new URL(window.location.href);
const placeId = url.searchParams.get("placeid");

if (placeId !== null) {
    const numPlaceId = Number(placeId);

    window.history.pushState({placeId: numPlaceId}, "", url);
    
    const placeObj = places.find(place => place.id === numPlaceId);
    
    findPopup(Number(placeObj.latitude), Number(placeObj.longitude)).toggle();

    placesCards.forEach(place => {
        if (Number(place.dataset.popup) === numPlaceId) {
            place.classList.add("ring-red-600", "ring-2");
            place.scrollIntoView();
        }
        map.setView([place.dataset.latitude, place.dataset.longitude])
    }) 
    
    // placesCards[placeIdx].classList.add("ring-red-600", "ring-2");
    // placesCards[placeIdx].scrollIntoView();

}

placesCards.forEach(place => place.addEventListener("click", (e) => {
    const placeId = Number(place.dataset.popup);
    addPlaceIdToUrl(placeId);

    placesCards.forEach(place => {
        if (place.dataset.popup !== window.history.state.placeId) {
            place.classList.remove("ring-red-600", "ring-2");
        }
        
        if (window.innerWidth < 640) {
            placesModal.style.transform = `translateY(${getModalHeight()}px)`
            placesBtn.dataset.open = "0";
            arrowIcon.classList.add("rotate-180");
        }
    });

    
    if (window.history.state.placeId !== placeId) {
        placesCards.forEach(place => {
            if (Number(place.dataset.popup) === window.history.state.placeId) {
                place.classList.remove("ring-red-600", "ring-2");
            }
        
        })
    }
    
    popups.forEach(popup => {
        if (popup._latlng.lat === Number(place.dataset.latitude) && popup._latlng.lng === Number(place.dataset.longitude)) {
            popup.toggle();
        }
    })
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
    if (window.history.state) {
        placesCards.forEach(place => {
            if (Number(place.dataset.popup) === window.history.state.placeId) {
                place.classList.remove("ring-red-600", "ring-2");
            }
        }) 
    }
});

map.addEventListener("popupopen", (e) => {
    const latlng = e.popup._latlng;
    placesCards.forEach(place => {
        const placeId = Number(place.dataset.popup);
        
        if (Number(place.dataset.latitude) === latlng.lat && Number(place.dataset.longitude) === latlng.lng) {
            place.classList.add("ring-red-600", "ring-2");
            
            if (window.history.state === null || window.history.state.placeId !== placeId) {
                console.log('aa')
                addPlaceIdToUrl(placeId);
            }
            
            place.scrollIntoView();
        }
    })
})

window.addEventListener("popstate",  (e) => {
    const url = new URL(window.location.href);
    const placeId = url.searchParams.get("placeId");
    
    if (placeId === null) {
        placesCards.forEach(place => {
            if (place.classList.contains("ring-red-600", "ring-2")) {
                place.classList.remove("ring-red-600", "ring-2");
            }
        })
        
        popups.forEach(popup => {
            if (popup.isOpen()) {
                popup.toggle();
            }
        })
    }
    
    if (window.history.state) {
        const placeObj = places.find(place => place.id === window.history.state.placeId);

        console.log(placeObj)
        
        popups.forEach(popup => {
            if (popup._latlng.lat === Number(placeObj.latitude) && popup._latlng.lng === Number(placeObj.longitude)) {
                if (!popup.isOpen()) {
                    popup.toggle();
                    placesCards.forEach(place => {
                        if (Number(place.dataset.popup) !== window.history.state.placeId) {
                            place.classList.remove("ring-red-600", "ring-2");
                        } else {
                            place.classList.add("ring-red-600", "ring-2");
                        }
                    })
                }
            }
        })
    }
});

window.addEventListener("resize", () => {
    if (placesBtn.dataset.open === "0") {
        placesModal.style.transform = `translateY(${getModalHeight()}px)`
    }
})

map.addEventListener("contextmenu", (e) => {
    const mouseX = e.containerPoint.x;
    const mouseY = e.containerPoint.y;
    const menuHeight = contextMenu.getBoundingClientRect().height;
    const menuWidth = contextMenu.getBoundingClientRect().width;
    const windowWidth = e.target._size.x;
    const windowHeight =  e.target._size.y
  
    contextMenuContainer.style.height = `${menuHeight}px`;
    
    if (windowWidth - mouseX < menuWidth) {
        contextMenuContainer.style.left = 'auto';
        contextMenuContainer.style.right = `${windowWidth - mouseX}px`;
        contextMenuContainer.style.top = `${mouseY + menuHeight/2}px`;
        
        if (windowHeight - mouseY < menuHeight) {
            contextMenuContainer.style.top = `${mouseY - menuHeight/2}px`;
        }
    } else {
        contextMenuContainer.style.right = 'auto';
        contextMenuContainer.style.left = `${mouseX}px`;
        contextMenuContainer.style.top = `${mouseY + menuHeight/2}px`;
        
        if (windowHeight - mouseY < menuHeight) {
            contextMenuContainer.style.top = `${mouseY - menuHeight/2}px`;
        }
    }

    contextMenuLatLang.innerText = `${e.latlng.lat}, ${e.latlng.lng}`;
    contextMenuCreateLink.href = `/places/create?latitude=${e.latlng.lat}&longitude=${e.latlng.lng}`;
})

function closeContextMenu() {
    if (contextMenuContainer.style.height !== "0px") {
        contextMenuContainer.style.height = "0px"
    }
}

map.addEventListener("mousedown", (e) => {
   closeContextMenu(); 
})

contextMenuLatLang.addEventListener("click", (e) => {
    const latlang = contextMenuLatLang.innerText;
    navigator.clipboard.writeText(latlang).then(() => {
        showToast("Copied to clipboard", "success"); 
    });
    closeContextMenu();
})