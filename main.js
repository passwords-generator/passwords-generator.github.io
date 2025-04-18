const chars = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-='
};
const similarChars = 'il1Lo0O';
const hardToReadChars = 'Il1|0Oo{}();:\'"`~,.-_';
const passwordOutput = document.getElementById('passwordOutput');
const copyButton = document.getElementById('copyButton');
const refreshButton = document.getElementById('refreshButton');
const lengthSlider = document.getElementById('lengthSlider');
const lengthValue = document.getElementById('lengthValue');
const generateButton = document.getElementById('generateButton');
const generatePronounceableButton = document.getElementById('generatePronounceableButton');
const uppercaseCheck = document.getElementById('uppercaseCheck');
const lowercaseCheck = document.getElementById('lowercaseCheck');
const numbersCheck = document.getElementById('numbersCheck');
const symbolsCheck = document.getElementById('symbolsCheck');
const excludeSimilarCheck = document.getElementById('excludeSimilarCheck');
const easyToReadCheck = document.getElementById('easyToReadCheck');
const strengthMeter = document.getElementById('strengthMeter');
const strengthText = document.getElementById('strengthText');
const themeToggle = document.getElementById('themeToggle');
const mobileMenuButton = document.getElementById('mobileMenuButton');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu = document.getElementById('closeMenu');
const passwordHistory = document.getElementById('passwordHistory');
const clearHistoryButton = document.getElementById('clearHistoryButton');
const historyPanel = document.getElementById('historyPanel');
let passwordHistoryArray = JSON.parse(localStorage.getItem('passwordHistory')) || [];
let darkMode = localStorage.getItem('darkMode') === 'true';
const translations = {
    en: {
        strength: "Strength:",
        weak: "Weak",
        medium: "Medium",
        strong: "Strong",
        veryStrong: "Very Strong",
        passwordLength: "Password length",
        uppercase: "Uppercase letters",
        lowercase: "Lowercase letters",
        numbers: "Numbers",
        symbols: "Symbols",
        excludeSimilar: "Exclude similar",
        easyToRead: "Easy to read",
        generatePassword: "Generate Password",
        memorable: "Memorable",
        passwordHistory: "Password History",
        clearHistory: "Clear history",
        copied: "Copied!",
        noHistory: "No password history yet",
        clickGenerate: "Click Generate →"
    },
    de: {
        strength: "Stärke:",
        weak: "Schwach",
        medium: "Mittel",
        strong: "Stark",
        veryStrong: "Sehr stark",
        passwordLength: "Passwortlänge",
        uppercase: "Großbuchstaben",
        lowercase: "Kleinbuchstaben",
        numbers: "Zahlen",
        symbols: "Symbole",
        excludeSimilar: "Ähnliche ausschließen",
        easyToRead: "Leicht zu lesen",
        generatePassword: "Passwort generieren",
        memorable: "Einprägsam",
        passwordHistory: "Passwort-Historie",
        clearHistory: "Historie löschen",
        copied: "Kopiert!",
        noHistory: "Noch keine Passworthistorie",
        clickGenerate: "Klicken Sie auf Generieren →"
    },
    fr: {
        strength: "Force:",
        weak: "Faible",
        medium: "Moyenne",
        strong: "Forte",
        veryStrong: "Très forte",
        passwordLength: "Longueur du mot de passe",
        uppercase: "Lettres majuscules",
        lowercase: "Lettres minuscules",
        numbers: "Chiffres",
        symbols: "Symboles",
        excludeSimilar: "Exclure similaires",
        easyToRead: "Facile à lire",
        generatePassword: "Générer un mot de passe",
        memorable: "Mémorable",
        passwordHistory: "Historique des mots de passe",
        clearHistory: "Effacer l'historique",
        copied: "Copié!",
        noHistory: "Pas encore d'historique de mot de passe",
        clickGenerate: "Cliquez sur Générer →"
    },
    es: {
        strength: "Fuerza:",
        weak: "Débil",
        medium: "Media",
        strong: "Fuerte",
        veryStrong: "Muy fuerte",
        passwordLength: "Longitud de contraseña",
        uppercase: "Letras mayúsculas",
        lowercase: "Letras minúsculas",
        numbers: "Números",
        symbols: "Símbolos",
        excludeSimilar: "Excluir similares",
        easyToRead: "Fácil de leer",
        generatePassword: "Generar contraseña",
        memorable: "Memorable",
        passwordHistory: "Historial de contraseñas",
        clearHistory: "Borrar historial",
        copied: "¡Copiado!",
        noHistory: "Aún no hay historial de contraseñas",
        clickGenerate: "Haga clic en generar →"
    },
    ko: {
        strength: "강도:",
        weak: "약함",
        medium: "중간",
        strong: "강함",
        veryStrong: "매우 강함",
        passwordLength: "비밀번호 길이",
        uppercase: "대문자",
        lowercase: "소문자",
        numbers: "숫자",
        symbols: "기호",
        excludeSimilar: "유사한 문자 제외",
        easyToRead: "읽기 쉬움",
        generatePassword: "비밀번호 생성",
        memorable: "기억하기 쉬운",
        passwordHistory: "비밀번호 기록",
        clearHistory: "기록 지우기",
        copied: "복사됨!",
        noHistory: "비밀번호 기록이 아직 없습니다",
        clickGenerate: "생성 클릭 →"
    },
    ru: {
        strength: "Надежность:",
        weak: "Слабый",
        medium: "Средний",
        strong: "Сильный",
        veryStrong: "Очень сильный",
        passwordLength: "Длина пароля",
        uppercase: "Заглавные буквы",
        lowercase: "Строчные буквы",
        numbers: "Цифры",
        symbols: "Символы",
        excludeSimilar: "Исключить похожие",
        easyToRead: "Легко читаемый",
        generatePassword: "Создать пароль",
        memorable: "Запоминающийся",
        passwordHistory: "История паролей",
        clearHistory: "Очистить историю",
        copied: "Скопировано!",
        noHistory: "История паролей пуста",
        clickGenerate: "Нажмите «Создать» →"
    },
    pt: {
        strength: "Força:",
        weak: "Fraco",
        medium: "Médio",
        strong: "Forte",
        veryStrong: "Muito forte",
        passwordLength: "Comprimento da senha",
        uppercase: "Letras maiúsculas",
        lowercase: "Letras minúsculas",
        numbers: "Números",
        symbols: "Símbolos",
        excludeSimilar: "Excluir semelhantes",
        easyToRead: "Fácil de ler",
        generatePassword: "Gerar senha",
        memorable: "Memorável",
        passwordHistory: "Histórico de senhas",
        clearHistory: "Limpar histórico",
        copied: "Copiado!",
        noHistory: "Ainda não há histórico de senhas",
        clickGenerate: "Clique em Gerar →"
    }
};
let currentLanguage = detectLanguageFromURL() || localStorage.getItem('language') || 'en';

