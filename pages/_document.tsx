import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en" className="dark" style={{ backgroundColor: '#111111' }}>
        <Head>
          {/* Block rendering until background is set */}
          <script dangerouslySetInnerHTML={{
            __html: `
              (function() {
                document.documentElement.style.backgroundColor = '#111111';
                document.documentElement.style.color = '#ffffff';
                
                // This is a blocking script that runs before any other JavaScript
                // Apply black background immediately
                var root = document.documentElement;
                root.style.backgroundColor = '#111111';
                root.style.color = '#ffffff';
              })();
            `
          }} />
          
          {/* Load noflash.js before anything else */}
          <script src="/noflash.js" />
          
          <meta name="theme-color" content="#111111" />
          <meta name="background-color" content="#111111" />
          <meta name="color-scheme" content="dark" />
          
          <style dangerouslySetInnerHTML={{
            __html: `
              /* Critical CSS to prevent white flash */
              html {
                background-color: #111111 !important;
                color-scheme: dark !important;
              }
              
              body {
                background-color: #111111 !important;
                color: #ffffff !important;
                margin: 0;
                padding: 0;
              }
              
              #__next {
                background-color: #111111 !important;
              }
              
              /* Prevent any white flash during transitions */
              *, *::before, *::after {
                transition: none !important;
              }
            `
          }} />
          
          {/* NoScript fallback */}
          <noscript>
            <style dangerouslySetInnerHTML={{
              __html: `
                html, body {
                  background-color: #111111 !important;
                  color: #ffffff !important;
                }
              `
            }} />
          </noscript>
        </Head>
        <body style={{ backgroundColor: '#111111', color: '#ffffff' }}>
          {/* NoScript warning */}
          <noscript>
            <div style={{
              backgroundColor: '#111111',
              color: '#ffffff',
              width: '100%',
              padding: '20px',
              textAlign: 'center',
              position: 'fixed',
              top: 0,
              left: 0,
              zIndex: 9999
            }}>
              This website works best with JavaScript enabled
            </div>
          </noscript>
          
          {/* Blocking CSS for the body */}
          <style dangerouslySetInnerHTML={{
            __html: `
              body {
                background-color: #111111 !important;
                color: #ffffff !important;
              }
            `
          }} />
          
          <Main />
          <NextScript />
          
          {/* Script that runs after page load to ensure dark theme stays applied */}
          <script dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Set a timeout to check and ensure dark theme stays applied
                setTimeout(function() {
                  document.documentElement.style.backgroundColor = '#111111';
                  document.body.style.backgroundColor = '#111111';
                  document.getElementById('__next').style.backgroundColor = '#111111';
                }, 0);
              })();
            `
          }} />
        </body>
      </Html>
    );
  }
}

export default MyDocument; 