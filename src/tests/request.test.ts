import { BonjourMadameClient } from "..";
import * as moment from "moment";

test("Make a real request to website.", async () => {
  const client = new BonjourMadameClient();
  const date = moment("20210510T000000+0200").toDate();
  const data = await client.getAtDate(date);

  expect(data).toStrictEqual({
    title: "Madame “Princesse” Lundi.",
    imgUrl: "https://i2.wp.com/bonjourmadame.fr/wp-content/uploads/2021/05/210510.jpg",
    pageUrl: "http://www.bonjourmadame.fr/2021/05/10",
  });
});
