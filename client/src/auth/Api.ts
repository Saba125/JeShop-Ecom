import axios from "axios";
import fetch from "./FetchInterceptor";

const Api = {
  async get(endPoint: string, params = {}) {
    try {
      const config = {
        url: endPoint, // no double "api"
        method: "get",
        params,
      };
      const res: any = await fetch(config);
      if (res?.canceled) return null;
      return res;
    } catch (error: any) {
      if (axios.isCancel?.(error)) return { canceled: true };
      return { success: false, message: error?.error || error?.message };
    }
  },

  async post(endPoint: string, data = {}) {
    try {
      const config: any = {
        url: endPoint,
        method: "post",
        data,
      };
      if (data instanceof FormData) delete config.headers;
      return await fetch(config);
    } catch (error: any) {
      return { success: false, message: error?.error || error?.message };
    }
  },

  async put(endPoint: string, data = {}) {
    try {
      const config: any = {
        url: endPoint,
        method: "put",
        data,
      };
      if (data instanceof FormData) delete config.headers;
      return await fetch(config);
    } catch (error: any) {
      return { success: false, message: error?.error || error?.message };
    }
  },

  async delete(endPoint: string, data: any) {
    try {
      const config = {
        url: endPoint,
        method: "delete",
        data,
      };
      return await fetch(config);
    } catch (error: any) {
      return { success: false, message: error?.error || error?.message };
    }
  },
};

export default Api;
