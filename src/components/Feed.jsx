import axios from "axios";
import React, { useEffect, useRef, useCallback } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addFeed, appendFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const loadingRef = useRef(false);
  const hasMore = useRef(true);
  const LIMIT = 10;

  const getFeed = useCallback(async (isFirstPage = false) => {
    if (loadingRef.current || !hasMore.current) return;
    loadingRef.current = true;

    try {
      // Always fetch page=1 because the backend already filters out
      // users we've swiped on (via hideUsersFromFeed). So skip=0
      // always returns the next batch of unseen users.
      const res = await axios.get(
        BASE_URL + "/feed?page=1&limit=" + LIMIT,
        { withCredentials: true }
      );

      const newUsers = res?.data || [];

      // If backend returned 0 users, no more left
      if (newUsers.length === 0) {
        hasMore.current = false;
      }

      if (isFirstPage) {
        dispatch(addFeed(newUsers));
      } else if (newUsers.length > 0) {
        dispatch(appendFeed(newUsers));
      }
    } catch (error) {
      console.error("Feed fetch error:", error.message);
    } finally {
      loadingRef.current = false;
    }
  }, [dispatch]);

  // Initial load
  useEffect(() => {
    getFeed(true);
  }, []);

  // Prefetch next batch when running low on cards
  const feedLength = feed?.length ?? 0;
  useEffect(() => {
    if (feedLength > 0 && feedLength <= 3 && hasMore.current && !loadingRef.current) {
      getFeed(false);
    }
  }, [feedLength, getFeed]);

  if (!feed) return null;

  if (feed.length === 0) {
    return (
      <div className="flex justify-center my-10">
        <h1 className="text-bold text-2xl">No Users Found</h1>
      </div>
    );
  }

  return (
    <div className="flex justify-center my-10">
      <UserCard user={feed[0]} />
    </div>
  );
};

export default Feed;
