import { useState } from "react";
import axios from "axios";

/* ------------------------------------|| useBrevo - HOOK ||------------------------------------ */

const API_BASE_URL = "https://api.brevo.com/v3";
const API_KEY = process.env.NEXT_PUBLIC_BREVO_API_KEY;

export function useBrevo() {
  const [loading, setLoading] = useState<any>(false);
  const [error, setError] = useState<any>(null);
  const [contacts, setContacts] = useState<any>(null);

  const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
      "api-key": API_KEY,
    },
  });

  const getContacts = async (params?: any): Promise<any> => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/contacts", { params });
      setLoading(false);
      setContacts(response.data.contacts); // Assuming the API returns an object with a contacts array
      return response.data.contacts;
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const createContact = async (contact: any) => {
    setLoading(true);
    try {
      await axiosInstance.post("/contacts", contact);
      setLoading(false);
      return contact;
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const updateContact = async (identifier: string, contact: any) => {
    setLoading(true);
    try {
      await axiosInstance.put(`/contacts/${identifier}`, contact);
      setLoading(false);
      return contact;
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const reset = () => {
    setLoading(false);
    setError(null);
    setContacts(null);
  };

  const addContactToMailingList = async (contactData: any) => {
    setLoading(true);

    try {
      if (!contacts) {
        await getContacts(); // This should set contacts or throw an error if it fails
      }
      const foundContact = contacts?.find(
        (contact: any) => contact.email === contactData.email
      );

      if (foundContact) {
        await updateContact(
          foundContact.identifier || foundContact.email,
          contactData
        );
      } else {
        await createContact(contactData);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("An unexpected error occurred")
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    createContact,
    getContacts,
    updateContact,
    loading,
    error,
    contacts,
    reset,
    addContactToMailingList,
  };
}
