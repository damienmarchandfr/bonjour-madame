import * as helper from "./helpers";
import * as moment from "moment";

export interface Madame {
  imgUrl: string;
  title: string;
  pageUrl: string;
  pageSource?: string;
}

export class BonjourMadameClient {
  public async getAtDate(date: Date, getSource = false) {
    const madame: Madame = {
      title: "",
      imgUrl: "",
      pageUrl: ""
    };

    const m = moment(date);
    const firstDate = moment("2018-12-10");

    // No image before this date
    if (m.isBefore(firstDate)) {
      throw new Error(`No image before 2018/12/10`);
    }

    // Must be yesterday
    if (m.isSame(new Date(), "day")) {
      return this.get(getSource);
    }

    // Format date 01/10/1986 -> 1986/10/01
    const url = "http://www.bonjourmadame.fr/" + m.format("YYYY/MM/DD");

    const html = await helper.request(url);
    madame.imgUrl = helper.parsePage(html).imageUrl;
    madame.title = helper.parsePage(html).title;
    madame.pageUrl = helper.parsePage(html).pageUrl || url;

    // Get source
    if (getSource) {
      madame.pageSource = html;
    }

    return madame;
  }

  public async get(getSource = false) {
    const madame: Madame = {
      title: "",
      imgUrl: "",
      pageUrl: ""
    };

    // Make request to main page
    const html = await helper.request();
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
