import { BonjourMadameClient } from "..";
import * as moment from "moment";


test("Make a real request to website.", async () => {
  const client = new BonjourMadameClient();
  const date = moment("20210421T000000+0200").toDate();
  const data = await client.getAtDate(date);

  expect(data.imgUrl).toBeDefined()
  expect(data.title).toBeDefined()
  expect(data.pageUrl).toBeDefined()
});
