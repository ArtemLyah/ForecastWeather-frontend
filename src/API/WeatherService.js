import axios from 'axios'

export class WeatherService {
  static async search(searchData) {
    const responce = await axios.get("http://localhost:8080/api/weather", {
      params : {
        ...searchData
      },
    });
    return responce.data;
  }

  static async create(createData, access_token) {
    const responce = await axios.post("http://localhost:8080/api/weather", createData, {
      headers: {
        "Content-Type": 'application/json; charset=utf-8',
        Authorization: `Bearer ${access_token}`
      }
    });
    return responce.data;
  }

  static async delete(weatherId, access_token) {
    const responce = await axios.delete("http://localhost:8080/api/weather/" + weatherId, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });
    return responce.data;
  }
}