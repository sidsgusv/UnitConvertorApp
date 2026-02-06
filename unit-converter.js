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
    const converter = getConverter(category);

    if (converter.units && Object.keys(converter.units).length > 0) {
        converterContent.innerHTML = createConverterHTML(category, converter);
        attachConverterListeners(category, converter);
    } else {
        converterContent.innerHTML = `<h2>${converter.name}</h2><p>Coming soon...</p>`;
    }
}

function createConverterHTML(category, converter) {
    const unitOptions = Object.entries(converter.units)
        .map(([key, unit]) => `<option value="${key}">${unit.label}</option>`)
        .join('');

    return `
        <h2>${converter.name} Converter</h2>
        <div class="converter-form">
            <div class="input-group">
                <label for="from-value">From:</label>
                <input type="number" id="from-value" placeholder="Enter value" step="any">
                <select id="from-unit">
                    ${unitOptions}
                </select>
            </div>

            <div class="swap-button">
                <button id="swap-units" title="Swap units">⇅</button>
            </div>

            <div class="input-group">
                <label for="to-value">To:</label>
                <input type="number" id="to-value" placeholder="Result" readonly>
                <select id="to-unit">
                    ${unitOptions}
                </select>
            </div>
        </div>
    `;
}

function attachConverterListeners(category, converter) {
    const fromValue = document.getElementById('from-value');
    const fromUnit = document.getElementById('from-unit');
    const toValue = document.getElementById('to-value');
    const toUnit = document.getElementById('to-unit');
    const swapButton = document.getElementById('swap-units');

    // Set default to-unit to the second unit
    const unitKeys = Object.keys(converter.units);
    if (unitKeys.length > 1) {
        toUnit.value = unitKeys[1];
    }

    function performConversion() {
        const value = fromValue.value;
        if (value === '') {
            toValue.value = '';
            return;
        }
        const result = convertUnits(value, fromUnit.value, toUnit.value, category);
        toValue.value = result;
    }

    fromValue.addEventListener('input', performConversion);
    fromUnit.addEventListener('change', performConversion);
    toUnit.addEventListener('change', performConversion);

    swapButton.addEventListener('click', function () {
        // Swap units
        const tempUnit = fromUnit.value;
        fromUnit.value = toUnit.value;
        toUnit.value = tempUnit;

        // Swap values
        const tempValue = fromValue.value;
        fromValue.value = toValue.value;

        // Perform new conversion
        performConversion();
    });
}
