import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
});

api.interceptors.request.use((config)=>{
    const token=localStorage.getItem("access")
    if (token){
        config.headers.Authorization=`Bearer ${token}`;
    }
    return config;

});
api.interceptors.response.use(
    (response) => response,

    async (error) => {

        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {

            originalRequest._retry = true;
            const refresh = localStorage.getItem("refresh");
            console.log("Trying refresh token:", refresh);

            if (!refresh) {
                return Promise.reject(error);
            }

            try {

                const response = await axios.post(
                    "http://127.0.0.1:8000/api/token/refresh/",
                    {
                        refresh: refresh
                    }
                );


                const newAccess = response.data.access;

                console.log("New access token:", newAccess);


                localStorage.setItem(
                    "access",
                    newAccess
                );


                originalRequest.headers.Authorization =
                    `Bearer ${newAccess}`;
                console.log("Retrying request with new access");    


                return api(originalRequest);


            } catch (refreshError) {

                console.log("Refresh failed");

                localStorage.removeItem("access");
                localStorage.removeItem("refresh");

                return Promise.reject(refreshError);
            }
        }


        return Promise.reject(error);
    }
);
export default api;