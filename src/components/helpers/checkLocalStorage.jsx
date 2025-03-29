export const checkLocalStorage = () => {
    let productstoken = null;
  
    try {
      productstoken = JSON.parse(localStorage.getItem("productstoken"));
    } catch (error) {
      productstoken = null;
    }
  
    return productstoken;
  };