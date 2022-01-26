import Api from "@/api/api";

export default {
  Get() {
    return Api().get("overview/");
  },
  GetUrl() {
    return Api().get("url/");
  },
  SaveUrl(data) {
    return Api().post("url/", data);
  }
};
