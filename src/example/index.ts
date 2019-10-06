import { BonjourMadameClient } from "../index";
import * as moment from "moment";

const client = new BonjourMadameClient();

client
  .get()
  .then(today => {
    console.log(today);
    return client.get(false);
  })
  .then(withSource => {
    console.log(withSource);
    return client.getAtDate(
      moment()
        .subtract(2, "day")
        .toDate(),
      false
    );
  })
  .then(atDate => {
    console.log(atDate);
    return client.getAtDate(new Date(), false);
  })
  .then(now => {
    console.log(now);
    return client.getAtDate(moment('2018-12-09').toDate())
  })
  .catch(err => {
    console.error(err);
  });
