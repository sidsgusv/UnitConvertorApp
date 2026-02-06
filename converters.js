const converters = {
    length: {
        name: 'Length',
        units: {
            mm: { label: 'Millimeter (mm)', toBase: 0.001 },
            cm: { label: 'Centimeter (cm)', toBase: 0.01 },
            m: { label: 'Meter (m)', toBase: 1 },
            km: { label: 'Kilometer (km)', toBase: 1000 },
            inch: { label: 'Inch (in)', toBase: 0.0254 },
            foot: { label: 'Foot (ft)', toBase: 0.3048 },
            yard: { label: 'Yard (yd)', toBase: 0.9144 },
            mile: { label: 'Mile (mi)', toBase: 1609.34 }
        },
        convert: function (value, fromUnit, toUnit) {
            if (value === '' || isNaN(value)) return '';
            const valueInMeters = value * this.units[fromUnit].toBase;
            const result = valueInMeters / this.units[toUnit].toBase;
            return result.toFixed(8).replace(/\.?0+$/, '');
        }
    },
    weight: {
        name: 'Weight',
        units: {
            mg: { label: 'Milligram (mg)', toBase: 0.000001 },
            g: { label: 'Gram (g)', toBase: 0.001 },
            kg: { label: 'Kilogram (kg)', toBase: 1 },
            oz: { label: 'Ounce (oz)', toBase: 0.0283495 },
            lb: { label: 'Pound (lb)', toBase: 0.453592 },
            ton: { label: 'Metric Ton (t)', toBase: 1000 },
            stone: { label: 'Stone (st)', toBase: 6.35029 }
        },
        convert: function (value, fromUnit, toUnit) {
            if (value === '' || isNaN(value)) return '';
            const valueInKg = value * this.units[fromUnit].toBase;
            const result = valueInKg / this.units[toUnit].toBase;
            return result.toFixed(8).replace(/\.?0+$/, '');
        }
    },
    temperature: {
        name: 'Temperature',
        units: {
            celsius: { label: 'Celsius (°C)' },
            fahrenheit: { label: 'Fahrenheit (°F)' },
            kelvin: { label: 'Kelvin (K)' }
        },
        convert: function (value, fromUnit, toUnit) {
            if (value === '' || isNaN(value)) return '';

            let celsius;

            // Convert to Celsius first
            if (fromUnit === 'celsius') {
                celsius = parseFloat(value);
            } else if (fromUnit === 'fahrenheit') {
                celsius = (parseFloat(value) - 32) * 5 / 9;
            } else if (fromUnit === 'kelvin') {
                celsius = parseFloat(value) - 273.15;
            }

            // Convert from Celsius to target unit
            let result;
            if (toUnit === 'celsius') {
                result = celsius;
            } else if (toUnit === 'fahrenheit') {
                result = (celsius * 9 / 5) + 32;
            } else if (toUnit === 'kelvin') {
                result = celsius + 273.15;
            }

            return result.toFixed(2).replace(/\.?0+$/, '');
        }
    },
    volume: {
        name: 'Volume',
        units: {
            ml: { label: 'Milliliter (ml)', toBase: 0.001 },
            l: { label: 'Liter (L)', toBase: 1 },
            m3: { label: 'Cubic Meter (m³)', toBase: 1000 },
            floz: { label: 'Fluid Ounce (fl oz)', toBase: 0.0295735 },
            pint: { label: 'Pint (pt)', toBase: 0.473176 },
            gallon: { label: 'Gallon (gal)', toBase: 3.78541 },
            cup: { label: 'Cup (cup)', toBase: 0.236588 }
        },
        convert: function (value, fromUnit, toUnit) {
            if (value === '' || isNaN(value)) return '';
            const valueInLiters = value * this.units[fromUnit].toBase;
            const result = valueInLiters / this.units[toUnit].toBase;
            return result.toFixed(8).replace(/\.?0+$/, '');
        }
    }
};

function getConverter(category) {
    return converters[category];
}

function convertUnits(value, fromUnit, toUnit, category) {
    return converters[category].convert(value, fromUnit, toUnit);
}
