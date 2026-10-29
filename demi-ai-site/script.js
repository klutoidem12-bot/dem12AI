const form = document.getElementById('chatForm');
const input = document.getElementById('userInput');
const messages = document.getElementById('messages');
const clearButton = document.getElementById('clearButton');
const themeButton = document.getElementById('themeButton');

function addMessage(text, who) {
  const row = document.createElement('div');
  row.className = `message ${who === 'user' ? 'user-message' : 'bot-message'}`;
  if (who === 'bot') {
    const avatar = document.createElement('span');
    avatar.className = 'message-avatar';
    avatar.textContent = 'D';
    row.appendChild(avatar);
  }
  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  const paragraph = document.createElement('p');
  paragraph.textContent = text;
  const meta = document.createElement('small');
  meta.textContent = who === 'user' ? 'YOU / MESSAGE' : 'DEMI / DEMO RESPONSE';
  bubble.append(paragraph, meta);
  row.appendChild(bubble);
  messages.appendChild(row);
  messages.scrollTop = messages.scrollHeight;
  return row;
}

function demoReply(text) {
  const value = text.toLowerCase();
  if (value.includes('привет') || value.includes('здравств')) {
    return 'Привет, бро! 👋 Я DEMI AI. Сейчас это демо-версия интерфейса, но мы можем постепенно превратить её в полноценного ИИ-помощника.';
  }
  if (value.includes('сайт') || value.includes('html')) {
    return 'Для сайта обычно нужны HTML (структура), CSS (дизайн) и JavaScript (действия). Напиши, какой сайт хочешь, и мы распишем его по шагам. Для генерации полноценного кода через ИИ нужно подключить API.';
  }
  if (value.includes('код') || value.includes('ошиб')) {
    return 'Пришли код и текст ошибки — разберём их. В настоящей версии DEMI AI ответы будет формировать подключённая языковая модель; сейчас ответ демонстрационный.';
  }
  if (value.includes('иде')) {
    return 'Идея для следующего обновления: история чатов, переключатель моделей, загрузка файлов и отдельная страница настроек. Начнём с одной функции и проверим, что она работает.';
  }
  return 'Я получил сообщение! 🟢 Это демонстрационный ответ, а не ответ настоящей ИИ-модели. Следующий шаг — подключить API через сервер, чтобы DEMI AI мог отвечать на любые вопросы.';
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  addMessage(text, 'user');
  input.value = '';
  input.style.height = 'auto';
  const typing = document.createElement('div');
  typing.className = 'message bot-message';
  typing.innerHTML = '<span class="message-avatar">D</span><div class="bubble typing">•••</div>';
  messages.appendChild(typing);
  messages.scrollTop = messages.scrollHeight;
  window.setTimeout(() => {
    typing.remove();
    addMessage(demoReply(text), 'bot');
  }, 450);
});

input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    form.requestSubmit();
  }
});
input.addEventListener('input', () => {
  input.style.height = 'auto';
  input.style.height = `${Math.min(input.scrollHeight, 120)}px`;
});

document.querySelectorAll('.suggestion').forEach((button) => {
  button.addEventListener('click', () => {
    input.value = button.textContent.replace(/^[^\s]+\s*/, '');
    input.focus();
    form.requestSubmit();
  });
});

clearButton.addEventListener('click', () => {
  messages.replaceChildren();
  addMessage('Чат очищен. Чем займёмся теперь?', 'bot');
});

themeButton.addEventListener('click', () => {
  document.body.classList.toggle('bright-mode');
});
