import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import DynamicLayout from "../Dynamics/DynamicLayout";

const NewsletterSubscription = () => {
  const navigate = useNavigate();
  const columns = COMBINE_DB_API.combine_newsletter_subscription || [];

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="newsletter_subscription"
      columns={columns}
      title="Newsletter Subscription"
      // onAddClick={() => navigate(`/add-NewsletterSubscription`)}
    />
  );
};

export default NewsletterSubscription;
