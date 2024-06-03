const modalContainer = document.querySelector('#modalContainer');
const modal = document.querySelector('#modal');
const modalTitle = document.querySelector('#modalTitle');
const closeButton = document.querySelector('#modalCloseButton');
const modalContent = document.querySelector('#modalContent');

closeButton.addEventListener("click", () => closeModal());
function showModal(title, content) {
    modalTitle.textContent = title;
    modalContent.innerHTML = content;
    modalContainer.classList.remove('hidden');
    modalContainer.classList.add('flex');
}

function closeModal() {
    modalContainer.classList.add('hidden');
    modalContainer.classList.remove('flex');
}

modalContainer.addEventListener("click", (e) => {
    const { top, bottom, left, right } = modal.getBoundingClientRect();
    
    if (e.clientX < left || e.clientX > right || e.clientY < top || e.clientY > bottom) {
        closeModal();
    }
})

function showAddPlaceModal(lat, lng) {
    const title = "Add Place";
    const content = `
       
    `;
    
    showModal(title, content);
}
