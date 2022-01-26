import Api from "@/api/api";

export default {
  Get() {
    return Api().get("appointment/");
  },
  Add(data) {
    return Api().post("appointment/add", data);
  },
  Delete(id) {
    return Api().delete("appointment/" + id);
  },
  Detail(id) {
    return Api().get("appointment/" + id);
  },
  Update(id, data) {
    return Api().put("appointment/" + id, data);
  }
};
