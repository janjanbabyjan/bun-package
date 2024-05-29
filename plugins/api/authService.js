const baseApiUrl = useRuntimeConfig().public.apiBase
// import axios from 'axios';
import axios from 'axios';


const getLogin = async ( data) => {

    const token = localStorage.getItem('token')
    let headers = {
      "Content-Type": "application/json; charset=utf-8",
    //   Authorization: `Bearer ${token}`,
    }

      let res = await fetch(`${baseApiUrl}/login`,{
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
      });

      console.log("🚀 ~ getLogin ~ res:", res)
      const jsonData = await res.json();
      console.log("🚀 ~ getLogin ~ jsonData:", jsonData)
      return jsonData;
}

const createNewMenu = async (menuName, pathMenu, isActive, parentId) => {
  try {
    const response = await axios.post(`${baseApiUrl}/manage-menu`, {
      menuName,
      pathMenu,
      isActive,
      parentId,
      icons: null,
    });

    console.log('Menu created:', response.data);
    // ดำเนินการต่อตามต้องการ เช่น แสดงข้อความ "เมนูถูกสร้างเรียบร้อยแล้ว"
  } catch (error) {
    console.error('Error creating menu:', error);
    // ดำเนินการต่อตามต้องการ เช่น แสดงข้อความแจ้งเตือนผู้ใช้เกี่ยวกับข้อผิดพลาด
  }
};

const updateMenu = async (id, updatedMenuData) => {
  try {
    const response = await axios.post(`${baseApiUrl}/manage-menu/${id}`, updatedMenuData);
    return response.data;
  } catch (error) {
    console.error('Error updating menu:', error);
    throw error;
  }
};

const deleteMenu = async (id) => {
  try {
    const response = await axios.delete(`${baseApiUrl}/manage-menu/${id}`);
    console.log('Deleted menu:', response.data);
    // location.reload(); //reหน้า
    getAllManageMenus(); // เรียกใช้ function ในการดึงข้อมูลเมนูอัตโนมัติหลังจากลบเมนู
  } catch (error) {
    console.error('Error deleting menu:', error);
  }
};
const getAllManageMenus = async () => {
  try {
    let res = await fetch(`${baseApiUrl}/manage-menu`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const jsonData = await res.json();
    return jsonData;
  } catch (error) {
    console.error("Error fetching manage menus:", error);
    throw error;
  }
};
const createSinglePage = async (data) => {
  try {
      const token = localStorage.getItem('token')
      let headers = {
          "Content-Type": "application/json; charset=utf-8",
          // Authorization: `Bearer ${token}`,
      }

      let res = await fetch(`${baseApiUrl}/admin/content/article/add`, {
          method: "POST",
          headers: headers,
          body: JSON.stringify(data)
      });

      if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const jsonData = await res.json();
      console.log("🚀 ~ createSinglePage ~ jsonData:", jsonData);
      return jsonData;
  } catch (error) {
      console.error("Error creating single page:", error);
      throw error;
  }
};
const getAllPageTypes = async () => {
  try {
    const response = await axios.get(`${baseApiUrl}/pagetype`);
    return response.data;
  } catch (error) {
    console.error('Error fetching page types:', error);
    throw error;
  }
};
const getAllSinglePages = async () => {
  try {
    const response = await axios.get(`${baseApiUrl}/singlepage?_expand=type`);
    return response.data;
  } catch (error) {
    console.error('Error fetching single pages:', error);
    throw error;
  }
};

const getPageTypeById = async (id) => {
  try {
    const response = await axios.get(`${baseApiUrl}/pagetype/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching page type by ID:', error);
    throw error;
  }
};
const updateSinglePageById = async (id, updatedData) => {
  try {
    const response = await axios.post(`${baseApiUrl}/singlepage/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.log("🚀 ~ updateSinglePageById ~ error:", error);
    throw error;
  }
};
const getSinglePageById = async (id) => {
  try {
    const response = await axios.get(`${baseApiUrl}/singlepage/${id}?_expand=type`);
    return response.data;
  } catch (error) {
    console.error('Error fetching single page by ID:', error);
    throw error;
  }
};



export { getLogin, getAllManageMenus,createNewMenu,updateMenu,deleteMenu,createSinglePage ,getAllPageTypes,getAllSinglePages,updateSinglePageById,getPageTypeById,getSinglePageById,};