import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class ClientDocument extends Document {


  constructor(props) {
    super(props)
    const { __NEXT_DATA__, ids } = props
    if (ids) {
      __NEXT_DATA__.ids = this.props.ids
    }
  }

  render () {
    const sheet = new ServerStyleSheet()
    const main = sheet.collectStyles(<Main />)
    const styleTags = sheet.getStyleElement()
    return (
      <html lang="en">
        <Head>
          <title>Storytellin.gg</title>
          <link
            rel='shortcut icon'
            type='image/x-icon'
            href='/static/favicon.png'/>


          {styleTags}
        </Head>
        <body>
          <div className='root'>
              {main}
          </div>
          <NextScript />
        </body>
      </html>
    )
  }

}
