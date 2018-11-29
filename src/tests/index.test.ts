import * as helper from '../helpers'
import * as fs from 'fs'
import {promisify} from 'util'
import {BonjourMadameClient} from '../index'

const fsReadFile = promisify(fs.readFile)

const read = fsReadFile(__dirname + '/page.html').then((buffer) => buffer.toString('utf-8'))
const readAlt = fsReadFile(__dirname + '/pageAlt.html').then((buffer) => buffer.toString('utf-8'));

test('Get today madame', async () => {
   // STUB
  (helper.request as any) = jest.fn(() => read);

  const client = new BonjourMadameClient()
  let madame = await client.get(true, false)
  expect(madame.pageUrl)
  .toBe('http://dites.bonjourmadame.fr/post/180546653833/sur-votre-mardi-les-ombres-du-bonheur')
  expect(madame.title).toBe('Sur votre mardi, les ombres du bonheur…')
  expect(madame.today).toBe(true)
  expect(madame.imgUrl)
    .toBe('https://66.media.tumblr.com/5600f009699dfce47a6b88efaf9d81ba/tumblr_pisovqadzw1v1wvcuo1_1280.jpg')
  expect(madame.pageSource).toBeUndefined()

  // Get source
  madame = await client.get(true, true)
  expect(madame.pageSource).toBeDefined();

  // STUB
  (helper.request as any) = jest.fn(() => readAlt);
  const madameAlt = await client.get(true, false)

  expect(madameAlt.pageUrl)
  .toBe('http://dites.bonjourmadame.fr/post/180614007817/madame-jeudi-amour-pour-la-vie')
  expect(madameAlt.title).toBe('Madame Jeudi, amour pour la vie.')
  expect(madameAlt.imgUrl)
  .toBe('https://66.media.tumblr.com/4bca54566c2863d049dbd772481462b5/tumblr_piwhqsg3rw1v1wvcuo1_500.jpg')
});

test('Get random madame', async () => {
  // STUB
  (helper.request as any) = jest.fn(() => read);

  const client = new BonjourMadameClient()
  let madame = await client.get(false, false)

  expect(madame.title).toBe('Sur votre mardi, les ombres du bonheur…')
  expect(madame.today).toBe(false)
  expect(madame.imgUrl)
    .toBe('https://66.media.tumblr.com/5600f009699dfce47a6b88efaf9d81ba/tumblr_pisovqadzw1v1wvcuo1_1280.jpg')
  expect(madame.pageSource).toBeUndefined()

    // Get source
  madame = await client.get(true, true)
  expect(madame.pageSource).toBeDefined();

  // STUB
  (helper.request as any) = jest.fn(() => readAlt);
  const madameAlt = await client.get(true, false)

  expect(madameAlt.title).toBe('Madame Jeudi, amour pour la vie.')
  expect(madameAlt.imgUrl)
  .toBe('https://66.media.tumblr.com/4bca54566c2863d049dbd772481462b5/tumblr_piwhqsg3rw1v1wvcuo1_500.jpg')
});
