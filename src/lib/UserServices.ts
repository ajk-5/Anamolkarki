

export interface UserRegistrationData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    dob: string;
  }

var baseUrl = "https://localhost:7122";
  
  export async function registerUser(data: UserRegistrationData) {
    try {
      const response = await fetch(`${baseUrl}/api/UserRegistration`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': '*/*'
        },
        body: JSON.stringify(data)
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  }
  export interface UserLoginData {
    email: string;
    password: string;
  }
  
  export async function loginUser(data: UserLoginData): Promise<any> {
    try {
      const response = await fetch(`${baseUrl}/api/UserAuth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
        },
        credentials: "include", 
        body: JSON.stringify(data),
      });
  

      var resdata = await response;

      return resdata;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  }