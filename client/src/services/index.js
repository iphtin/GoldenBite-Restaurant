const baseUrl = "https://goldenbite-restaurant-backend.onrender.com";

export const getItems = async (endpointUrl) => {
  try {
    const response = await fetch(`${baseUrl}/${endpointUrl}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Fetch error:", error.message);
    throw error;
  }
};

export const addItem = async (endpointUrl, itemData) => {
  try {
    const response = await fetch(`${baseUrl}/${endpointUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Fetch error:", error.message);
    throw error;
  }
};

export const updateItem = async (endpointUrl, itemId, itemData) => {
  try {
    const response = await fetch(`${baseUrl}/${endpointUrl}/${itemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Fetch error:", error.message);
    throw error;
  }
};

export const deleteItem = async (endpointUrl, itemId) => {
  try {
    const response = await fetch(`${baseUrl}/${endpointUrl}/${itemId}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Fetch error:", error.message);
    throw error;
  }
};

export const getCategories = async () => {
  return await getItems("categories");
};

export const getMenu = async () => {
  return await getItems("menu");
};

export const getBanners = async () => {
  return await getItems("banner");
};

export const getFoods = async () => {
  return await getItems("food");
};

export const getCustomers = async () => {
  return await getItems("user");
};

export const getSpecialDiscount = async () => {
  return await getItems("discounts");
};

export const getOrders = async () => {
  return await getItems("orders");
};
