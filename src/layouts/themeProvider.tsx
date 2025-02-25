"use client";

import { createContext, useContext, FC } from "react";
import useSWR from "swr";

const StrapiContext = createContext<any>(null);
const baseUrl = "https://api.td.sontam.xyz";

export const getAssetUrl = (url: string) => {
  return `${baseUrl}${url}`;
};

const endpoints = [
  "cookie-policy",
  "disclosure",
  "footer",
  "license",
  "policy-notice",
  "privacy-notice",
  "terms-and-condition",
  "terms-of-service",
  "teams"
];

export type typePage = 
  "cookie-policy" | 
  "disclosure" | 
  "footer" | 
  "license" | 
  "policy-notice" | 
  "privacy-notice" | 
  "terms-and-condition" | 
  "terms-of-service" |
  "teams"
  ;

const fetcher = async () => {
  const responses = await Promise.all(
    endpoints.map(async (endpoint) => {
      const data = await fetch(`${baseUrl}/api/${endpoint}`).then((res) => res.json())
      // console.log(data)
      return {[endpoint]: data}
    })
  );

  
  const pages = responses.reduce((acc, obj) => ({ ...acc, ...obj }), {});
  return pages;
};

export const StrapiProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data, error, isLoading, mutate } = useSWR("strapiData", fetcher);

  return (
    <StrapiContext.Provider value={{ data, error, isLoading, refetch: mutate }}>
      {children}
    </StrapiContext.Provider>
  );
};

export const useStrapi = () => {
  const context = useContext(StrapiContext);
  if (!context) throw new Error("useStrapi must be used within StrapiProvider");
  return context;
};
