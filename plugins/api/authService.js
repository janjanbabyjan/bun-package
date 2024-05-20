const baseApiUrl = useRuntimeConfig().public.apiBase
// import axios from 'axios';

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
}
export {getLogin,createSinglePage }


