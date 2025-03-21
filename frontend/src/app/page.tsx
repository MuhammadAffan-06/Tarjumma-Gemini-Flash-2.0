"use client";
import { useState, useEffect } from "react";
import Navbar from "@/app/components/navbar/navbar";
import Translation from "@/app/components/translation/translation";
import "./globals.css";

export default function Home() {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div>
        <Translation />
      </div>
    </>
  );
}
