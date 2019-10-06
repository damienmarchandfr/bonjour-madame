import * as helper from "../helpers";
import * as fs from "fs";
import { promisify } from "util";
import * as moment from "moment";
import { BonjourMadameClient } from "../index";

const fsReadFile = promisify(fs.readFile);

const read = fsReadFile(__dirname + "/page.html").then(buffer => buffer.toString("utf-8"));

// STUB
(helper.request as any) = jest.fn(() => read);

test("Get today madame without source", async () => {
  const client = new BonjourMadameClient();
  const madame = await client.get(false);
  expect(madame.pageUrl).toBe("http://www.bonjourmadame.fr");

  expect(madame.title).toBe("Madame Mercredi compte jusqu’à deux.");
  expect(madame.imgUrl).toBe("https://i0.wp.com/bonjourmadame.fr/wp-content/uploads/2019/10/191002.jpg");
  expect(madame.pageSource).toBeUndefined();
});

test("Get today madame with source", async () => {
  const client = new BonjourMadameClient();
  const madame = await client.get(true);

  const html = await fsReadFile(__dirname + "/page.html").then(buffer => buffer.toString("utf-8"));

  expect(madame.pageSource).toEqual(html);
});

test("Get madame at date without source", async () => {
  const client = new BonjourMadameClient();
  const madame = await client.getAtDate(moment("2019-08-16").toDate());

  expect(madame.pageUrl).toEqual("http://www.bonjourmadame.fr/2019/08/16");
  expect(madame.pageSource).toBeUndefined();
});

test("Get madame at date with source", async () => {
  const client = new BonjourMadameClient();
  const madame = await client.getAtDate(moment("2019-08-16").toDate(), true);

  expect(madame.pageUrl).toEqual("http://www.bonjourmadame.fr/2019/08/16");
  const html = await fsReadFile(__dirname + "/page.html").then(buffer => buffer.toString("utf-8"));

  expect(madame.pageSource).toEqual(html);
});

test("Get madame at date today", async () => {
  const client = new BonjourMadameClient();
  const madame = await client.getAtDate(new Date());

  expect(madame.pageUrl).toEqual("http://www.bonjourmadame.fr");
});

test("Get madame at date before first date", async () => {
  const client = new BonjourMadameClient();
  let hasError = false;

  try {
    await client.getAtDate(moment("2018-12-10").subtract(1, "day").toDate());
  } catch (error) {
    hasError = true
  }

  expect(hasError).toEqual(true)

});
