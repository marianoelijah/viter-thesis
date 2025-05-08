// src/utils/keywordToCategory.js

const keywordToCategory = {
    fruits: "Fruits",
    fruit: "Fruits",
    prutas: "Fruits",
    gulay: "Vegetables",
    vegetables: "Vegetables",
    vegetable: "Vegetables",
    rootcrop: "Root Crop",
    spice: "Spice",
    grain: "Grain",
  };
  
  // Converts a user keyword to a valid category (if matched)
export function mapKeywordToCategory(keyword) {
    if (!keyword) return null;
    const key = keyword.trim().toLowerCase();
    return keywordToCategory[key] || null;
  }
  
  export default keywordToCategory;
  