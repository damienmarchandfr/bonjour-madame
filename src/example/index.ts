import { BonjourMadameClient } from "../index";

const client = new BonjourMadameClient();

client
  .get()
  .then(today => {
    console.log(today);
    return client.get(false);
  })
  .then(withSource => {
    console.log(withSource);
  })
  .catch(err => {
    console.error(err);
  });
