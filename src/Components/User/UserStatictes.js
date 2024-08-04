import React from "react";

import { UserCardInfo } from "./UserCardInfo";
import { UserCardInfoSkeleton } from "./UserCardInfoSkeleton";

export const UserStatices = ({ userData, isLoading }) => {
  const cartLength = userData?.cart?.reduce((result, cur) => {
    return result + cur?.quantity;
  }, 0);

  const userInfo = [
    {
      title: "address",
      msg: `${userData?.address?.length} Address`,
      total: userData?.address?.length,
      link: `/users/${userData?.user?.id}/address`,
      empty: "User doesn't have any address",
    },
    {
      title: "cart",
      msg: `${userData?.cart?.length} Items`,
      total: userData?.cart?.length,
      link: `/users/${userData?.user?.id}/cart`,
      empty: "User doesn't have items is his cart",
    },
    {
      title: "invite",
      msg: `${userData?.invite?.length} Friends Invited`,
      total: userData?.invite?.length,
      link: `/users/${userData?.user?.id}/invite`,
      empty: "User doesn't Invite any friend",
    },
    {
      title: "like",
      msg: `${userData?.like?.length} Products liked`,
      total: userData?.like?.length,
      link: `/users/${userData?.user?.id}/like`,
      empty: "There is no like",
    },
    {
      title: "point",
      msg: `${userData?.point?.[0]?.point} Points`,
      total: userData?.point?.[0]?.point,
      link: `/users/${userData?.user?.id}/point`,
      empty: "0 points",
    },
    {
      title: "suggestion",
      msg: `${userData?.suggestion?.length} Suggestions`,
      total: userData?.suggestion?.length,
      link: `/users/${userData?.user?.id}/suggestion`,
      empty: "There is no suggestion",
    },
    {
      title: "ticket",
      msg: `${userData?.ticket?.length} Ticket`,
      total: userData?.ticket?.length,
      link: `/users/${userData?.user?.id}/ticket`,
      empty: "There is no ticket",
    },
    {
      title: "wallet",
      msg: `${userData?.wallet?.[0]?.amount} Amount`,
      total: userData?.wallet?.[0]?.amount,
      link: `/users/${userData?.user?.id}/wallet`,
      empty: "O amount",
    },
    {
      title: "chart",
      msg: `see the user chart data`,
      total: userData?.chart?.length,
      link: `/users/${userData?.user?.id}/chart`,
      empty: "user hasn't setting any chart data",
    },
  ];
  
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
        {isLoading ? (
          <>
            <UserCardInfoSkeleton />
            <UserCardInfoSkeleton />
            <UserCardInfoSkeleton />
            <UserCardInfoSkeleton />
            <UserCardInfoSkeleton />
            <UserCardInfoSkeleton />
            <UserCardInfoSkeleton />
            <UserCardInfoSkeleton />
            <UserCardInfoSkeleton />
          </>
        ) : (
          <>
            {userInfo?.map((info) => (
              <div key={info?.title}>
                <UserCardInfo
                  title={info?.title}
                  msg={info?.msg}
                  empty={info?.empty}
                  total={info?.total}
                  link={info?.link}
                  user={userData?.user}
                  isLoading={isLoading}
                />
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};
