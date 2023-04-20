import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Perks from "./Perks";
import { useUserContext } from "../../Hooks/useUserContext";

function Places() {
  const { action } = useParams();
  const { user } = useUserContext();

  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [uploadLink, setUploadLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    console.log("TT DATA - ", user);
  }, []);

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }

  function inputDescription(heading) {
    return <p className="text-gray-500 text-sm">{heading}</p>;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function addPhotoByLink(e) {
    e.preventDefault();

    const { data } = await axios.post(
      "http://127.0.0.1:4000/api/user/upload-by-link",
      {
        link: uploadLink,
      }
    );
    const fileName = data.data;
    setAddedPhotos((prev) => {
      return [...prev, fileName];
    });

    setUploadLink("");
  }

  function uploadPhoto(ev) {
    const files = ev.target.files;
    const data = new FormData();

    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }

    axios
      .post("http://127.0.0.1:4000/api/user/upload-by-device", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        const { data: filenames } = response;
        setAddedPhotos((prev) => {
          return [...prev, ...filenames];
        });

        console.log("RESPONSE - ", response);
      });
  }

  async function addNewPlace(ev) {
    ev.preventDefault();

    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };
    const token = user.token;

    await axios.post("http://127.0.0.1:4000/api/base/add-places", placeData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setRedirect("/account/places");
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      {action !== "new" && (
        <Link
          className="inline-flex gap-2 bg-primary rounded-full text-white py-2 px-4"
          to={"/account/places/new"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Add new place
        </Link>
      )}

      {action === "new" && (
        <div>
          <form
            className="flex flex-col gap-2 border p-4 mb-8 rounded-2xl"
            onSubmit={addNewPlace}
          >
            <div>
              {preInput(
                "Title",
                "Title for your place. should be short and catchy as in advertisement"
              )}
              <input
                type="text"
                value={title}
                className="border block grow-[2]"
                onChange={(ev) => setTitle(ev.target.value)}
                placeholder="title, for example: My lovely apt "
              />
            </div>
            <div>
              {preInput("Address", "Address to this place")}
              <input
                className="border block grow-[2]"
                value={address}
                type="text"
                onChange={(ev) => setAddress(ev.target.value)}
                placeholder="address"
              />
            </div>
            <div>
              {preInput("Photos", "more = better")}
              <div className="flex justify-around gap-4">
                <input
                  type="text"
                  className="border inline-block"
                  value={uploadLink}
                  onChange={(e) => setUploadLink(e.target.value)}
                  placeholder={"Add using a link .....jpg"}
                />
                <button
                  onClick={addPhotoByLink}
                  className="inline-block bg-gray-200 w-1/6 px-4 rounded-2xl"
                >
                  Add photo
                </button>
              </div>
              <div className="mt-2 grid gap-4 grid-cols-3 md:grid-cols:4 lg:grid-cols-6">
                {addedPhotos.length > 0 &&
                  addedPhotos.map((link) => (
                    <div
                      className="h-[20vw] sm:h-[15vw] w-full flex"
                      key={link}
                    >
                      <img
                        className="rounded-2xl object-cover  w-full"
                        src={"http://127.0.0.1:4000/uploads/" + link}
                        alt=""
                      />
                    </div>
                  ))}
                <label className="flex gap-2 justify-center items-center cursor-pointer border h-[20vw] sm:h-[15vw] rounded-2xl p-4 bg-transparent text-2xl text-gray-600">
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    onChange={uploadPhoto}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
                    />
                  </svg>
                  Upload
                </label>
              </div>
            </div>
            <div>
              {preInput("Description", "description of the place")}
              <textarea
                className="border block grow-[2]"
                value={description}
                type="text"
                onChange={(ev) => setDescription(ev.target.value)}
                placeholder="Description"
              />
            </div>
            <div>
              {preInput("Perks", "select all the perks of your place")}
              <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                <Perks selected={perks} onChange={setPerks} />
              </div>
            </div>
            <div>
              {preInput("Extra info", "house rules, etc")}
              <textarea
                className="border block grow-[2]"
                value={extraInfo}
                type="text"
                onChange={(ev) => setExtraInfo(ev.target.value)}
                placeholder="Extra info"
              />
            </div>
            <div>
              {preInput(
                "Check in&out times",
                "add check in and out times, remember to have some time window for cleaning the room between guests"
              )}
              <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
                <div>
                  <h3 className="mt-2 -mb-1">Check in time</h3>

                  <input
                    type="text"
                    value={checkIn}
                    onChange={(ev) => setCheckIn(ev.target.value)}
                    placeholder="14"
                  />
                </div>
                <div>
                  <h3 className="mt-2 -mb-1">Check out time</h3>
                  <input
                    type="text"
                    value={checkOut}
                    onChange={(ev) => setCheckOut(ev.target.value)}
                    placeholder="11"
                  />
                </div>
                <div>
                  <h3 className="mt-2 -mb-1">Max number of guests</h3>
                  <input
                    type="number"
                    value={maxGuests}
                    onChange={(ev) => setMaxGuests(ev.target.value)}
                  />
                </div>
                <div>
                  <h3 className="mt-2 -mb-1">Price per night</h3>
                  <input
                    type="number"
                    value={price}
                    onChange={(ev) => setPrice(ev.target.value)}
                  />
                </div>
              </div>
            </div>
            <button className="primary my-4">Save</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Places;
