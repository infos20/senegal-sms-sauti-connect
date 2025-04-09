
/**
 * Validates a Senegalese phone number
 * Valid formats: +221XXXXXXXXX, 221XXXXXXXXX, or local 7XXXXXXXX format
 */
export const validateSenegalesePhone = (phoneNumber: string): boolean => {
  // Remove any non-digit characters except the + sign
  const cleaned = phoneNumber.replace(/[^\d+]/g, "");
  
  // Formats:
  // 1. International with +: +221XXXXXXXXX (12 chars)
  // 2. International without +: 221XXXXXXXXX (11 chars)
  // 3. Local: 7XXXXXXXX (9 chars) - Senegal mobile numbers start with 7
  
  // Check for international format with country code
  if (cleaned.startsWith("+221") && cleaned.length === 13) {
    return cleaned.charAt(4) === "7"; // Ensure it's a mobile number
  }
  
  // Check for international format without +
  if (cleaned.startsWith("221") && cleaned.length === 12) {
    return cleaned.charAt(3) === "7"; // Ensure it's a mobile number
  }
  
  // Check for local format (Senegal mobile numbers start with 7)
  if (cleaned.startsWith("7") && cleaned.length === 9) {
    return true;
  }
  
  return false;
};

/**
 * Formats a phone number to the standardized Senegalese format
 */
export const formatSenegalesePhone = (phoneNumber: string): string => {
  // Remove any non-digit characters except the + sign
  const cleaned = phoneNumber.replace(/[^\d+]/g, "");
  
  // If it's already in international format with +, return as is
  if (cleaned.startsWith("+221") && cleaned.length === 13) {
    return cleaned;
  }
  
  // If it's in international format without +, add it
  if (cleaned.startsWith("221") && cleaned.length === 12) {
    return "+" + cleaned;
  }
  
  // If it's in local format, convert to international
  if (cleaned.startsWith("7") && cleaned.length === 9) {
    return "+221" + cleaned;
  }
  
  // If invalid, return original
  return phoneNumber;
};
