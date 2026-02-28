/**
 * Test function to verify image URL cleaning works correctly
 * This can be called from browser console to test the logic
 */

export function testImageUrlCleaning() {
  const testCases = [
    // Case 1: Malformed URL with token
    "1766170493_298096_naturalImage5.jpg/628|26AhoG7leefWHBITSl2Ns7K2byNcuke6H1XtVJ2R5a373e55",
    
    // Case 2: Clean filename
    "1766170493_298096_naturalImage5.jpg",
    
    // Case 3: Filename with path
    "/user/1766170493_298096_naturalImage5.jpg",
    
    // Case 4: Filename with query params
    "1766170493_298096_naturalImage5.jpg?v=123",
    
    // Case 5: Complex malformed case
    "/user/1766170493_298096_naturalImage5.jpg/token|abc123?v=456"
  ];

  const baseUrl = "https://gatewaysystem.net";
  
  console.log("=== Image URL Cleaning Test ===");
  
  testCases.forEach((testCase, index) => {
    // Apply the same cleaning logic as in components
    let cleanFilename = testCase;
    
    // Remove token parts (anything after |)
    if (cleanFilename.includes('|')) {
      cleanFilename = cleanFilename.split('|')[0];
    }
    
    // Remove path parts - get just the filename
    if (cleanFilename.includes('/')) {
      cleanFilename = cleanFilename.split('/').pop();
    }
    
    // Remove query parameters
    if (cleanFilename.includes('?')) {
      cleanFilename = cleanFilename.split('?')[0];
    }
    
    const finalUrl = `${baseUrl}/storage/user/${cleanFilename}`;
    
    console.log(`Test ${index + 1}:`);
    console.log(`  Input:  ${testCase}`);
    console.log(`  Clean:  ${cleanFilename}`);
    console.log(`  URL:    ${finalUrl}`);
    console.log('');
  });
  
  console.log("Expected result for all tests:");
  console.log("https://gatewaysystem.net/storage/user/1766170493_298096_naturalImage5.jpg");
}

// Make it available globally for testing
if (typeof window !== 'undefined') {
  window.testImageUrlCleaning = testImageUrlCleaning;
}