import Document, { Main, NextScript, Head, Html } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <div id="__modal"></div>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
