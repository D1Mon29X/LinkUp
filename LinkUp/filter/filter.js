    function showInterests() {
  const checkboxes = document.querySelectorAll('input[name="interest"]:checked');
  const selected = Array.from(checkboxes).map(cb => cb.value);

  const outputDiv = document.getElementById('output');
  outputDiv.innerHTML = ''; // очищуємо перед виводом

  if (selected.length === 0) {
    outputDiv.innerHTML = '<p>Ви нічого не вибрали.</p>';
    return;
  }

  const list = document.createElement('ul');
  selected.forEach(interest => {
    const li = document.createElement('li');
    li.textContent = interest;
    list.appendChild(li);
  });

  outputDiv.innerHTML = '<h3>Ваші інтереси:</h3>';
  outputDiv.appendChild(list);
}
