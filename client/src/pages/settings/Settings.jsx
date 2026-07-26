import { useEffect, useState } from "react";
import {
  getSettings,
  updateSettings,
} from "../../api/settingsApi";

function Settings() {

  const [settings, setSettings] = useState({
    shop_name: "",
    owner_name: "",
    phone: "",
    email: "",
    address: "",
    currency: "",
    tax: "",
    logo: "",
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const res = await getSettings();
      setSettings(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    setSettings({
      ...settings,
      logo: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const formData = new FormData();

      formData.append("shop_name", settings.shop_name);
      formData.append("owner_name", settings.owner_name);
      formData.append("phone", settings.phone);
      formData.append("email", settings.email);
      formData.append("address", settings.address);
      formData.append("currency", settings.currency);
      formData.append("tax", settings.tax);

      if (settings.logo instanceof File) {
        formData.append("logo", settings.logo);
      }

      await updateSettings(formData);

      alert("Settings Updated Successfully");

      loadSettings();

    } catch (error) {

      console.log(error);

      alert("Update Failed");

    }

  };

  return (

    <div className="container mt-4">

      <div className="card shadow">

        <div className="card-header bg-primary text-white">
          <h3>Shop Settings</h3>
        </div>

        <div className="card-body">

          <form onSubmit={handleSubmit}>

            <div className="row">

              <div className="col-md-6 mb-3">
                <label>Shop Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="shop_name"
                  value={settings.shop_name || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Owner Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="owner_name"
                  value={settings.owner_name || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Phone</label>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  value={settings.phone || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={settings.email || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Currency</label>
                <input
                  type="text"
                  className="form-control"
                  name="currency"
                  value={settings.currency || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Tax (%)</label>
                <input
                  type="number"
                  className="form-control"
                  name="tax"
                  value={settings.tax || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-12 mb-3">
                <label>Address</label>
                <textarea
                  rows="3"
                  className="form-control"
                  name="address"
                  value={settings.address || ""}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="col-md-12 mb-3">
                <label>Shop Logo</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={handleImage}
                />
              </div>

              <div className="col-md-12">
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Save Settings
                </button>
              </div>

            </div>

          </form>

        </div>

      </div>

    </div>

  );

}

export default Settings;