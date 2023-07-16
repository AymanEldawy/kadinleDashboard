import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import DynamicLayout from "../Dynamics/DynamicLayout";

const NewsletterSubscription = () => {
  const navigate = useNavigate();
  const [selectedList, setSelectedList] = useState([]);
  const columns = COMBINE_DB_API.combine_newsletter_subscription || [];

  // onClickRemove
  // onClickSend
  // OnSendMultiple

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="newsletter_subscription"
      columns={columns}
      title="Newsletter Subscription"
      setSelectedList={setSelectedList}
      selectedList={selectedList}
      renderTableAction={(data) => {
        return (
          <div className="gap-2 flex items-center text-xs">
            <button className="bg-primary-blue p-2 rounded-md text-white">
              Send
            </button>
            {/* <button>edit</button> */}
            <button className="bg-primary-red p-2 rounded-md text-white">
              remove
            </button>
          </div>
        );
      }}
    />
  );
};

export default NewsletterSubscription;
