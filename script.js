import createUserId from './utils/utils.js';

function openModal(type) { // data-type
  console.warn('OpenModal called for type:', type);
  document.getElementById(type + 'Modal').style.display = 'flex';
}

function closeModal(type) { // data-type
  document.getElementById(type + 'Modal').style.display = 'none';
}

window.onclick = function(event) {
  // debugger
  ['loginModal', 'registerModal'].forEach(id => {
    const modal = document.getElementById(id);
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
}

function toggleHamburgerMenu() {
  const menu = document.getElementById('menu');
  const hamburger = document.getElementById('hamburger-btn');
  const drawer = document.getElementById('drawer');

  // Перевірка, чи ми на мобільному вигляді
  if (window.innerWidth <= 768) {
    // При натисканні на кнопку гамбургера
    menu.style.display = 'none'; // Приховуємо основне меню
    drawer.removeAttribute('style'); // Приховуємо drawer для десктопу 
    drawer.classList.toggle('open');

  } else {
    // Якщо не мобільний вигляд, показуємо/ховаємо основне меню
    menu.style.display = menu.style.display === 'none' ? 'flex' : 'none';
  }
}

function addOpenModalEventListeners(type) {
   const buttons = document.querySelectorAll(`button[data-type="${type}OpenModal"]`);
   console.warn('OpenModal buttons found = ', buttons);
   buttons.forEach(button => {
        button.addEventListener('click', () => openModal(type));
    });
} 

function addCloseModalEventListeners(type) {
   const spans = document.querySelectorAll(`span[data-type="${type}CloseModal"]`);
    console.warn('CloseModal spans found = ', spans);
    spans.forEach(span => {
        span.addEventListener('click', () => closeModal(type));
    });
}

window.onload = async function() {
  showMenu();
  ['login', 'register'].forEach(type => {
      addOpenModalEventListeners(type);
      addCloseModalEventListeners(type);
  });
  
   
  const userId = localStorage.getItem("userId");
  if (!userId) {
      // Якщо userId не існує, створюємо новий
      localStorage.setItem("userId", JSON.stringify(createUserId()));
      const randomUsernames = [
        "user123", "coolguy", "happyuser", "testaccount", "exampleuser", "randomname", "user456", "sampleuser", "demoaccount", "username789"
      ];
      const randomIndex = Math.floor(Math.random() * randomUsernames.length);
      const randomUsername = randomUsernames[randomIndex];
      localStorage.setItem("username", randomUsername);
      const data = { 
        userId: localStorage.getItem("userId"),
        name:randomUsername
      }

      const stringifiedData = JSON.stringify(data);

      try {
          const response = await fetch('https://applinkup.pythonanywhere.com/add-users', {
              method: 'POST',
              headers: {
              'Content-Type': 'application/json'
              },
              body: stringifiedData
          })

          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }

      } catch (error) {
          console.error('Network error. Помилка при перетворенні даних:', error);          
      }
  }
}

window.onresize = function() {
  showMenu();
}

function showMenu() {
  // Перевірка ширини вікна при завантаженні сторінки
  if (window.innerWidth <= 768) { // на мобільних пристроях
    document.getElementById('menu').style.display = 'none'; // Приховуємо основне меню 
    document.getElementById('hamburger-btn').style.display = 'block'; // Показуємо кнопку гамбургера
  } else { // на десктопі
    document.getElementById('menu').style.display = 'block'; // Показуємо основне меню на десктопі
    document.getElementById('hamburger-btn').style.display = 'none'; // Приховуємо кнопку гамбургера
    document.getElementById('drawer').style.display = 'none';    
  }
}
