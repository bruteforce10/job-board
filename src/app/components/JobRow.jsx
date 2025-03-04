"use server";
import { FaRegHeart } from "react-icons/fa6";
import TimeAgoComponent from "./TimeAgoComponent";
import Link from "next/link";

export default async function JobRow({ jobInfo }) {
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
              <div className="text-gray-500 text-sm capitalize">
                {jobInfo.remote} &middot; {jobInfo.country}, {jobInfo.city}{" "}
                &middot; | {jobInfo.type}-time
                {jobInfo.isAdmin && (
                  <>
                    {" "}
                    &middot;{" "}
                    <Link href={"/jobs/edit/" + jobInfo._id}>Edit</Link>{" "}
                    &middot; <button>Delete</button>
                  </>
                )}
              </div>
            </div>

            <div className="content-end text-gray-500 text-sm">
              <TimeAgoComponent createdAt={jobInfo.createdAt} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
