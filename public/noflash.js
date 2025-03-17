(function() {
  // Apply dark background immediately
  try {
    var htmlEl = document.documentElement;
    var bodyEl = document.body;
    
    // Set dark background
    htmlEl.style.backgroundColor = '#111111';
    if (bodyEl) bodyEl.style.backgroundColor = '#111111';
    
    // Set dark text color
    htmlEl.style.color = '#ffffff';
    if (bodyEl) bodyEl.style.color = '#ffffff';
    
    // Inject CSS to force dark mode
    var style = document.createElement('style');
    style.textContent = `
      html, body, #__next {
        background-color: #111111 !important;
        color: #ffffff !important;
      }
      
      /* Critical styles to prevent white flash */
      * {
        box-sizing: border-box;
      }
    `;
    document.head.appendChild(style);
    
    // Set color-scheme meta tag
    var meta = document.createElement('meta');
    meta.name = 'color-scheme';
    meta.content = 'dark';
    document.head.appendChild(meta);
    
    // Keep checking to ensure dark mode stays applied
    var checkDarkMode = function() {
      if (document.documentElement.style.backgroundColor !== '#111111') {
        document.documentElement.style.backgroundColor = '#111111';
      }
      if (document.body && document.body.style.backgroundColor !== '#111111') {
        document.body.style.backgroundColor = '#111111';
      }
      var nextEl = document.getElementById('__next');
      if (nextEl && nextEl.style.backgroundColor !== '#111111') {
        nextEl.style.backgroundColor = '#111111';
      }
    };
    
    // Run immediately and set interval to keep checking
    checkDarkMode();
    setInterval(checkDarkMode, 100);
  } catch (e) {
    // Fail silently
    console.error('Error in noflash.js:', e);
  }
})(); 