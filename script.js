// Modern Calculator Script with Keyboard Support and Button Animation

document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');

    // Animate button on click
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.add('active');
            setTimeout(() => btn.classList.remove('active'), 120);
        });
    });

    // Keyboard support
    document.addEventListener('keydown', (e) => {
        if (e.key >= '0' && e.key <= '9') {
            appendValue(e.key);
        } else if (["+", "-", "*", "/", "."].includes(e.key)) {
            appendValue(e.key);
        } else if (e.key === 'Enter' || e.key === '=') {
            calculate();
            e.preventDefault();
        } else if (e.key === 'Backspace') {
            backspace();
        } else if (e.key.toLowerCase() === 'c') {
            clearDisplay();
        }
    });
});

function appendValue(value) {
    const display = document.getElementById('display');
    if (display.value.length >= 20) return; // Limit input length
    display.value += value;
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function backspace() {
    const display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}

function calculate() {
    const display = document.getElementById('display');
    try {
        // Evaluate the expression safely
        let result = Function('"use strict";return (' + display.value + ')')();
        if (result === undefined || isNaN(result)) throw new Error('Invalid');
        display.value = result;
    } catch {
        display.value = 'Error';
        setTimeout(() => display.value = '', 1200);
    }
} 