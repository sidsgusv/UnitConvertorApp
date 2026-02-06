// ============================================
// UNIT CONVERTER APP - JAVASCRIPT
// ============================================

// DOM Elements
const inputValue = document.getElementById('inputValue');
const fromUnit = document.getElementById('fromUnit');
const toUnit = document.getElementById('toUnit');
const convertBtn = document.getElementById('convertBtn');
const result = document.getElementById('result');
const resultValue = document.getElementById('resultValue');
const resultUnit = document.getElementById('resultUnit');
const navLinks = document.querySelectorAll('.nav-link');

// Conversion rates (relative to base unit)
const conversionRates = {
    length: {
        meter: 1,
        kilometer: 1000,
        foot: 0.3048,
        mile: 1609.34
    },
    weight: {
        kilogram: 1,
        gram: 0.001,
        pound: 0.453592,
        ounce: 0.0283495
    },
    temperature: {
        celsius: 'special',
        fahrenheit: 'special',
        kelvin: 'special'
    },
    volume: {
        liter: 1,
        milliliter: 0.001,
        gallon: 3.78541,
        pint: 0.473176
    }
};

// Current selected category
let currentCategory = 'length';

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Unit Converter App Initialized');
    setupEventListeners();
});

// ============================================
// EVENT LISTENERS
// ============================================

function setupEventListeners() {
    // Convert button click
    convertBtn.addEventListener('click', handleConversion);
    
    // Enter key in input field
    inputValue.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleConversion();
        }
    });

    // Navigation links click
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            handleNavigation(this);
        });
    });

    // Input value change (real-time conversion)
    inputValue.addEventListener('input', handleConversion);
}

// ============================================
// CONVERSION LOGIC
// ============================================

function handleConversion() {
    const value = parseFloat(inputValue.value);
    
    // Validate input
    if (isNaN(value) || value === '') {
        result.style.display = 'none';
        return;
    }

    let convertedValue;

    if (currentCategory === 'temperature') {
        convertedValue = convertTemperature(value, fromUnit.value, toUnit.value);
    } else {
        convertedValue = convertUnits(value, fromUnit.value, toUnit.value);
    }

    // Display result
    displayResult(convertedValue, toUnit.value);
}

function convertUnits(value, fromUnitName, toUnitName) {
    const rates = conversionRates[currentCategory];
    
    // Convert from source unit to base unit
    const baseValue = value * rates[fromUnitName];
    
    // Convert from base unit to target unit
    const converted = baseValue / rates[toUnitName];
    
    return converted.toFixed(4);
}

function convertTemperature(value, fromUnit, toUnit) {
    let celsius;

    // Convert to Celsius first
    if (fromUnit === 'celsius') {
        celsius = value;
    } else if (fromUnit === 'fahrenheit') {
        celsius = (value - 32) * 5/9;
    } else if (fromUnit === 'kelvin') {
        celsius = value - 273.15;
    }

    // Convert from Celsius to target unit
    let result;
    if (toUnit === 'celsius') {
        result = celsius;
    } else if (toUnit === 'fahrenheit') {
        result = (celsius * 9/5) + 32;
    } else if (toUnit === 'kelvin') {
        result = celsius + 273.15;
    }

    return result.toFixed(4);
}

function displayResult(value, unit) {
    resultValue.textContent = value;
    resultUnit.textContent = getUnitLabel(unit);
    result.style.display = 'block';
}

function getUnitLabel(unit) {
    const labels = {
        // Length
        meter: 'm',
        kilometer: 'km',
        foot: 'ft',
        mile: 'mi',
        // Weight
        kilogram: 'kg',
        gram: 'g',
        pound: 'lb',
        ounce: 'oz',
        // Temperature
        celsius: '°C',
        fahrenheit: '°F',
        kelvin: 'K',
        // Volume
        liter: 'L',
        milliliter: 'mL',
        gallon: 'gal',
        pint: 'pt'
    };
    return labels[unit] || unit;
}

// ============================================
// NAVIGATION
// ============================================

function handleNavigation(clickedLink) {
    // Remove active class from all links
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Add active class to clicked link
    clickedLink.classList.add('active');

    // Get the category
    currentCategory = clickedLink.getAttribute('data-category');

    // Update units in dropdowns based on category
    updateUnitOptions(currentCategory);

    // Clear previous results
    result.style.display = 'none';
    inputValue.value = '';
}

function updateUnitOptions(category) {
    const units = conversionRates[category];
    
    // Clear existing options
    fromUnit.innerHTML = '';
    toUnit.innerHTML = '';

    // Add new options based on category
    const unitList = Object.keys(units);
    
    unitList.forEach(unit => {
        const label = getUnitLabel(unit);
        
        // From unit dropdown
        const fromOption = document.createElement('option');
        fromOption.value = unit;
        fromOption.textContent = capitalizeFirstLetter(unit) + ` (${label})`;
        fromUnit.appendChild(fromOption);

        // To unit dropdown
        const toOption = document.createElement('option');
        toOption.value = unit;
        toOption.textContent = capitalizeFirstLetter(unit) + ` (${label})`;
        toUnit.appendChild(toOption);
    });

    // Set second unit as default for "to" dropdown
    if (toUnit.options.length > 1) {
        toUnit.selectedIndex = 1;
    }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// ============================================
// END OF APP
// ============================================
