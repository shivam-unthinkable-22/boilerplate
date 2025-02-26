"use client";
import { useAppDispatch, useAppSelector } from "@/lib/global-store/hooks";
import { decremented, incremented } from "@/lib/global-store/slices/counter";
import { Button } from "@mui/material";
import React from "react";

const Home = () => {
  const value = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div>
      <p>{value}</p>
      <Button onClick={() => dispatch(incremented())}>Counter +</Button>
      <Button onClick={() => dispatch(decremented())}>Counter -</Button>
    </div>
  );
};

export default Home;