function detectLanguageFromURL() {
    const path = window.location.pathname;
    const langMatch = path.match(/\/([a-z]{2})\//);
    if (langMatch && translations[langMatch[1]]) {
        return langMatch[1];
    }
    return 'en';
}
function applyTranslations() {
    const lang = translations[currentLang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (lang[key]) el.textContent = lang[key];
    });

    document.querySelectorAll('[data-i18n-value]').forEach(el => {
        const key = el.getAttribute('data-i18n-value');
        if (lang[key]) el.value = lang[key];
    });
}
if (darkMode) {
    document.body.classList.add('dark');
    if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun text-yellow-400"></i>';
    if (historyPanel) historyPanel.classList.add('dark:bg-gray-700');
}
if (lengthSlider) {
    lengthSlider.addEventListener('input', () => {
        if (lengthValue) lengthValue.textContent = lengthSlider.value;
    });
}
if (generateButton) generateButton.addEventListener('click', generatePassword);
if (refreshButton) refreshButton.addEventListener('click', generatePassword);
if (generatePronounceableButton) generatePronounceableButton.addEventListener('click', generatePronounceablePassword);
if (copyButton) {
    copyButton.addEventListener('click', () => {
        if (!passwordOutput || passwordOutput.value === getTranslation('clickGenerate')) return;    
        navigator.clipboard.writeText(passwordOutput.value)
            .then(() => {
                copyButton.classList.add('copy-animation');
                setTimeout(() => copyButton.classList.remove('copy-animation'), 1500);
                const originalText = copyButton.innerHTML;
                copyButton.innerHTML = `<i class="fas fa-check mr-1"></i> ${getTranslation('copied')}`;
                setTimeout(() => {
                    copyButton.innerHTML = originalText;
                }, 1500);
            })
            .catch(err => {
                console.error('Could not copy text: ', err);
            });
    });
}
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        darkMode = !darkMode;
        document.body.classList.toggle('dark');
        if (darkMode) {
            themeToggle.innerHTML = '<i class="fas fa-sun text-yellow-400"></i>';
            if (historyPanel) historyPanel.classList.add('bg-gray-100');
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon text-gray-600"></i>';
            if (historyPanel) historyPanel.classList.remove('bg-gray-100');
        }
        localStorage.setItem('darkMode', darkMode);
    });
}
if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.add('open');
    });
}
if (closeMenu && mobileMenu) {
    closeMenu.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
    });
}
const accordionHeaders = document.querySelectorAll('.accordion-header');
accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        const icon = header.querySelector('i');
        if (content) content.classList.toggle('active');
        if (content && icon) {
            if (content.classList.contains('active')) {
                icon.style.transform = 'rotate(180deg)';
            } else {
                icon.style.transform = 'rotate(0)';
            }
        }
    });
});
if (clearHistoryButton) {
    clearHistoryButton.addEventListener('click', () => {
        passwordHistoryArray = [];
        localStorage.removeItem('passwordHistory');
        renderPasswordHistory();
    });
}
function getTranslation(key) {
    return translations[currentLanguage]?.[key] || translations.en[key];
}
function updateTranslations() {
    const lengthLabel = document.querySelector('label[for="lengthSlider"]');
    if (lengthLabel) {
        const textNode = lengthLabel.childNodes[0];
        if (textNode) textNode.textContent = getTranslation('passwordLength');
    }
    const checkboxLabels = {
        'uppercaseCheck': 'uppercase',
        'lowercaseCheck': 'lowercase',
        'numbersCheck': 'numbers',
        'symbolsCheck': 'symbols',
        'excludeSimilarCheck': 'excludeSimilar',
        'easyToReadCheck': 'easyToRead'
    };
    
    Object.entries(checkboxLabels).forEach(([id, translationKey]) => {
        const label = document.querySelector(`label[for="${id}"] span`);
        if (label) {
            label.textContent = getTranslation(translationKey);
        }
    });
    
    if (generateButton) generateButton.innerHTML = `<i class="fas fa-key mr-2"></i> ${getTranslation('generatePassword')}`;
    if (generatePronounceableButton) generatePronounceableButton.innerHTML = `<i class="fas fa-comment mr-2"></i> ${getTranslation('memorable')}`;
    const historyHeader = document.querySelector('.flex.justify-between.items-center.mb-4 h3');
    if (historyHeader) historyHeader.textContent = getTranslation('passwordHistory');
    if (clearHistoryButton) clearHistoryButton.textContent = getTranslation('clearHistory');
    const strengthLabel = document.querySelector('.flex.justify-between.text-sm.text-gray-600 span:first-child');
    if (strengthLabel) strengthLabel.textContent = getTranslation('strength');
    if (passwordOutput && (
        passwordOutput.value === 'Click Generate →' || 
        passwordOutput.value === translations.de.clickGenerate || 
        passwordOutput.value === translations.fr.clickGenerate || 
        passwordOutput.value === translations.es.clickGenerate ||
        passwordOutput.value === translations.ko.clickGenerate || 
        passwordOutput.value === translations.ru.clickGenerate ||
        passwordOutput.value === translations.pt.clickGenerate
    )) {
        passwordOutput.value = getTranslation('clickGenerate');
    }
    updateStrengthText();
    renderPasswordHistory();
}
function ensureOneChecked() {
    if (!uppercaseCheck || !lowercaseCheck || !numbersCheck || !symbolsCheck) return;
    if (!uppercaseCheck.checked && !lowercaseCheck.checked && !numbersCheck.checked && !symbolsCheck.checked) {
        lowercaseCheck.checked = true;
    }
}
function calculateStrength(password) {
    let strength = 0;
    const length = password.length;
    strength += Math.min(length * 2.5, 40);
    let hasUpper = /[A-Z]/.test(password);
    let hasLower = /[a-z]/.test(password);
    let hasNumber = /[0-9]/.test(password);
    let hasSymbol = /[^A-Za-z0-9]/.test(password);
    const variety = (hasUpper ? 10 : 0) + (hasLower ? 10 : 0) + (hasNumber ? 10 : 0) + (hasSymbol ? 10 : 0);
    strength += variety;
    let repeats = password.match(/(.)\1{2,}/g);
    if (repeats) {
        strength -= repeats.length * 5;
    }
    let sequences = 0;
    for (let i = 0; i < password.length - 2; i++) {
        if ((password.charCodeAt(i) + 1 === password.charCodeAt(i + 1) && password.charCodeAt(i + 1) + 1 === password.charCodeAt(i + 2)) ||
            (password.charCodeAt(i) - 1 === password.charCodeAt(i + 1) && password.charCodeAt(i + 1) - 1 === password.charCodeAt(i + 2))) {
            sequences++;
        }
    }
    if (sequences) {
        strength -= sequences * 3;
    }
    const commonPatterns = ['password', '123456', 'qwerty', 'admin'];
    for (const pattern of commonPatterns) {
        if (password.toLowerCase().includes(pattern)) {
            strength -= 10;
            break;
        }
    }
    strength = Math.max(0, Math.min(100, strength));
    return strength;
}
function updateStrengthMeter(password) {
    if (!strengthMeter) return;
    const strength = calculateStrength(password);
    strengthMeter.style.width = `${strength}%`;
    updateStrengthText(strength);
}
function updateStrengthText(strength) {
    if (!strengthMeter || !strengthText) return;
    if (strength === undefined) {
        const currentStrength = parseFloat(strengthMeter.style.width);
        strength = currentStrength || 50;
    }
    if (strength < 30) {
        strengthMeter.className = 'password-strength-meter bg-red-500';
        strengthText.textContent = getTranslation('weak');
        strengthText.className = 'font-medium text-red-500';
    } else if (strength < 60) {
        strengthMeter.className = 'password-strength-meter bg-yellow-500';
        strengthText.textContent = getTranslation('medium');
        strengthText.className = 'font-medium text-yellow-500';
    } else if (strength < 80) {
        strengthMeter.className = 'password-strength-meter bg-green-500';
        strengthText.textContent = getTranslation('strong');
        strengthText.className = 'font-medium text-green-500';
    } else {
        strengthMeter.className = 'password-strength-meter bg-blue-600';
        strengthText.textContent = getTranslation('veryStrong');
        strengthText.className = 'font-medium text-blue-600';
    }
}
function addToHistory(password) {
    if (!passwordOutput) return;
    passwordHistoryArray.unshift(password);
    if (passwordHistoryArray.length > 5) {
        passwordHistoryArray = passwordHistoryArray.slice(0, 5);
    }
    localStorage.setItem('passwordHistory', JSON.stringify(passwordHistoryArray));
    renderPasswordHistory();
}
function renderPasswordHistory() {
    if (!passwordHistory) return;
    passwordHistory.innerHTML = '';
    if (passwordHistoryArray.length === 0) {
        const emptyItem = document.createElement('div');
        emptyItem.className = 'text-gray-500 text-sm italic dark:text-gray-300';
        emptyItem.textContent = getTranslation('noHistory');
        passwordHistory.appendChild(emptyItem);
        return;
    }
    passwordHistoryArray.forEach((password) => {
        const item = document.createElement('div');
        item.className = 'password-history-item flex justify-between items-center p-2 rounded hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors';
        const passwordText = document.createElement('div');
        passwordText.className = 'font-mono text-gray-700 truncate flex-grow dark:text-gray-300';
        let displayPassword = '';
        if (password.length > 4) {
            displayPassword = password.substring(0, 2) + '••••••' + password.substring(password.length - 2);
        } else {
            displayPassword = password;
        }
        passwordText.textContent = displayPassword;
        const copyBtn = document.createElement('button');
        copyBtn.className = 'text-xs text-blue-500 hover:text-blue-700 px-2 py-1 ml-2';
        copyBtn.innerHTML = '<i class="far fa-copy"></i>';
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(password)
                .then(() => {
                    copyBtn.innerHTML = '<i class="fas fa-check text-green-500"></i>';
                    setTimeout(() => {
                        copyBtn.innerHTML = '<i class="far fa-copy"></i>';
                    }, 1500);
                });
        });
        item.appendChild(passwordText);
        item.appendChild(copyBtn);
        passwordHistory.appendChild(item);
    });
}
function generatePassword() {
    if (!passwordOutput) return;
    ensureOneChecked();
    const passwordLength = parseInt(lengthSlider.value);
    let charset = '';
    if (uppercaseCheck && uppercaseCheck.checked) charset += chars.uppercase;
    if (lowercaseCheck && lowercaseCheck.checked) charset += chars.lowercase;
    if (numbersCheck && numbersCheck.checked) charset += chars.numbers;
    if (symbolsCheck && symbolsCheck.checked) charset += chars.symbols;
    if (excludeSimilarCheck && excludeSimilarCheck.checked) {
        for (let char of similarChars) {
            charset = charset.replace(char, '');
        }
    }
    if (easyToReadCheck && easyToReadCheck.checked) {
        for (let char of hardToReadChars) {
            charset = charset.replace(char, '');
        }
    }
    if (charset.length === 0) {
        charset = chars.lowercase;
        if (lowercaseCheck) lowercaseCheck.checked = true;
    }
    let password = '';
    const charsetLength = charset.length;
    for (let i = 0; i < passwordLength; i++) {
        const randomIndex = Math.floor(crypto.getRandomValues(new Uint32Array(1))[0] / (0xFFFFFFFF + 1) * charsetLength);
        password += charset.charAt(randomIndex);
    }
    passwordOutput.value = password;
    updateStrengthMeter(password);
    addToHistory(password);
}
function generatePronounceablePassword() {
    if (!passwordOutput || !lengthSlider) return;
    const vowels = 'aeiouy';
    const consonants = 'bcdfghjklmnpqrstvwxz';
    const digits = '0123456789';
    const specials = '!@#$%^&*-_+=?';
    const length = parseInt(lengthSlider.value);
    let password = '';
    let pattern = '';
    for (let i = 0; i < Math.floor(length / 2); i++) {
        pattern += 'cv';
    }
    if (length % 2 !== 0) {
        pattern += 'c';
    }
    if (numbersCheck && numbersCheck.checked) {
        const numDigits = Math.min(2, Math.floor(length / 4));
        for (let i = 0; i < numDigits; i++) {
            const pos = Math.floor(Math.random() * pattern.length);
            pattern = pattern.substring(0, pos) + 'd' + pattern.substring(pos + 1);
        }
    }
    if (symbolsCheck && symbolsCheck.checked) {
        const numSpecials = Math.min(1, Math.floor(length / 6));
        for (let i = 0; i < numSpecials; i++) {
            const pos = Math.floor(Math.random() * pattern.length);
            pattern = pattern.substring(0, pos) + 's' + pattern.substring(pos + 1);
        }
    }
    for (let i = 0; i < pattern.length; i++) {
        let charset = '';
        switch (pattern[i]) {
            case 'c':
                charset = consonants;
                break;
            case 'v':
                charset = vowels;
                break;
            case 'd':
                charset = digits;
                break;
            case 's':
                charset = specials;
                break;
        }
        if (excludeSimilarCheck && excludeSimilarCheck.checked && pattern[i] !== 's') {
            for (let char of similarChars) {
                charset = charset.replace(char, '');
            }
        }
        if (easyToReadCheck && easyToReadCheck.checked && pattern[i] !== 's') {
            for (let char of hardToReadChars) {
                charset = charset.replace(char, '');
            }
        }
        const randomIndex = Math.floor(Math.random() * charset.length);
        let char = charset.charAt(randomIndex);
        if (uppercaseCheck && uppercaseCheck.checked && (i === 0 || (pattern[i] === 'c' && Math.random() < 0.3))) {
            char = char.toUpperCase();
        }
        password += char;
        if (password.length >= length) break;
    }
    passwordOutput.value = password;
    updateStrengthMeter(password);
    addToHistory(password);
}
document.addEventListener('DOMContentLoaded', () => {
    currentLanguage = detectLanguageFromURL();
    localStorage.setItem('language', currentLanguage);
    if (lengthValue && lengthSlider) lengthValue.textContent = lengthSlider.value;
    updateTranslations();
    if (passwordHistoryArray.length > 0 && passwordOutput) {
        passwordOutput.value = passwordHistoryArray[0];
        updateStrengthMeter(passwordHistoryArray[0]);
    }
});