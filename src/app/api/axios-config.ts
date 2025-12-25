import type { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

import axios from "axios";
import toast from "react-hot-toast";

export const axiosApiInstance = axios.create();

// Define a type for the original request config to include the retry flag
type OriginalRequestConfig = AxiosRequestConfig & {
    _retry?: boolean;
};

// Global variable to manage the toast ID for retries (to prevent multiple toasts)
let networkErrorToastId: string | undefined;

axiosApiInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        // Dismiss the network error toast if the request was successful
        if (networkErrorToastId) {
            toast.dismiss(networkErrorToastId);
            networkErrorToastId = undefined;
        }
        return response;
    },
    async (error: AxiosError) => {
        // Cast the error config to the enhanced type
        const originalRequest = error.config as OriginalRequestConfig;

        if (!originalRequest) {
            return Promise.reject(error);
        }

        // --- Handle Network Errors (No Response) ---
        if (!error.response) {
            
            if (!originalRequest._retry) {
                originalRequest._retry = true;
                
                // Show a loading toast for the first retry attempt
                networkErrorToastId = toast.loading("Network error: Trying to reconnect...", { id: networkErrorToastId });
                
                return axiosApiInstance(originalRequest);
            }
            
            toast.error("Network connection failed. Please check your internet.", { 
                id: networkErrorToastId,
            });
            
            networkErrorToastId = undefined;
            return Promise.reject(error); 
        }

        const { status } = error.response;

        // Dismiss the network error toast if a response (even an error one) is received
        if (networkErrorToastId) {
            toast.dismiss(networkErrorToastId);
            networkErrorToastId = undefined;
        }

        // --- Handle HTTP Status Code Errors ---
        switch (status) {
            case 401:
                // Unauthorized
                toast.error("Unauthorized access! Please log in again.");
                // Optional: Force logout or redirect to login page here
                break;
            case 400:
                // Bad Request (Usually related to validation errors, handled locally by form errors)
                // We show a general warning here
                toast("Invalid request parameters.");
                break;
            case 403:
                // Forbidden
                toast.error("Access Forbidden. You do not have permission.");
                break;
            case 404:
                // Not Found
                toast.error("Resource not found.");
                break;
            case 500:
            case 503:
                // Internal Server Error / Service Unavailable
                if (!originalRequest._retry) {
                    originalRequest._retry = true;
                    // Show a warning toast for the first 5xx attempt
                    toast.loading("Server error: Trying to reconnect...");
                    return axiosApiInstance(originalRequest);
                }
                
                // Final 5xx error message
                toast.error("Internal Server Error. Please try again later.");
                break;
            default:
                // Catch all other error statuses
                if (status >= 500 && !originalRequest._retry) {
                     originalRequest._retry = true;
                     toast.loading("Server error: Trying to reconnect...");
                     return axiosApiInstance(originalRequest);
                }
                toast.error(`Error ${status}: An unexpected server error occurred.`);
                break;
        }

        return Promise.reject(error);
    },
);

export default axiosApiInstance;