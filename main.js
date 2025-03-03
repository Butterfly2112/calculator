document.addEventListener('DOMContentLoaded', () => {
    let x = '';
    let y = '';
    let operation = '';
    let finish = false;

    const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
    const action = ['-', '+', '×', '÷', 'x!', 'xy', '√x', 'π', '%', '(', ')'];
    const out = document.querySelector('.result p');

    function clear() {
        x = '';
        y = '';
        operation = '';
        finish = false;
        out.textContent = 0;
    }

    function factorial(n) {
        return n < 2 ? 1 : n * factorial(n - 1);
    }

    document.querySelector('.btn.C').onclick = clear;

    document.querySelector('.btn.⌫').onclick = () => {
        if (y) {
            y = y.slice(0, -1);
            out.textContent = y || x || '0';
        } else if (operation) {
            operation = '';
            out.textContent = x || '0';
        } else if (x) {
            x = x.slice(0, -1);
            out.textContent = x || '0';
        }
    };

    document.querySelector('.buttons').onclick = (event) => {
        if (!event.target.classList.contains('btn')) return;
        if (event.target.classList.contains('C')) return;

        const key = event.target.textContent;

        if (digit.includes(key)) {
            if (y === '' && operation === '') {
                x += key;
                out.textContent = x;
            } else if (x !== '' && y !== '' && finish) {
                y = key;
                finish = false;
                out.textContent = y;
            } else {
                y += key;
                out.textContent = y;
            }
            return;
        }

        if (action.includes(key)) {
            operation = key;
            out.textContent = operation;
            return;
        }

        if (key === '=') {
            switch (operation) {
                case "+":
                    x = (+x) + (+y);
                    break;
                case "-":
                    x = x - y;
                    break;
                case "×":
                    x = x * y;
                    break;
                case "÷":
                    x = x / y;
                    break;
                case "√x":
                    x = Math.sqrt(x);
                    break;
                case "xy":
                    x = x ** y;
                    break;
                case "x!":
                    x = factorial(+x);
                    break;
                case "π":
                    x = Math.PI;
                    break;
                case "%":
                    x = (x / 100);
                    continue;
                case "(":
                case ")":
                    out.textContent = "Не підтримується";
                    return;
                default:
                    out.textContent = 'Error';
                    return;
            }

            finish = true;
            out.textContent = x;
        }
    };
});
