import axios from "axios";

const token = localStorage.getItem("accessTokenBookstore");
const base_url = "http://localhost:3000/api/v1/";
const bearer_token = {
  Authorization: `Bearer ${token}` // Replace YOUR_TOKEN_HERE with your actual token
};

export const login = async (data) => {
  try {
    const loginData = await axios.post(`${base_url + "users/login"}`, data);
    return loginData;
  } catch (error) {
    return error;
  }
};

export const googleLogin = async () => {
  try {
    const loginData = await axios.get(`${base_url + "users/auth/google"}`);
    return loginData;
  } catch (error) {
    return error;
  }
};

export const registerUser = async (data) => {
  try {
    const response = await axios.post(`${base_url + "users"}`, data);
    return response;
  } catch (error) {
    return error;
  }
};

export const registerDoctor = async (data) => {
  try {
    const response = await axios.post(`${base_url + "users/doctor"}`, data);
    return response;
  } catch (error) {
    return error;
  }
};

export const registerAdmin = async (data) => {
  try {
    const response = await axios.post(`${base_url + "users/admin"}`, data);
    return response;
  } catch (error) {
    return error;
  }
};

export const getDepartment = async () => {
  try {
    const response = await axios.get(`${base_url + "department"}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const hospitals = async () => {
    try {
      const response = await axios.get(`${base_url + "hospital"}`);
      return response.data;
    } catch (error) {
      return error;
    }
  };

  export const addHospital = async (data) => {
    try {
      const response = await axios.post(`${base_url + "hospital"}`, data);
      return response;
    } catch (error) {
      return error;
    }
  };

  export const addDepartment = async (data) => {
    try {
      const response = await axios.post(`${base_url + "department"}`, data);
      return response;
    } catch (error) {
      return error;
    }
  };

  export const getDocters = async () => {
    try {
      const response = await axios.get(`${base_url + "doctor"}`);
      return response.data;
    } catch (error) {
      return error;
    }
  };

  export const addDocters = async (data) => {
    console.log(bearer_token)
    try {
      const response = await axios.post(`${base_url + "doctor"}`, data, 
      {
        headers: bearer_token
    });
      return response;
    } catch (error) {
      return error;
    }
  };

  export const getDoctersData = async () => {
    try {
      const response = await axios.get(`${base_url + "doctor/get"}`,{ headers: bearer_token });
      return response.data;
    } catch (error) {
      return error;
    }
  };


  export const createDoctersData = async (data) => {
    try {
      const response = await axios.post(`${base_url + "doctor"}`, data , {headers: bearer_token}
      );
      return response;
    } catch (error) {
      return error;
    }
  };

  export const UpdateDoctersData = async (data) => {
    try {
      const response = await axios.put(`${base_url + "doctor/update"}`, data , {headers: bearer_token}
      );
      return response;
    } catch (error) {
      return error;
    }
  };


  export const getAppointements = async () => {
    try {
      const response = await axios.get(`${base_url + "appointment/appointments-by-doctor"}`,{ headers: bearer_token });
      return response.data;
    } catch (error) {
      return error;
    }
  };




