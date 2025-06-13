import puppeteer from 'puppeteer'

export async function scrapeClimatempoComPuppeteer() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox'],
  })
  const page = await browser.newPage()

  const userAgent = await browser.userAgent()
  await page.setUserAgent(userAgent)

  await page.setCacheEnabled(false)

  await page.goto('https://www.climatempo.com.br/noticias', {
    waitUntil: 'networkidle2',
  })

  await page.waitForSelector('[data-id^="Feed_News_Card_Article-"]', {
    timeout: 30000,
  })

  let noticias = []
  try {
    noticias = await page.evaluate(() => {
      const baseUrl = 'https://www.climatempo.com.br'
      // eslint-disable-next-line no-undef
      const cards = document.querySelectorAll(
        '[data-id^="Feed_News_Card_Article-"]',
      )
      const resultado = []

      for (const card of cards) {
        if (resultado.length >= 20) break

        const aTag = card.querySelector('a[href*="/noticia/"]')
        const imgTag = card.querySelector('img')

        const href = aTag?.getAttribute('href')
        const link = href?.startsWith('http') ? href : baseUrl + href
        const imagem = imgTag?.src || null

        let tituloEl = card.querySelector(
          'h3, strong, span, .title, .MuiTypography-root',
        )
        let titulo = tituloEl?.innerText?.trim()

        if (!titulo || titulo.length < 5) {
          titulo = aTag?.innerText?.trim()
        }
        if (
          titulo &&
          link &&
          imagem &&
          !resultado.some((n) => n.link === link)
        ) {
          resultado.push({ titulo, link, imagem })
        }
      }

      return resultado
    })
  } catch (err) {
    console.error('Erro dentro do page.evaluate:', err)
  }

  await browser.close()
  return noticias
}
