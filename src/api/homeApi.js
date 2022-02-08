import Api from "@/api/api";

export default {
  Get() {
    return Api().get("home/");
  },
  Add(data) {
    return Api().post("home/add", data);
  },
  Delete(id) {
    return Api().delete("home/" + id);
  },
  Detail(id) {
    return Api().get("home/" + id);
  },
  Update(id, data) {
    return Api().put("home/" + id, data);
  }
};
