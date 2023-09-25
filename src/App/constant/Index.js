// const serverUrl = "http://localhost:1337/api/";
const serverUrl = "https://strapi-146033-0.cloudclusters.net/api/";

export const Config = {
  secretPass: "XkhZG4fW2t2W",
  serverUrl: serverUrl,
  serverApiUrl: serverUrl + "api/",
  serverUrlProduct: serverUrl + "api/products",
  serverUrlMe: serverUrl + "api/me",
  serverUrlImages: serverUrl + "public/images/",
  serverUrlCategories: serverUrl + "api/categories?restaurant_id=1",
  serverUrlCategoryImages: serverUrl + "images/categories/",
  serverUrlProductImages: serverUrl + "public/images/products/",
  serverUrlUserImages: serverUrl + "public/images/users/",
  userDzFoodToken: "userDzfoodLoginToken",
  roleName: "role",
  email: "email",
  verificationCode: "verifiactionCode",

  userApiTokenName: "user-login-token",
  googleApiKey: "AIzaSyD4BUDTEpTPIuhhJ2MyQ4AiQ0u3CyFlWOo",

  // Used in whole app
  currency_symbol: "pk",
  currency: "PK",

  appName: "ISP",

  pushTokenName: "device-push-token",

  // Here add langues and then add transaltion file for languages
  languages: [
    { shortName: "en", icon: "", longName: "English" },
    { shortName: "da", icon: "", longName: "Danish" },
  ],
};