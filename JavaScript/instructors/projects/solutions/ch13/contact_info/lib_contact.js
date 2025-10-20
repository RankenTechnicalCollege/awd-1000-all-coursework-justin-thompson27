import Dob from 'dob';

// public
export const clearContact = () => {
    sessionStorage.removeItem("contact");
};

export const saveContact = (contact) => {
    sessionStorage.contact = JSON.stringify(contact);
};

export const getContact = () => {
    let contact = JSON.parse(sessionStorage.contact ?? null);
    if (contact == null) {
        contact = {name:"", email:"", phone:"", zip:"", dob:""};
    }
    contact.dob = new Dob(contact.dob);
    return contact;
};

export const createContact = (name, email, phone, zip, dob) => {
    const contact = {name, email, phone, zip, dob};
    contact.dob = new Dob(contact.dob);
    return contact;;
};