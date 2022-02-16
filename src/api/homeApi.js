import Api from "@/api/api";

export default {
  Get() {
    return Api().get("home/");
  },
  GetUrl() {
    return Api().get("home/url");
  },
  Add(data) {
    return Api().post("home/add", data);
  },
  AddUrl(data) {
    return Api().post("home/url/add", data);
  },
  Delete(id) {
    return Api().delete("home/" + id);
  },
  Detail(id) {
    return Api().get("home/" + id);
  },
  Update(id, data) {
    return Api().put("home/" + id, data);
  },
  UpdateUrl(id, data) {
    return Api().put("home/url/" + id, data);
  }
};
