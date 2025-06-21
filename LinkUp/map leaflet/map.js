// // Отримуємо елементи орбіт та планет
// const orbits = document.querySelectorAll('.orbit');
// const planets = document.querySelectorAll('.planet');

// // Параметри для обертання
// let angle = 0; // Початковий кут
// let rotationSpeed = 0.02; // Швидкість обертання (величина кута на один кадр)

// // Функція для обчислення позиції планети на орбіті
// function setPlanetPosition(orbit, planet, radius, index) {
//   // Обчислюємо нову позицію планети на орбіті
//   const x = radius * Math.cos(angle + (index * Math.PI / 2)); // x = cos(θ) * r
//   const y = radius * Math.sin(angle + (index * Math.PI / 2)); // y = sin(θ) * r

//   // Встановлюємо позицію планети
//   planet.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
// }

// // Функція для анімації обертання планет
// function animatePlanets() {
//   // Оновлюємо кут
//   angle += rotationSpeed;
  
//   // Обчислюємо і встановлюємо нову позицію кожної планети
//   planets.forEach((planet, index) => {
//     const orbit = orbits[index]; // Отримуємо відповідну орбіту для планети
//     const radius = parseInt(orbit.offsetWidth) / 2; // Радіус орбіти
//     setPlanetPosition(orbit, planet, radius, index); // Встановлюємо позицію планети
//   });

//   // Запускаємо анімацію на наступному кадрі
//   requestAnimationFrame(animatePlanets);
// }

// // Функція для запуску обертання
// function startRotation() {
//   requestAnimationFrame(animatePlanets); // Запускаємо анімацію
// }

// // Функція для зупинки обертання
// function stopRotation() {
//   // Зупиняємо обертання
//   cancelAnimationFrame(startRotation);
// }

// // Функція для зміни швидкості
// function changeSpeed() {
//   rotationSpeed += 0.01; // Збільшуємо швидкість обертання
// }

// // Додаємо обробники подій для кнопок
// document.getElementById('start-btn').addEventListener('click', startRotation);
// document.getElementById('stop-btn').addEventListener('click', stopRotation);
// document.getElementById('speed-btn').addEventListener('click', changeSpeed);


const planet1 = document.getElementById("planet1");
const planet2 = document.getElementById("planet2");

// Центр (сонце) — координати по центру екрану
const centerX = window.innerWidth / 2;
const centerY = window.innerHeight / 2;

// Налаштування орбіт
let radius1 = 120; // радіус першої орбіти
let radius2 = 170; // радіус другої орбіти
let angle1 = 0;
let angle2 = 0;
const speed1 = 0.02; // швидкість обертання
const speed2 = 0.01;

function update() {
  angle1 += speed1;
  angle2 += speed2;

  // Позиції планет
  const x1 = centerX + radius1 * Math.cos(angle1) - 20; // -20 щоб врахувати половину ширини планети (40px)
  const y1 = centerY + radius1 * Math.sin(angle1) - 20;

  const x2 = centerX + radius2 * Math.cos(angle2) - 20;
  const y2 = centerY + radius2 * Math.sin(angle2) - 20;

  planet1.style.left = `${x1}px`;
  planet1.style.top = `${y1}px`;

  planet2.style.left = `${x2}px`;
  planet2.style.top = `${y2}px`;

  requestAnimationFrame(update); // безперервне оновлення кадрів
}

update(); // запуск анімації
