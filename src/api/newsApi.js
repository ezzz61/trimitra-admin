import Api from "@/api/api";

export default {
  Get() {
    return Api().get("news/");
  },
  Add(data) {
    return Api().post("news/add", data);
  },
  Delete(id) {
    return Api().delete("news/" + id);
  },
  Detail(id) {
    return Api().get("news/" + id);
  },
  Update(id, data) {
    return Api().put("news/" + id, data);
  }
};
