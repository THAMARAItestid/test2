// OTP functionality
let otpTimer;
let resendTimer;
let timeLeft = 300; // 5 minutes
let resendTimeLeft = 60; // 1 minute

// Get user data from localStorage
const userData = JSON.parse(localStorage.getItem('tempUserData') || '{}');
const isLogin = localStorage.getItem('isLogin') === 'true';

// Update message based on login or signup
document.addEventListener('DOMContentLoaded', function() {
    const messageElement = document.getElementById('otpMessage');
    if (isLogin) {
        messageElement.textContent = `We've sent a 6-digit code to ${userData.email || 'your email'}`;
    } else {
        messageElement.textContent = `We've sent a 6-digit code to ${userData.email || 'your email'} to complete your registration`;
    }
    
    // Generate and store OTP (in real app, this would be sent via email/SMS)
    const otp = generateOTP();
    localStorage.setItem('currentOTP', otp);
    console.log('Generated OTP:', otp); // For testing purposes
    
    // Start timers
    startOTPTimer();
    startResendTimer();
    
    // Focus first input
    document.querySelector('.otp-input').focus();
});

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

function moveToNext(current, index) {
    if (current.value.length === 1) {
        if (index < 5) {
            document.querySelectorAll('.otp-input')[index + 1].focus();
        }
    }
    
    // Auto-submit when all fields are filled
    const inputs = document.querySelectorAll('.otp-input');
    const allFilled = Array.from(inputs).every(input => input.value.length === 1);
    if (allFilled) {
        document.getElementById('verifyBtn').click();
    }
}

function handleBackspace(current, index) {
    if (event.key === 'Backspace' && current.value === '' && index > 0) {
        document.querySelectorAll('.otp-input')[index - 1].focus();
    }
}

function getOTPValue() {
    const inputs = document.querySelectorAll('.otp-input');
    return Array.from(inputs).map(input => input.value).join('');
}

function clearOTPInputs() {
    const inputs = document.querySelectorAll('.otp-input');
    inputs.forEach(input => {
        input.value = '';
        input.classList.remove('error');
    });
    inputs[0].focus();
}

function showOTPError() {
    const inputs = document.querySelectorAll('.otp-input');
    inputs.forEach(input => input.classList.add('error'));
    
    setTimeout(() => {
        inputs.forEach(input => input.classList.remove('error'));
    }, 2000);
}

function handleOTPVerification(event) {
    event.preventDefault();
    
    const enteredOTP = getOTPValue();
    const storedOTP = localStorage.getItem('currentOTP');
    
    if (enteredOTP.length !== 6) {
        alert('Please enter all 6 digits');
        return;
    }
    
    if (enteredOTP === storedOTP) {
        // OTP is correct
        clearInterval(otpTimer);
        clearInterval(resendTimer);
        
        // Store user data permanently
        if (!isLogin) {
            // For signup, store new user
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const newUser = {
                id: Date.now(),
                ...userData,
                verified: true,
                createdAt: new Date().toISOString()
            };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('currentUser', JSON.stringify(newUser));
        } else {
            // For login, update current user
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const user = users.find(u => u.email === userData.email);
            if (user) {
                user.lastLogin = new Date().toISOString();
                localStorage.setItem('users', JSON.stringify(users));
                localStorage.setItem('currentUser', JSON.stringify(user));
            }
        }
        
        // Clean up temporary data
        localStorage.removeItem('tempUserData');
        localStorage.removeItem('currentOTP');
        localStorage.removeItem('isLogin');
        
        // Show success message and redirect
        alert('Verification successful! Welcome to Enkrypt Enterprise.');
        window.location.href = 'dashboard.html';
    } else {
        // OTP is incorrect
        showOTPError();
        clearOTPInputs();
        alert('Invalid OTP. Please try again.');
    }
}

function startOTPTimer() {
    const timerElement = document.getElementById('timer');
    
    otpTimer = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        
        timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        if (timeLeft <= 0) {
            clearInterval(otpTimer);
            timerElement.textContent = 'Expired';
            document.getElementById('verifyBtn').disabled = true;
            document.getElementById('verifyBtn').textContent = 'Code Expired';
        }
        
        timeLeft--;
    }, 1000);
}

function startResendTimer() {
    const resendBtn = document.getElementById('resendBtn');
    const resendTimerElement = document.getElementById('resendTimer');
    
    resendTimer = setInterval(() => {
        resendTimerElement.textContent = resendTimeLeft;
        
        if (resendTimeLeft <= 0) {
            clearInterval(resendTimer);
            resendBtn.disabled = false;
            resendBtn.innerHTML = 'Resend Code';
        }
        
        resendTimeLeft--;
    }, 1000);
}

function resendOTP() {
    // Generate new OTP
    const newOTP = generateOTP();
    localStorage.setItem('currentOTP', newOTP);
    console.log('New OTP:', newOTP); // For testing purposes
    
    // Reset timers
    timeLeft = 300;
    resendTimeLeft = 60;
    
    // Clear and restart timers
    clearInterval(otpTimer);
    clearInterval(resendTimer);
    startOTPTimer();
    startResendTimer();
    
    // Reset UI
    document.getElementById('verifyBtn').disabled = false;
    document.getElementById('verifyBtn').textContent = 'Verify Code';
    document.getElementById('resendBtn').disabled = true;
    clearOTPInputs();
    
    alert('New OTP sent successfully!');
}

// Handle page visibility change to pause/resume timers
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        clearInterval(otpTimer);
        clearInterval(resendTimer);
    } else {
        if (timeLeft > 0) {
            startOTPTimer();
        }
        if (resendTimeLeft > 0) {
            startResendTimer();
        }
    }
});