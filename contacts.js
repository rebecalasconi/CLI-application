const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
    try {
        const data = await fs.readFile(contactsPath, "utf8");
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading contacts file:", error.message);
        return [];
    }
}
async function getContactById(contactId) {
    const contacts = await listContacts();
    const contact = contacts.find(contact => {
        return contact.id === String(contactId);
    }) || null;
    return contact;
}


async function removeContact(contactId) { // Corectare: Singular la "Contact"
    const contacts = await listContacts();
    const updatedContacts = contacts.filter(contact => contact.id !== String(contactId));
    console.log(`A fost sters contactul cu id=`, contactId)
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    return updatedContacts;
}

async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContact = { id: `${contacts.length + 1}`, name, email, phone };
    contacts.push(newContact);
    console.log(`A fost adaugat contactul cu urmatoarele date:`, name, email, phone);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
