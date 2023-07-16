import React, { useState, useEffect, useRef } from "react";
import Thread from "../components/Thread";
import {
  storage,
  database,
  DEV_DB_ID,
  COLLECTION_ID_THREADS,
  BUCKET_ID_IMAGES,
} from "../appwriteConfig";
import { Query, ID } from "appwrite";
import { Image } from "react-feather";

const Feed = () => {
  const [threads, setThreads] = useState([]);
  const [threadBody, setThreadBody] = useState("");
  const [threadImage, setThreadImage] = useState(null);
  const fileRef = useRef(null);

  useEffect(() => {
    getThreads();
  }, []);

  const getThreads = async () => {
    const response = await database.listDocuments(
      DEV_DB_ID,
      COLLECTION_ID_THREADS,
      [Query.orderDesc("$createdAt")]
    );
    setThreads(response.documents);
  };

  const handleThreadSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      owner_id: "64b0f803f2f39b57a7ba",
      body: threadBody,
      image: threadImage,
    };
    const response = await database.createDocument(
      DEV_DB_ID,
      COLLECTION_ID_THREADS,
      ID.unique(),
      payload
    );
    console.log(response);
    setThreads((prevState) => [response, ...prevState]);
    setThreadBody("");
    setThreadImage(null);
  };

  const handleClick = async (e) => {
    fileRef.current.click();
  };
  const handleFileChange = async (e) => {
    const fileObj = e.target.files && e.target.files[0];

    if (!fileObj) {
      return;
    }
    const response = await storage.createFile(
      BUCKET_ID_IMAGES,
      ID.unique(),
      fileObj
    );
  const imagePreview = storage.getFilePreview(BUCKET_ID_IMAGES, response.$id);
  console.log(imagePreview);
  setThreadImage(imagePreview.href);
  console.log(threadImage)
  };



  return (
    <div className="container max-w-[600px] mx-auto">
      <div className="p-4">
        <form action="" onSubmit={handleThreadSubmit}>
          <textarea
            required
            name="body"
            placeholder="Say something"
            value={threadBody}
            onChange={(e) => {
              setThreadBody(e.target.value);
            }}
            className="w-full rounded-lg my-2 p-4 text-sm bg-[rgba(29,29,29,1)]"
          ></textarea>
          <img src={threadImage} alt="" />

          <input
            type="file"
            style={{ display: "none" }}
            onChange={handleFileChange}
            ref={fileRef}
          />

          <div className="flex justify-between py-2 items-center border-y  border-[rgba(49,49,50,1)]">
            <Image onClick={handleClick} className="cursor-pointer" size={24} />
            <input
              className="bg-white text-black py-2 px-4 border border-black rounded cursor-pointer"
              type="submit"
              value="Post"
            />
          </div>
        </form>
      </div>

      {threads.map((thread) => (
        <Thread key={thread.$id} thread={thread} setThreads={setThreads} />
      ))}
    </div>
  );
};

export default Feed;
