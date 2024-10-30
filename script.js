function appendToDisplay(value) {
    const display = document.getElementById('display');
    display.innerText = display.innerText === '0' ? value : display.innerText + value;
}

function clearAll() {
    document.getElementById('display').innerText = '0';
}

function deleteLastCharacter() {
    const display = document.getElementById('display');
    display.innerText = display.innerText.length > 1 ? display.innerText.slice(0, -1) : '0';
}

function calculateResult() {
    const display = document.getElementById('display');
    try {
        // Thay thế các hàm lượng giác bằng cách sử dụng Math
        let expression = display.innerText.replace(/sin\(/g, 'Math.sin(Math.PI/180 * ')
                                          .replace(/cos\(/g, 'Math.cos(Math.PI/180 * ')
                                          .replace(/tan\(/g, 'Math.tan(Math.PI/180 * ')
                                          .replace(/log\(/g, 'Math.log10(');
        
        let result = eval(expression); // Tính toán biểu thức

        // Kiểm tra kết quả hợp lệ
        if (typeof result === 'number' && !isNaN(result) && isFinite(result)) {
            // Chuyển đổi kết quả thành phân số
            const fractionResult = toFraction(result);
            display.innerText = fractionResult; // Hiển thị kết quả dưới dạng phân số
        } else {
            display.innerText = 'Error'; // Nếu không hợp lệ, hiển thị lỗi
        }
    } catch (error) {
        display.innerText = 'Error';
    }
}


function convert() {
    const display = document.getElementById('display');
    const value = display.innerText;

    if (value.includes('/')) { // Nếu là phân số
        const parts = value.split('/');
        const numerator = parseFloat(parts[0]);
        const denominator = parseFloat(parts[1]);
        const decimal = (numerator / denominator).toFixed(4); // Làm tròn đến 4 chữ số thập phân
        display.innerText = parseFloat(decimal); // Chỉ hiển thị số thập phân không có số 0 dư
    } else { // Nếu là số thập phân
        const decimal = parseFloat(value);
        const fractionResult = toFraction(decimal, 4); // Chuyển đổi với số chữ số tối đa
        display.innerText = fractionResult; 
    }
}

// Cập nhật hàm toFraction để không có số 0 không cần thiết
function toFraction(value, decimalPlaces = 4) {
    const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
    const sign = value < 0 ? -1 : 1;
    value = Math.abs(value);

    const whole = Math.floor(value);
    const decimal = value - whole;

    if (decimal === 0) {
        return `${sign * whole}`; // Nếu không có phần thập phân, trả về số nguyên
    }

    const roundedDecimal = parseFloat(decimal.toFixed(decimalPlaces));
    let denominator = Math.pow(10, decimalPlaces); // Mẫu số là 10^số chữ số
    let numerator = Math.round(roundedDecimal * denominator); // Tính tử số

    const divisor = gcd(numerator, denominator); // Tìm ước số chung lớn nhất
    numerator /= divisor;
    denominator /= divisor;

    if (numerator === 0) {
        return '0'; // Nếu là 0
    }
    
    return `${sign * (whole * denominator + numerator)}/${denominator}`;
}


// Hàm cho các nút hàm lượng giác
function appendSin() {
    appendToDisplay('sin(');
}

function appendCos() {
    appendToDisplay('cos(');
}

function appendTan() {
    appendToDisplay('tan(');
}

function calculateLog() {
    const display = document.getElementById('display');
    const value = parseFloat(display.innerText);

    if (isNaN(value) || value <= 0) {
        display.innerText = 'Error';
        return;
    }

    display.innerText = Math.log10(value).toString(); // Tính log cơ số 10
}

function calculateSqrt() {
    const display = document.getElementById('display');
    const value = parseFloat(display.innerText);

    if (isNaN(value) || value < 0) {
        display.innerText = 'Error';
        return;
    }

    display.innerText = Math.sqrt(value).toString(); // Tính căn bậc hai
}

function calculateSquare() {
    const display = document.getElementById('display');
    const value = parseFloat(display.innerText);

    if (isNaN(value)) {
        display.innerText = 'Error';
        return;
    }

    display.innerText = Math.pow(value, 2).toString(); // Tính bình phương
}

function calculateExponent() {
    const display = document.getElementById('display');
    const value = parseFloat(display.innerText);

    if (isNaN(value)) {
        display.innerText = 'Error';
        return;
    }

    const exponent = prompt("Nhập số mũ:");
    if (isNaN(exponent)) {
        display.innerText = 'Error';
        return;
    }

    display.innerText = Math.pow(value, parseFloat(exponent)).toString(); // Tính lũy thừa
}

// Hiển thị modal khi trang được tải
window.onload = function() {
    document.getElementById('helpModal').style.display = 'block';
}

// Đóng modal
function closeModal() {
    document.getElementById('helpModal').style.display = 'none';
}
