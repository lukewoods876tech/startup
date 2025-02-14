// Check if user is logged in
function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const protectedLinks = document.querySelectorAll('.protected-link');
    
    protectedLinks.forEach(link => {
        if (!isLoggedIn) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                alert('Please log in to access this page.');
            });
            link.style.opacity = '0.5';
            link.style.cursor = 'not-allowed';
        } else {
            link.style.opacity = '1';
            link.style.cursor = 'pointer';
        }
    });
}

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);
        
        // Show all protected links
        const protectedLinks = document.querySelectorAll('.protected-link');
        protectedLinks.forEach(link => {
            link.style.opacity = '1';
            link.style.cursor = 'pointer';
        });

        alert('Login successful! You can now access all pages.');
        
        // Optional: Hide the login form and show a welcome message
        const loginSection = document.querySelector('.login-section');
        loginSection.innerHTML = `
            <div class="welcome-message">
                <h2>Welcome, ${username}!</h2>
                <button onclick="logout()" class="logout-btn">Logout</button>
            </div>
        `;
    }
});

// Logout function
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    location.reload();
}

// Check auth status when page loads
document.addEventListener('DOMContentLoaded', checkAuth); 