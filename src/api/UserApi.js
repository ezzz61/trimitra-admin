import Api from "@/api/api";

export default {
  Login(param) {
    return Api().post("user/login", param);
  },
  Cadidate(param) {
    return Api().get("candidate?event_id=" + param);
  },
  Get() {
    return Api().get("/user");
  },
  Detail(data) {
    return Api().get("/user/details/" + data);
  },
  CandidateDetail(data) {
    return Api().get("/candidate/" + data);
  },
  Update(id, data) {
    return Api().put("/user/" + id, data);
  },
  Role(data) {
    return Api().get("/user/role/");
  },
  AddCandidate(data) {
    return Api().post("/candidate", data);
  },
  UpdateCandidate(id, data) {
    return Api().put("/candidate/" + id, data);
  },
  AddUser(data) {
    return Api().post("/user/add", data);
  },
  Delete(id) {
    return Api().delete("/user/" + id);
  },
  Upload(id, data, source) {
    return Api().post("user/upload/" + id + "?source=" + source, data);
  }
};
