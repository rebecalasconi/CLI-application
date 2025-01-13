const contacts = require("./contacts");

// async function testContacts() {
//     console.log(await contacts.listContacts());
//     console.log(await contacts.getContactById("1"));
//     console.log(await contacts.addContact("Rebeca Lasconi", "rebeca@yahoo.com", "0740080090"));
//     console.log(await contacts.removeContact("1"));
// }

// testContacts();


const argv = require("yargs").argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      console.table(await contacts.listContacts());
      break;

    case "get":
      const contact = await contacts.getContactById(id);
        if (contact) {
            console.table([contact]); // Afișează contactul specific
        } else {
            console.warn(`Contact with id=${id} not found.`);
        }
      break;

    case "add":
      console.table(await contacts.addContact(name, email, phone));
      break;

    case "remove":
      console.table(await contacts.removeContact(id));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);