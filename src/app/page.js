"use client";
import { logIn } from "@/provider/redux/slices/authSlice";
import { increment } from "@/provider/redux/slices/counterSlice";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/login");
  }, []);
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter);
  const handleIncrement = () => {
    // dispatch(increment());
    dispatch(logIn());
  };
  return <button onClick={handleIncrement}>Increment {counter}</button>;
}
