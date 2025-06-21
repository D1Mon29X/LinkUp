export default function createUserId() {
  const result = Array.from({ length: 3 }, () => crypto.randomUUID()).join('');
  return result;
}

function generateUserId() {
  const components = [
    navigator.userAgent,
    navigator.language,
    screen.width,
    screen.height,
    screen.colorDepth,
    Intl.DateTimeFormat().resolvedOptions().timeZone,
    navigator.platform
  ];
  console.time('User ID Generation');
  const dataString = components.join(' | ');
  console.log('Data for user ID:', dataString);
  // Генеруємо хеш (SHA-256) для унікальності
  return crypto.subtle.digest("SHA-256", new TextEncoder().encode(dataString))
    .then(buffer => {
      // console.log('Buffer:', buffer);
      // Перетворюємо буфер в шістнадцятковий рядок
      return Array.from(new Uint8Array(buffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
    });
}