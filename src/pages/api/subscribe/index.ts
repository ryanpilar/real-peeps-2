/**
 * API Route: Add or Update a Contact in the Mailing List
 *
 * This API route handles form submissions for adding a contact to the mailing list.
 * It accepts POST requests with contact data (including email and name) in the body.
 * Based on the provided email, it either adds a new contact to the mailing list
 * or updates an existing one.
 *
 * Request Body:
 * - email (required): The email address of the contact.
 * - name (required): The name of the contact.
 * - other fields: Additional contact information as needed.
 *
 * Responses:
 * - 201 Created: Contact was successfully added or updated.
 * - 400 Bad Request: Missing required fields (name or email).
 * - 405 Method Not Allowed: The request method is not supported by the route.
 * - 500 Internal Server Error: An error occurred during the operation.
 */

import type { NextApiRequest, NextApiResponse } from "next";
import { addContactToMailingList } from "src/pages/api-utils/brevoAPI";

interface ApiResponse {
  message?: string;
  error?: string;
}
interface ContactData {
  email: string;
  name: string;
  [key: string]: any; // For additional contact information fields
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== "POST") {
    return res.status(405).end(`Method Not Allowed`);
  }

  const { email, name } = req.body as ContactData;

  // Constructing contactData with proper typing
  const contactData: ContactData = { email, name };

  if (!email || !name) {
    res.status(400).json({ error: "Missing name or email" });
    return;
  }

  try {
    // Use the utility function to add or update the contact in the mailing list
    const result = await addContactToMailingList(contactData);

    if (result.success) {
      res.status(201).json({ message: "Contact added to our mailing list" });
    } else {
      // Handle case where addContactToMailingList returns a failure without throwing an error
      throw new Error(
        (result.error as any)?.message || "Failed to process contact"
      );
    }
  } catch (error) {
    console.error("Operation failed:", error);
    res.status(500).json({
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
}
