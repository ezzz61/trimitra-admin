import Api from "@/api/api";

export default {
  Get() {
    return Api().get("product/");
  },
  Add(data) {
    return Api().post("product/add", data);
  },
  Delete(id) {
    return Api().delete("product/" + id);
  },
  Detail(id) {
    return Api().get("product/" + id);
  },
  Update(id, data) {
    return Api().put("product/" + id, data);
  }
};
