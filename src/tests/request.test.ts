import { BonjourMadameClient } from "..";
import * as moment from "moment";

test("Make a real request to website.", async () => {
  const client = new BonjourMadameClient();
  const date = moment("20210421T000000+0200").toDate();
  const data = await client.getAtDate(date);

  expect(data).toStrictEqual({
    title: 'Madame Mercredi, fracture définitive et énigmatique.',
    imgUrl: 'https://i0.wp.com/bonjourmadame.fr/wp-content/uploads/2021/04/210421.jpg',
    pageUrl: 'http://www.bonjourmadame.fr/2021/04/21'
  });
});
