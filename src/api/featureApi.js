import Api from "@/api/api";

export default {
  Get() {
    return Api().get("feature/");
  },
  Add(data) {
    return Api().post("feature/add", data);
  },
  Delete(id) {
    return Api().delete("feature/" + id);
  },
  Detail(id) {
    return Api().get("feature/" + id);
  },
  Update(id, data) {
    return Api().put("feature/" + id, data);
  }
};
