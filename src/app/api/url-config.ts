type EnvironmentT = "develop" | "production";

// Retrieve environment variable
const environment: EnvironmentT =
  (process.env.NEXT_PUBLIC_ENVIRONMENT as EnvironmentT) || "develop";

// Base URL based on environment
export const baseUrl: string =
  environment === "production"
    ? "https://api.coinmarketcap.com"
    : "https://api.coinmarketcap.com";

export const mainList = `${baseUrl}/data-api/v3/cryptocurrency/listing`