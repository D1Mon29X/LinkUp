    import createUserId from '../utils/utils.js';

        const selectedInterests = [];

        const buttonsElements = document.querySelectorAll('.interest-button'); // Get all button elements

        const saveAllInterests = async (selectedInterests) => {
            const data = { interests: selectedInterests };
            const stringifiedData = JSON.stringify(data);

            try {
                const response = await fetch('https://example.com/api/interests', {
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
                const userId = localStorage.getItem("userId");
                if (!userId) {
                    // Якщо userId не існує, створюємо новий
                    localStorage.setItem("userId", JSON.stringify(createUserId()));
                }   
                localStorage.setItem("userInterests", JSON.stringify({
                        saveDate: new Date().toISOString(),
                        interests: selectedInterests,
                        userId: localStorage.getItem("userId") 
                    })
                );
            }
        };

        buttonsElements.forEach(button => {

            button.addEventListener('click', async (event) => {

                const interest = button.getAttribute('data-interest');
                const index = selectedInterests.indexOf(interest);

                if (index === -1) {
                    selectedInterests.push(interest);
                    button.classList.add('selected');
                } else {
                    selectedInterests.splice(index, 1);
                    button.classList.remove('selected');
                }

                console.log('Обрані інтереси:', selectedInterests);
                // Here you can send the selected interests to the server or handle them as needed
                saveAllInterests(selectedInterests);
            });
      });

      // 🟢 Відновлення з localStorage при завантаженні сторінки
      window.addEventListener("load", () => {
       
        // Перевіряємо, чи є збережені інтереси в localStorage
        const savedInterests = localStorage.getItem("userInterests");
        if (savedInterests) {
            const parsedInterests = JSON.parse(savedInterests);
            const interestsArray = parsedInterests.interests || [];
            interestsArray.forEach((interest) => {
                const button = document.querySelector(`.interest-button[data-interest="${interest}"]`);
                if (button) {
                    button.classList.add("selected");
                    selectedInterests.push(interest);
                }
            });

            console.log("Відновлені інтереси:", selectedInterests);
        }
      });

      // 🔴 Попередження перед виходом
      window.addEventListener("beforeunload", (event) => {
        // Here you can send the selected interests to the server or handle them as needed
        saveAllInterests(selectedInterests);

        // Виводимо системне підтвердження (працює тільки при взаємодії з користувачем)
        event.preventDefault();
        event.returnValue = ""; // необхідно для деяких браузерів (Chrome, Firefox)
      });