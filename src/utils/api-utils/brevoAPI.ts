import axios from "axios";

/* ------------------------------------|| Brevo API ||------------------------------------ */


const API_BASE_URL = "https://api.brevo.com/v3";
const API_KEY = process.env.BREVO_API_KEY;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "api-key": API_KEY,
  },
});

const getContacts = async (params: any = {}): Promise<any> => {
  try {
    const response = await axiosInstance.get("/contacts", { params });

    if (response) {
    }

    return { success: true, data: response.data.contacts };
  } catch (err) {
    return { success: false, error: err };
  }
};

const createContact = async (contact: any): Promise<any> => {
  try {
    await axiosInstance.post("/contacts", contact);
    return { success: true, contact };
  } catch (err) {
    return { success: false, error: err };
  }
};

const updateContact = async (id: any, contact: any): Promise<any> => {
  try {
    await axiosInstance.put(`/contacts/${id}`, contact);
    return { success: true, contact };
  } catch (err) {
    return { success: false, error: err };
  }
};

const addContactToMailingList = async (contactData: any): Promise<any> => {
  try {
    const contactsResponse = await getContacts();
    if (!contactsResponse.success) {
      throw new Error("Failed to load contacts.");
    }
    const contacts = contactsResponse.data;

    const foundContact = contacts.find(
      (contact: any) => contact.email === contactData.email
    );

    const updatedData = {
      ...foundContact,
      emailBlacklisted: false, // Ensuring emailBlacklisted is set to false
    };

    if (foundContact) {
      return await updateContact(
        foundContact.id || foundContact.email,
        updatedData
      );
    } else {
      return await createContact(contactData);
    }
  } catch (err) {
    return { success: false, error: err };
  }
};

export { getContacts, createContact, updateContact, addContactToMailingList }