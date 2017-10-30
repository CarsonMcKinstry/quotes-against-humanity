import axios from "axios";

const getCards = () => {
  return axios.get("/api/build");
};

export { getCards };
