document.addEventListener('DOMContentLoaded', function () {
    initializeNavigation();
});

function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const converterContent = document.getElementById('converter-content');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Update active state
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            // Load category content
            const category = this.getAttribute('data-category');
            loadConverterContent(category);
        });
    });

    // Load default category (length)
    loadConverterContent('length');
}

function loadConverterContent(category) {
    const converterContent = document.getElementById('converter-content');

    const content = {
        length: `
            <h2>Length Converter</h2>
            <p>Coming soon...</p>
        `,
        weight: `
            <h2>Weight Converter</h2>
            <p>Coming soon...</p>
        `,
        temperature: `
            <h2>Temperature Converter</h2>
            <p>Coming soon...</p>
        `,
        volume: `
            <h2>Volume Converter</h2>
            <p>Coming soon...</p>
        `
    };

    converterContent.innerHTML = content[category] || '<p>Unknown category</p>';
}
