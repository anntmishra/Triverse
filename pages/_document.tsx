import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Preload fonts to improve performance */}
          <link
            rel="preload"
            href="/fonts/Playfair-Display.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          {/* Add custom fonts */}
          <link
            href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />

          {/* Favicon */}
          <link rel="icon" href="/favicon.ico" />

          {/* Meta tags */}
          <meta name="theme-color" content="#111111" />
          <meta charSet="utf-8" />
        </Head>
        <body>
          <Main />
          <NextScript />
          {/* No synchronous scripts here - using NextScript properly */}
        </body>
      </Html>
    );
  }
}

export default MyDocument;
