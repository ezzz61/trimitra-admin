import Api from "@/api/api";

export default {
  Get() {
    return Api().get("banner/");
  },
  Add(data) {
    return Api().post("banner/add", data);
  },
  Delete(id) {
    return Api().delete("banner/" + id);
  },
  Detail(id) {
    return Api().get("banner/" + id);
  },
  Update(id, data) {
    return Api().put("banner/" + id, data);
  }
};
