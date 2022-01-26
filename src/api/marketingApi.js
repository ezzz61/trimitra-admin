import Api from "@/api/api";

export default {
  Get() {
    return Api().get("marketing/");
  },
  Add(data) {
    return Api().post("marketing/add", data);
  },
  Delete(id) {
    return Api().delete("marketing/" + id);
  },
  Detail(id) {
    return Api().get("marketing/" + id);
  },
  Update(id, data) {
    return Api().put("marketing/" + id, data);
  }
};
