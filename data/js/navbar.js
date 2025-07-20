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
        try {
            document.getElementById("footer").innerHTML = footerHTML;
        } catch (error) {

        }

        // Custom event para avisar que a navbar foi carregada
        document.dispatchEvent(new Event('navbarLoaded'));
    })
    .catch(error => {
        console.error("Error loading page components:", error);
    });