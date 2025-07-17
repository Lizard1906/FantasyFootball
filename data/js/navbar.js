Promise.all([
    fetch("data/html/navbar.html").then(response => {
        if (!response.ok) {
            throw new Error(`Failed to load navbar: ${response.status} ${response.statusText}`);
        }
        return response.text();
    }),
    fetch("data/html/footer.html").then(response => {
        if (!response.ok) {
            throw new Error(`Failed to load footer: ${response.status} ${response.statusText}`);
        }
        return response.text();
    })
])
    .then(([navbarHTML, footerHTML]) => {
        document.getElementById("navbar").innerHTML = navbarHTML;
        document.getElementById("footer").innerHTML = footerHTML;

        initializeThemeToggle();
    })
    .catch(error => {
        console.error("Error loading page components:", error);
    });


function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');

    if (!themeToggle) {
        console.warn("Theme toggle button not found");
        return;
    }

    const themeIcon = themeToggle.querySelector('i');

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    themeToggle.addEventListener('click', function () {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        let newTheme;

        if (currentTheme === 'dark') {
            newTheme = 'light';
            if (themeIcon) themeIcon.classList.replace('fa-sun', 'fa-moon');
            document.documentElement.removeAttribute('data-theme');
        } else {
            newTheme = 'dark';
            if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
            document.documentElement.setAttribute('data-theme', 'dark');
        }
        localStorage.setItem('theme', newTheme);
    });
}
