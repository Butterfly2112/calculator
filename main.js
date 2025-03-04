document.addEventListener('DOMContentLoaded', () => {
    let expression = ''; // Зберігаємо весь введений вираз
    const out = document.querySelector('.result p');

    const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
    const action = ['-', '+', '×', '÷', 'x!', 'xy', '√x', 'π', '%', '(', ')'];

    function clear() {
        expression = '';
        out.textContent = '0';
    }

    function factorial(n) {
        if (n < 0 || !Number.isInteger(n)) return "Error";
        return n < 2 ? 1 : n * factorial(n - 1);
    }

    document.querySelector('.btn.C').onclick = clear;

    document.querySelector('.btn.⌫').onclick = () => {
        expression = expression.slice(0, -1);
        out.textContent = expression || '0';
    };

    document.querySelector('.buttons').onclick = (event) => {
        if (!event.target.classList.contains('btn')) return;
        if (event.target.classList.contains('C')) return;

        let key = event.target.textContent;

        // Додаємо число або операцію до виразу
        if (digit.includes(key) || action.includes(key)) {
            if (key === 'π') key = 'Math.PI';
            if (key === '×') key = '*';
            if (key === '÷') key = '/';
            if (key === '%') key = '/100';
            if (key === 'xy') key = '**';
            if (key === '√x') key = 'Math.sqrt';

            // Факторіал (перевіряємо останнє число перед "!")
            if (key === 'x!') {
                let match = expression.match(/(\d+(\.\d+)?)$/);
                if (match) {
                    let num = parseFloat(match[1]);
                    expression = expression.replace(/\d+(\.\d+)?$/, factorial(num));
                    out.textContent = expression;
                    return;
                }
            }

            expression += key;
            out.textContent = expression;
            return;
        }

        // Виконуємо обчислення
        if (key === '=') {
            try {
                let result = new Function(`return ${expression}`)();
                out.textContent = result;
                expression = String(result);
            } catch {
                out.textContent = 'Error';
                expression = '';
            }
        }
    };
});
