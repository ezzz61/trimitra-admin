import Api from "@/api/api";

export default {
  Get() {
    return Api().get("/settings/activeCalonSiswa");
  },
  Add(data) {
    return Api().post("/settings/activeCalonSiswa", data);
  }
};
