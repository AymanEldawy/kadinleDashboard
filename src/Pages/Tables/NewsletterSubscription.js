import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { removeItemsFrom, removeSubscription } from "../../Api/globalActions";
import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import DynamicLayout from "../Dynamics/DynamicLayout";

const NewsletterSubscription = () => {
  const [selectedList, setSelectedList] = useState([]);
  const columns = COMBINE_DB_API.combine_newsletter_subscription || [];

  const removeFromSubscription = async (email) => {
    const response = await removeSubscription(email);
    if (response?.error) {
      toast.error("Failed to remove email, please try again later");
    } else toast.success("Successfully remove the email from Subscription");
  };

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="newsletter_subscription"
      columns={columns}
      title="Newsletter Subscription"
      setSelectedList={setSelectedList}
      selectedList={selectedList}
      customBarButtons={
        <Link
          to="/send-email"
          className="bg-primary-blue p-2 rounded-md text-white"
        >
          Send to newsletter
        </Link>
      }
      renderTableAction={(data) => {
        return (
          <div className="gap-2 flex items-center text-xs">
            <button
              onClick={() => removeFromSubscription(data?.email)}
              className="bg-primary-red p-2 rounded-md text-white"
            >
              remove
            </button>
          </div>
        );
      }}
    />
  );
};

export default NewsletterSubscription;
