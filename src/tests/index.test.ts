import * as helper from '../helpers'
import * as fs from 'fs'
import {promisify} from 'util'
import {BonjourMadameClient} from '../index'

const fsReadFile = promisify(fs.readFile)

const read = fsReadFile(__dirname + '/page.html').then((buffer) => buffer.toString('utf-8'))

test('Get today madame', async () => {
   // STUB
  (helper.request as any) = jest.fn(() => read);

  const client = new BonjourMadameClient()
  let madame = await client.get(false)
  expect(madame.pageUrl)
  .toBe('http://www.bonjourmadame.fr')
  expect(madame.title).toBe('Madame Mercredi compte jusqu’à deux.')
  expect(madame.imgUrl)
    .toBe('https://i0.wp.com/bonjourmadame.fr/wp-content/uploads/2019/10/191002.jpg')
  expect(madame.pageSource).toBeUndefined()
});
