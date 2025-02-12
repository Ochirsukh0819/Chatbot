const MESSAGES = {
  CONFIRMATION: {
    DELETE: (value: string = "") => `Are you sure you want to delete ${value || "this item"}?`,
  },
  SUCCESS: {
    SAVED: (value: string = "") => `Successfully saved ${value || "the item"}.`,
    DELETED: (value: string = "") => `Successfully deleted ${value || "the item"}.`,
    ADDED: (value: string = "") => `Successfully added ${value || "the item"}.`,
    UPDATED: (value: string = "") => `Successfully updated ${value || "the item"}.`,
  },
  WARNING: {
    MISSING_REQUIRED_FIELDS: "Please fill required fields.",
  },
  ERROR: {
    SAVE_FAILED: (value: string = "") => `Failed to save ${value || "the item"}. Please try again.`,
    DELETE_FAILED: (value: string = "") => `Failed to delete ${value || "the item"}. Please try again.`,
    UNKNOWN_FAILED: (value: string = "") => `Error ${value || ""}. Something went wrong.`,
    AUTH_FAILED: "Authentication failed. Please log in.",
    FORBIDDEN: "You do not have permission to perform this action.",
    SERVER_ERROR: "An unexpected error occurred on the server. Please try again later.",
    LOADING_FAILED: "Error loading data. Please try again.",
    UNEXPECTED_RESPONSE: "Unexpected response structure",
    FETCH_FAILED: "Error fetching project:",
  },
  INFO: {
    COPIED_TO_CLIPBOARD: "The link has been copied to your clipboard.",
  },
  GENERAL: {
    NO_DATA: "No data available.",
  },
}

export default MESSAGES
