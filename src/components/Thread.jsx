import React, { useState, useEffect } from "react";
import {
  MoreHorizontal,
  Heart,
  Repeat,
  Send,
  MessageCircle,
  Trash2,
} from "react-feather";
import {
  functions,
  database,
  COLLECTION_ID_THREADS,
  DEV_DB_ID,
} from "../appwriteConfig";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";

TimeAgo.addDefaultLocale(en);
const Thread = ({ thread, setThreads }) => {
  const [loading, setLoading] = useState(true);
  const [owner, setOwner] = useState(null);
  const [threadInstance, setThreadInstance] = useState(thread);
  const currentUserId = "64b0f803f2f39b57a7ba";

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    const payload = {
      owner_id: thread.owner_id,
    };
    const response = await functions.createExecution(
      "64b13d301509bcf031ea",
      JSON.stringify(payload)
    );
    const userData = JSON.parse(response.response);

    setOwner(userData);
    setLoading(false);
  };

  const handleDelete = async () => {
    setThreads((prevState) =>
      prevState.filter((prevThread) => prevThread.$id !== thread.$id)
    );
    database.deleteDocument(DEV_DB_ID, COLLECTION_ID_THREADS, thread.$id);

    console.log("THREAD WAS DELETED");
  };
  if (loading) return;

  const toggleLike = async () => {
    const usersWhoLiked = thread.users_who_liked;
    if (usersWhoLiked.includes(currentUserId)) {
      const index = usersWhoLiked.indexOf(currentUserId);
      usersWhoLiked.splice(index, 1);
    } else {
      usersWhoLiked.push(currentUserId);
    }

    const payload = {
      users_who_liked: usersWhoLiked,
      likes: usersWhoLiked.length,
    };
    const response = await database.updateDocument(
      DEV_DB_ID,
      COLLECTION_ID_THREADS,
      thread.$id,
      payload
    );
    setThreadInstance(response);
    console.log(response);
  };

  return (
    <div className="flex justify-between p-4">
      <img
        className="w-10 rounded-full object-cover h-10 mx-2"
        src={owner.profile_pic}
      />
      <div className="w-full px-2 pb-4 border-b border-[rgba(49,49,49,1)]">
        {/* Thread header */}
        <div className="flex justify-between gap-2 ">
          <strong>{owner.name}</strong>
          <div className="flex justify-between gap-2 items-center cursor-pointer">
            <p className="text-[rgba(97,97,97,1)]">
              <ReactTimeAgo
                date={new Date(thread.$createdAt).getTime()}
                locale="en-US"
                timeStyle="twitter"
              />
            </p>
            <Trash2
              color={"rgba(97,97,97,1)"}
              size={14}
              onClick={() => {
                handleDelete();
              }}
            />
          </div>
        </div>
        {/* Thread body */}
        <div className="py-2" style={{ whiteSpace: "pre-wrap" }}>
          <span>{thread.body}</span>
          {thread.image && (
            <img
              className="object-cover border-[rgba(49,49,50,1)] rounded-md"
              src={thread.image}
            />
          )}
        </div>

        <div className="flex gap-4 py-4">
          <Heart
            size={22}
            onClick={toggleLike}
            className="cursor-pointer"
            color={
              threadInstance.users_who_liked.includes(currentUserId)
                ? "#fb3958"
                : "#fff"
            }
          />
          <MessageCircle size={22} />
          <Repeat size={22} />
          <Send size={22} />
        </div>

        <div className="flex gap-4">
          <p className="text-[rgba(97,97,97,1)]">Replies 14</p>
          <p className="text-[rgba(97,97,97,1)]"> · </p>
          <p className="text-[rgba(97,97,97,1)]">
            {" "}
            {threadInstance.likes}Likes{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Thread;
