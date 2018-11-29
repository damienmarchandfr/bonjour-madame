import Axios from 'axios'
import * as cheerio from 'cheerio'

export function generateUrl(today: boolean) {
  return  today ? 'http://dites.bonjourmadame.fr/' : 'http://dites.bonjourmadame.fr/random'
}

export async function request(today = true): Promise<string> {
   const axiosConfig = {
      method: 'get',
      url: generateUrl(today),
      maxRedirects : 200
   }

   const response = await Axios(axiosConfig)

   return response.data
}

export function parsePage(html: string): {imageUrl: string, title: string, pageUrl: string} {
  const $ = cheerio.load(html)
  return {
    imageUrl : $('.post').find('img').prop('src'),
    title : $('.post').find('img').prop('alt'),
    pageUrl : $('.timestamp').find('a').attr('href')
  }
}
