import {
    listContacts,
    getContactById,
    removeContact,
    addContact,
} from "./contacts.js";

import { Command } from "commander";

const program = new Command();

program
    .option("-a, --action <type>", "choose action")
    .option("-i, --id <type>", "user id")
    .option("-n, --name <type>", "user name")
    .option("-e, --email <type>", "user email")
    .option("-p --phone <type>", "user phone");
        
program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case "list":
            const contacts = await listContacts();
            console.table(contacts);
            break;
        
        case "get":
            const contact = await getContactById(id);
            if (contact) {
                console.log(contact);
            } else {
                console.log(`Contact with id ${id} not found`);
            }
            break;
        
        case "add":
            if (name && email && phone) {
                const newContact = await addContact({ name, email, phone });
                console.log("Added new contact:", newContact);
            } else {
                console.log("Please provide name, email, and phone to add a contact.");
            }
            break;
        
        case "remove":
            const updatedContacts = await removeContact(id);
            console.log(`Removed contact with id ${id}. \n Updated contact list:`);
            console.table(updatedContacts);
            break;
        
        default:
            console.warn("\x1B[31m Unknown action type!");
    }
}
invokeAction(argv);