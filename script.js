// Инициализация Telegram WebApp API
const tg = window.Telegram?.WebApp;

if (tg) {
    tg.ready();
    tg.expand(); // Разворачиваем приложение на весь экран
}

// Состояние игры
let state = {
    balance: 0,
    clickPower: 1,
    cps: 0
};

// DOM элементы
const balanceEl = document.getElementById('balance');
const userNameEl = document.getElementById('user-name');
const tapBtn = document.getElementById('tap-btn');
const floatContainer = document.getElementById('float-container');

// Устанавливаем имя пользователя из Telegram
if (tg && tg.initDataUnsafe?.user) {
    userNameEl.innerText = tg.initDataUnsafe.user.first_name || "ИГРОК";
} else {
    userNameEl.innerText = "DEV_MODE";
}

// Обработчик тапа
tapBtn.addEventListener('pointerdown', (e) => {
    state.balance += state.clickPower;
    updateUI();

    // Вибрация смартфона через Telegram API
    if (tg && tg.HapticFeedback) {
        tg.HapticFeedback.impactOccurred('light');
    }

    // Всплывающие цифры
    spawnFloatingNumber(e.clientX, e.clientY, `+${state.clickPower}`);
});

function updateUI() {
    balanceEl.innerText = `${Math.floor(state.balance).toLocaleString('ru-RU')} ₽`;
}

function spawnFloatingNumber(x, y, text) {
    const el = document.createElement('div');
    el.className = 'floating-number';
    el.innerText = text;
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;

    floatContainer.appendChild(el);

    setTimeout(() => {
        el.remove();
    }, 800);
}
