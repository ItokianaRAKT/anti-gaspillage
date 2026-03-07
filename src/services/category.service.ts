import api from "../api/axios";

const getCategories = async (): Promise<{id_category: string, name_category: string}[]> => {
    const response = await api.get("/categories/");
    return response.data;
};

export { getCategories };
