/**
 * Theme definitions for the Qurio app
 */

export const themes = {
  // Pink and white gradient theme
  pinkWhite: {
    id: 'pinkWhite',
    name: 'Pink & White',
    // Background gradients
    appBg: 'linear-gradient(135deg, #ffd6e0 0%, #ffffff 100%)',
    
    // Navbar styling
    navbarBg: 'white',
    navbarText: '#ff6b95', // Pink text on white navbar
    logoText: '#ff6b95',
    
    // Footer styling
    footerBg: '#ff6b95', // Pink footer
    footerText: 'white', // White text on pink footer for contrast
    
    // Button styling
    buttonBg: '#ff6b95',
    buttonText: 'white',
    
    // Text colors
    primaryText: '#333333',
    secondaryText: '#666666',
    accentText: '#ff6b95',
    
    // Component colors
    cardBg: 'white',
    inputBg: 'white',
    inputBorder: '#ff6b95',
    inputText: '#333333',
    
    // Accent colors
    primary: '#ff6b95',
    secondary: '#ffa5c3',
    accent: '#ff3e78',
    
    // Utility colors
    border: '#ffcad9',
    shadow: 'rgba(255, 107, 149, 0.2)',
    focus: '#ff3e78',
    error: '#dc2626',
    success: '#16a34a',
  },
  
  // Monochrome black and white theme
  monochrome: {
    id: 'monochrome',
    name: 'Monochrome',
    // Background colors
    appBg: 'white',
    
    // Navbar styling
    navbarBg: 'black',
    navbarText: 'white', // White text on black navbar
    logoText: 'white',
    
    // Footer styling
    footerBg: 'black', // Black footer
    footerText: 'white', // White text on black footer for contrast
    
    // Button styling
    buttonBg: 'black',
    buttonText: 'white',
    
    // Text colors
    primaryText: 'black',
    secondaryText: '#333333',
    accentText: 'black',
    
    // Component colors
    cardBg: 'white',
    inputBg: 'white',
    inputBorder: 'black',
    inputText: 'black',
    
    // Accent colors
    primary: 'black',
    secondary: '#333333',
    accent: '#000000',
    
    // Utility colors
    border: '#cccccc',
    shadow: 'rgba(0, 0, 0, 0.2)',
    focus: '#000000',
    error: '#dc2626',
    success: '#16a34a',
  },
};

/**
 * Get theme from localStorage or use default
 * @returns {Object} theme object
 */
export const getTheme = () => {
  // Check if user has a saved preference
  const savedThemeId = localStorage.getItem('qurio_theme_id');
  
  if (savedThemeId && themes[savedThemeId]) {
    // User has explicitly chosen a theme
    return themes[savedThemeId];
  } else {
    // Default to pink-white theme
    return themes.pinkWhite;
  }
};

/**
 * Save theme preference to localStorage
 * @param {Object} theme - The theme object to save
 */
export const saveTheme = (theme) => {
  localStorage.setItem('qurio_theme_id', theme.id);
};

/**
 * Apply theme to document
 * @param {Object} theme - The theme object to apply
 */
export const applyTheme = (theme) => {
  const root = document.documentElement;
  
  // Set CSS variables for the theme
  root.style.setProperty('--app-bg', theme.appBg);
  root.style.setProperty('--navbar-bg', theme.navbarBg);
  root.style.setProperty('--navbar-text', theme.navbarText);
  root.style.setProperty('--logo-text', theme.logoText);
  root.style.setProperty('--footer-bg', theme.footerBg);
  root.style.setProperty('--footer-text', theme.footerText);
  root.style.setProperty('--button-bg', theme.buttonBg);
  root.style.setProperty('--button-text', theme.buttonText);
  root.style.setProperty('--primary-text', theme.primaryText);
  root.style.setProperty('--secondary-text', theme.secondaryText);
  root.style.setProperty('--accent-text', theme.accentText);
  root.style.setProperty('--card-bg', theme.cardBg);
  root.style.setProperty('--input-bg', theme.inputBg);
  root.style.setProperty('--input-border', theme.inputBorder);
  root.style.setProperty('--input-text', theme.inputText);
  root.style.setProperty('--primary', theme.primary);
  root.style.setProperty('--secondary', theme.secondary);
  root.style.setProperty('--accent', theme.accent);
  root.style.setProperty('--border', theme.border);
  root.style.setProperty('--shadow', theme.shadow);
  root.style.setProperty('--focus', theme.focus);
  root.style.setProperty('--error', theme.error);
  root.style.setProperty('--success', theme.success);
  
  // Set theme ID as a data attribute for additional CSS targeting
  root.setAttribute('data-theme', theme.id);
};

/**
 * Initialize theme system
 */
export const initializeThemeSystem = () => {
  // Apply initial theme
  const initialTheme = getTheme();
  applyTheme(initialTheme);
};

