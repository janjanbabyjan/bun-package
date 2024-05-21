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

const createNewMenu = async (newMenuData) => {
  try {
    const response = await axios.post(`${baseApiUrl}/manage-menu`, newMenuData);
    console.log('Created new menu:', response.data);
    getAllManageMenus(); // เรียกใช้ function ในการดึงข้อมูลเมนูอัตโนมัติหลังจากสร้างเมนูใหม่
    closeDialog(); // ปิด Dialog หลังจากสร้างเมนูเสร็จ
  } catch (error) {
    console.error('Error creating new menu:', error);
  }
};

const updateMenu = async (id, updatedMenuData) => {
  try {
    const response = await axios.post(`${baseApiUrl}/manage-menu/${id}`, updatedMenuData);
    console.log('Updated menu:', response.data);
    fetchManageMenus(); // เรียกใช้ function ในการดึงข้อมูลเมนูอัตโนมัติหลังจากอัปเดตเมนู
  } catch (error) {
    console.error('Error updating menu:', error);
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

export { getLogin, getAllManageMenus,createNewMenu,updateMenu,deleteMenu,createSinglePage };