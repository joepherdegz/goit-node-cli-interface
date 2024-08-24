import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.join("db", "contacts.json");
console.log(contactsPath);

const listContacts = async () => {
    try {
        const contacts = await fs.readFile(contactsPath);
        return JSON.parse(contacts);
    } catch (error) {
        console.error("Error reading contacts:", error.message);
    }
};

const getContactById = async (contactId) => {
    try {
        const contacts = await listContacts();
        const result = contacts.find((contact) => contact.id === contactId);
        return result || null;
    } catch (error) {
        console.error("Error reading contacts by id:", error.message);
    }
};

const removeContact = async (contactId) => {
    try {
        const contacts = await listContacts();
        // const index = contacts.findIndex((item) => item.id === contactId);
        // if (index === -1) {
        //     return null;
        // }
        const updatedContacts = contacts.filter((contact) => contact.id !== contactId );
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
        return updatedContacts;
    } catch (error) {
        console.error("Error removing contact:", error.message);
    }
};

const addContact = async ({ name, email, phone }) => {
    try {
        const contacts = await listContacts();
        const newContact = {
            id: nanoid(),
            name,
            email,
            phone,
        };
        // const allContacts = [...contacts, newContact];
        contacts.push(newContact)
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
        return newContact;
    } catch (error) {
        console.error("Error adding contact:", error.message);
    }
};

export { listContacts, getContactById, removeContact, addContact };