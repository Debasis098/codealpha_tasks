let a = document.querySelector("input");
let b = document.querySelectorAll("button");
let s = "";

let btnArry = Array.from(b);

// Button click support
btnArry.forEach(btn => {
    btn.addEventListener('click', (e) => {
        handleInput(e.target.innerHTML);
    });
});

// Keyboard support
document.addEventListener("keydown", (e) => {
    let key = e.key;

    if (
        (key >= '0' && key <= '9') ||
        key === '+' || key === '-' ||
        key === '*' || key === '/' ||
        key === '.' || key === '%'
    ) {
        handleInput(key);
    }
    else if (key === 'Backspace') {
        handleInput('x');
    }
    else if (key === 'Enter') {
        e.preventDefault(); // prevents form submit
        handleInput('=');
    }
    else if (key === 'Escape') {
        handleInput('AC');
    }
});

// Common function for both button & keyboard
function handleInput(value) {
    if (value === 'x') {
        s = s.substring(0, s.length - 1);
        a.value = s;
    }
    else if (value === 'AC') {
        s = "";
        a.value = s;
    }
    else if (value === '=') {
        try {
            s = eval(s).toString();
            a.value = s;
        } catch {
            a.value = "Error";
            s = "";
        }
    }
    else {
        s += value;
        a.value = s;
    }
}
