import React from "react";
import TeamPage from "./TeamPage";
import Head from "next/head";

const TeamPageWrapper: React.FC = () => {
  return (
    <>
      <Head>
        <title>Our Teams | Triverse</title>
        <meta
          name="description"
          content="Meet the talented team members behind Triverse"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <TeamPage />
    </>
  );
};

export default TeamPageWrapper;
