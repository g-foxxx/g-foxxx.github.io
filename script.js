const header = document.querySelector('.sticky-header');
const floatingButton = document.getElementById('floatingButton');
const draggableContainer = document.getElementById('draggable-container');
let offsetX, offsetY;
let isDragging = false;
let isHeaderTransitioning = false;
let lastScrollPosition = 0;

window.addEventListener('scroll', () => {
  const currentScrollPosition = window.scrollY;

  if (currentScrollPosition > lastScrollPosition) {
    header.style.top = '-60px'; // Hide the header when scrolling down
  } else {
    header.style.top = '0'; // Show the header when scrolling up
  }

  lastScrollPosition = currentScrollPosition;
});

const dropdown = document.querySelector('.dropdown');
const dropdownContent = document.querySelector('.dropdown-content');
let hoverTimer;

dropdown.addEventListener('mouseenter', () => {
  clearTimeout(hoverTimer);
  hoverTimer = setTimeout(() => {
    dropdownContent.classList.add('show');
  }, 300);
});

dropdown.addEventListener('mouseleave', () => {
  clearTimeout(hoverTimer);
  dropdownContent.classList.remove('show');
});

window.addEventListener('click', (event) => {
  if (!event.target.matches('.dropdown')) {
    if (dropdownContent.classList.contains('show')) {
      dropdownContent.classList.remove('show');
    }
  }
});

draggableContainer.addEventListener('mousedown', (e) => {
  e.preventDefault();
  isDragging = true;
  offsetX = e.clientX - draggableContainer.getBoundingClientRect().left;
  offsetY = e.clientY - draggableContainer.getBoundingClientRect().top;

  if (!isHeaderTransitioning) {
    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', handleMouseUp);
  }

  draggableContainer.style.cursor = 'grabbing';
  draggableContainer.style.userSelect = 'none';
});

function handleDrag(e) {
  if (isDragging) {
    const x = e.clientX - offsetX;
    const y = e.clientY - offsetY;

    draggableContainer.style.left = `${x}px`;
    draggableContainer.style.top = `${y}px`;
  }
}

function handleMouseUp() {
  if (isDragging) {
    document.removeEventListener('mousemove', handleDrag);
    document.removeEventListener('mouseup', handleMouseUp);
    snapToEdge();

    draggableContainer.style.cursor = 'grab';
    draggableContainer.style.userSelect = 'auto';
    isDragging = false;
  }
}

function snapToEdge() {
  const containerRect = draggableContainer.getBoundingClientRect();
  const windowWidth = window.innerWidth;
  const threshold = 20;

  if (containerRect.left < threshold) {
    draggableContainer.style.left = '0';
  }

  if (windowWidth - containerRect.right < threshold) {
    draggableContainer.style.left = `${windowWidth - containerRect.width}px`;
  }
}

const profileLink = document.getElementById('profile-link');
const familyLink = document.getElementById('family-link');
const friendLink = document.getElementById('friend-link');

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);

  if (section) {
    section.scrollIntoView({
      behavior: 'smooth',
    });

    // Add an event listener to detect when scrolling to the friend section is complete
    section.addEventListener('scrollend', () => {
      header.style.top = '0'; // Show the header after scrolling to the section
    }, { once: true }); // The { once: true } option ensures the event listener is executed only once
  }
}

function handleTransitionEnd() {
  header.style.top = '0';
  document.removeEventListener('transitionend', handleTransitionEnd);
  isHeaderTransitioning = false;

  document.addEventListener('mousemove', handleDrag);
  document.addEventListener('mouseup', handleMouseUp);
}

profileLink.addEventListener('click', (event) => {
  event.preventDefault();
  scrollToSection('prof');
});

familyLink.addEventListener('click', (event) => {
  event.preventDefault();
  scrollToSection('fam');
});

friendLink.addEventListener('click', (event) => {
  event.preventDefault();
  scrollToSection('friend'); // Corrected to match the ID of the section
});

const friendSection = document.getElementById('friend');

// Add an event listener for scrolling to check if the user is in the friend section
window.addEventListener('scroll', () => {
  const friendSectionTop = friendSection.offsetTop;
  const friendSectionBottom = friendSectionTop + friendSection.offsetHeight;

  // Check if the user has scrolled into the friend section
  if (window.scrollY >= friendSectionTop && window.scrollY < friendSectionBottom) {
    header.style.top = '0'; // Show the header
  } else {
    header.style.top = '-60px'; // Hide the header
  }
});

// Add an event listener for clicking on the friend link
friendLink.addEventListener('click', (event) => {
  event.preventDefault();
  scrollToSection('friend');
});


header.addEventListener('transitionend', handleTransitionEnd);

floatingButton.addEventListener('mouseenter', () => {
  console.log('mouseenter event on floatingButton');
});


const musicLink = document.getElementById('music-link');

musicLink.addEventListener('click', (event) => {
  event.preventDefault();
  scrollToSection('music-sec');
});

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);

  section.scrollIntoView({
    behavior: 'smooth',
  });
}



