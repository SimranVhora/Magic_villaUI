const APPLICATION_URL = 'http://localhost:7001/api';
const API_Version ="/v1";
export const ACCESS_TOKEN = 'ACCESS_TOKEN';
export const APPLICATION_Login_URL =  APPLICATION_URL + API_Version+ "/UserAuth/login";
export const APPLICATION_CheckUniqueUser_URL =  APPLICATION_URL+ API_Version + "/UserAuth/IsUniqueUser";
export const APPLICATION_RegisteUser_URL =  APPLICATION_URL+ API_Version + "/UserAuth/register";
export const Villas_URL = APPLICATION_URL + API_Version + "/VillaAPI";
export const Villas ={
  APPLICATION_GetVillas_URL :  APPLICATION_URL+ API_Version + "/VillaAPI",
  APPLICATION_CreateVillas_URL :  APPLICATION_URL+ API_Version + "/VillaAPI",
  APPLICATION_IsUniqueName_URL : Villas_URL +  "/IsUniqueName",
}
export const VillaNumbers_URL = APPLICATION_URL + "/VillaNumberAPI";
export const APPLICATION_VillaNumbersAPI ={
  APPLICATION_GetVillas_URL :  VillaNumbers_URL + "/IsUniqueNumber",
}


