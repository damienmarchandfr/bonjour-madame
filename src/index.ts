import * as helper from "./helpers";

export interface Madame {
  imgUrl: string;
  title: string;
  pageUrl: string;
  pageSource?: string;
}

export class BonjourMadameClient {
  public async get(getSource = false) {
    const madame: Madame = {
      title: "",
      imgUrl: "",
      pageUrl: ""
    };

    // Make request to main page
    const html = await helper.request(true);
    madame.imgUrl = helper.parsePage(html).imageUrl;
    madame.title = helper.parsePage(html).title;
    madame.pageUrl = helper.parsePage(html).pageUrl || "http://www.bonjourmadame.fr";

    // Get source
    if (getSource) {
      madame.pageSource = html;
    }

    return madame;
  }
}
