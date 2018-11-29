import * as helper from './helpers'

export interface Madame {
    today: boolean
    imgUrl: string
    title: string
    pageUrl: string
    pageSource?: string
}

export class BonjourMadameClient {

    public async get(today: boolean, getSource = false) {
        const madame: Madame = {
          title: '',
          today,
          imgUrl: '',
          pageUrl : ''
        }

        // Make request to main page
        const html = await helper.request(today)
        madame.imgUrl = helper.parsePage(html).imageUrl
        madame.title = helper.parsePage(html).title
        madame.pageUrl = helper.parsePage(html).pageUrl

        // Get source
        if (getSource) {
          madame.pageSource = html
        }

        return madame

    }
}
