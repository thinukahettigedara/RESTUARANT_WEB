/**
 * Safe toFixed function that prevents undefined/null errors
 * @param {number} value - The number to format
 * @param {number} decimals - Number of decimal places (default: 2)
 * @returns {string} - Formatted number or "0" if invalid
 */
export const safeToFixed = (value, decimals = 2) => {
    if (value === null || value === undefined || isNaN(value) || !isFinite(value)) {
        return '0';
    }
    return Number(value).toFixed(decimals);
};

/**
 * Safe number conversion that prevents undefined/null errors
 * @param {any} value - The value to convert to number
 * @param {number} defaultValue - Default value if conversion fails (default: 0)
 * @returns {number} - Safe number value
 */
export const safeNumber = (value, defaultValue = 0) => {
    if (value === null || value === undefined || isNaN(value) || !isFinite(value)) {
        return defaultValue;
    }
    return Number(value);
};
