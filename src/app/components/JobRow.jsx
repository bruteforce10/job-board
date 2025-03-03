"use client";
import { FaRegHeart } from "react-icons/fa6";
import TimeAgo from "react-time-ago";
import "../utils/timeAgoConfig.js";

export default function JobRow({ jobInfo }) {
  console.log(jobInfo);
  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-sm relative  md:flex">
        <div className="absolute top-4 cursor-pointer right-4">
          <FaRegHeart className="size-4 text-gray-400" />
        </div>
        <div className="flex grow gap-4">
          <div className="content-center">
            <img
              className="size-12"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/1200px-Spotify_logo_without_text.svg.png"
              alt=""
            />
          </div>
          <div className="grow sm:flex">
            <div className="grow">
              <div className="text-gray-500 text-sm">
                {jobInfo.orgName || "?"}
              </div>
              <div className="font-bold text-lg mb-1">{jobInfo.title}</div>
              <div className="text-gray-500 text-sm">
                Remote &middot; United States | Full time
              </div>
            </div>

            <div className="content-end text-gray-500 text-sm">
              <TimeAgo
                date={jobInfo.createdAt}
                locale="id"
                timeStyle="round-minute"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
