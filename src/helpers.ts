import Axios, { AxiosRequestConfig } from "axios";
import * as cheerio from "cheerio";

export async function request(url = 'http://www.bonjourmadame.fr'): Promise<string> {
  const axiosConfig: AxiosRequestConfig = {
    method: "get",
    url,
    maxRedirects: 200
  };

  const response = await Axios(axiosConfig);

  return response.data;
}

export function parsePage(html: string): { imageUrl: string; title: string; pageUrl: string } {
  const $ = cheerio.load(html);

  const title = $(".post-title").text();

  return {
    imageUrl: $(".post")
      .find("img")
      .prop("src").split('?resize')[0],
    title: title.replace(/\t?\n|\t/g, '').trim(),
    pageUrl: $(".timestamp")
      .find("a")
      .attr("href") || ''
  };
}
