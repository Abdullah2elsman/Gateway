/**
 * Helper function to construct user image URLs from public storage
 * Images are stored in storage/app/public/user/ and accessible via /storage/user/
 * 
 * @param {string} imagePath - The image filename from database (user_image meta value)
 * @param {string} baseUrl - The base API URL (VITE_API_URL_image)
 * @returns {string} - Complete image URL
 */
export const getUserImageUrl = (imagePath, baseUrl) => {
  if (!imagePath) {
    return null;
  }

  // Images are now in public storage, accessible via /storage/user/{filename}
  return `${baseUrl}/storage/user/${imagePath}`;
};

/**
 * Helper function to get user image URL or fallback to default
 * 
 * @param {string} imagePath - The image filename from database
 * @param {string} baseUrl - The base API URL
 * @param {string} defaultImage - Default/fallback image
 * @returns {string} - Image URL or default
 */
export const getUserImageUrlOrDefault = (imagePath, baseUrl, defaultImage) => {
  if (!imagePath) {
    return defaultImage;
  }
  
  return getUserImageUrl(imagePath, baseUrl);
};
