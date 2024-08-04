import React, { useContext, useEffect, useState } from "react";
import { useCallback } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import { getUserData, getUsersEmail } from "../../Api/data";
import BlockPaper from "../../Components/BlockPaper/BlockPaper";
import Loading from "../../Components/Loading/Loading";
import { LanguageContext } from "../../Context/LangContext";
import { sendMail, TEMPLATES } from "../../Helpers/EmailSender/Sender";
import { msg8 } from "../../Helpers/Messages/8";
import { messageBody } from "../../Helpers/Messages/message-body";
import InputField from "./../../Components/CustomForm/InputField";
import SelectField from "./../../Components/CustomForm/SelectField";
import HTMLEditor from "./../../Components/Forms/HTMLEditor/HTMLEditor";

const EmailSender = () => {
  const { lang } = useContext(LanguageContext);
  const location = useLocation();
  const [template, setTemplate] = useState("other");
  const [language, setLanguage] = useState("ar");
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [sendToAll, setSendToAll] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [noEmail, setNoEmail] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [listOfTemplates, setListOfTemplates] = useState([]);
  const [mail, setMail] = useState(msg8("ar"));
  let state = location?.state;

  useEffect(() => {
    if (state?.availableTemplates?.length) {
      let templates = Object.values(TEMPLATES)?.filter((item) =>
        state?.availableTemplates?.includes(item?.number)
      );
      setListOfTemplates(templates);
      setTemplate(templates?.at(0)?.number);
    } else {
      setListOfTemplates(Object.values(TEMPLATES));
    }
    if (state?.userId) {
      getUserData("user", "id", state?.userId).then((res) => {
        setUserInfo(res?.data?.at(0));
      });
    }
  }, [state]);

  useEffect(() => {
    setMail("");
    let selectedTemplate = TEMPLATES?.[template];
    let templateFn = TEMPLATES?.[template]?.fn;
    setMail(
      messageBody(typeof templateFn === "function" ? templateFn(language) : "")
    );

    if (selectedTemplate?.subject !== "other")
      setSubject(selectedTemplate?.subject);
    setRefresh((p) => !p);
  }, [template, language]);

  const onChangeField = useCallback((e) => {
    setEmail(e.target.value);
  }, []);
  const fetchEmail = async () => {
    if (!email) {
      setNoEmail(false);
      return;
    }
    const response = await getUserData("user", "email", email);
    if (response?.data?.length) {
      setNoEmail(false);
      setUserInfo(response?.data?.at(0));
    } else {
      setNoEmail(true);
    }
  };

  const onSend = async () => {
    let loading = toast.loading("Loading ...");
    if (!mail) {
      toast.error(`You can't send an empty message`);
      return;
    }
    let response = null;
    if (state?.userId || email) {
      let to = state?.userId || email;
      response = await sendMail(mail, [to], subject);
    } else {
      const responseEmails = await getUsersEmail();
      const emailList = responseEmails?.data?.map((e) => e.email);
      if (!emailList?.length) {
        toast.error(
          "there are an error with selected emails please try again later"
        );
        return;
      }
      response = await sendMail(mail, emailList, subject);
    }

    if (response?.ok)
      toast.update(loading, {
        type: "success",
        render: "Email has been sent successfully",
        isLoading: false,
        autoClose: 1000,
      });
    else
      toast.update(loading, {
        type: "error",
        render: "Failed to send the Email, please try again later",
        isLoading: false,
        autoClose: 1000,
      });
  };

  return (
    <BlockPaper
      title="Send email"
      headerClassName="flex items-center justify-between"
      contentBar={
        <button
          onClick={onSend}
          className="bg-primary-blue text-white px-8 p-2 rounded-md"
        >
          Send
        </button>
      }
    >
      <div className="bg-gray-100  dark:bg-bgmaindark p-2 mb-4 flex items-center justify-between flex-wrap">
        <InputField
          containerClassName="w-full max-w-md"
          label="subject"
          placeholder="enter the subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        {state?.userId ? (
          <div>
            <p className="mb-1">
              <span className="font-semibold">
                {`${userInfo?.first_name} ${
                  userInfo?.last_name ? userInfo?.last_name : " "
                }`}
              </span>
            </p>
            <p className="mb-1">
              <span className="font-semibold">{userInfo?.email}</span>
            </p>
          </div>
        ) : (
          <div className="flex gap-2 items-center flex-1 justify-end">
            {email ? null : (
              <InputField
                containerClassName="w-[100px]"
                label="Send to all"
                labelClassName="whitespace-nowrap"
                type="checkbox"
                className="p-2 h-6 w-6"
                value={true}
                checked={sendToAll}
                onChange={(e) => setSendToAll(e.target.checked)}
              />
            )}
            <div className="h-[50px] bg-slate-300 w-[1px]  first:hidden last:hidden mx-4" />

            {sendToAll ? null : (
              <div className="relative">
                <InputField
                  containerClassName="w-full max-w-md"
                  className={`min-w-[250px] ${noEmail ? "border-red-500" : ""}`}
                  label="Email"
                  type="email"
                  value={email}
                  onChange={onChangeField}
                  onBlur={fetchEmail}
                />
                {noEmail ? (
                  <p className="absolute right-0 top-0 text-red-500 text-xs">
                    Email not found
                  </p>
                ) : (
                  <>
                    {email && userInfo?.email ? (
                      <span className="font-semibold absolute right-0 top-0">
                        {`${userInfo?.first_name} ${
                          userInfo?.last_name ? userInfo?.last_name : " "
                        }`}
                      </span>
                    ) : null}
                  </>
                )}
              </div>
            )}
            <div className="h-[50px] bg-slate-300 w-[1px]  first:hidden last:hidden mx-4" />
          </div>
        )}
      </div>

      <div className="flex items-center gap-6 mb-6 dark:bg-bgmaindark bg-gray-200 shadow p-4">
        {location?.state?.template ? null : (
          <SelectField
            label="message type"
            containerClassName="w-full max-w-sm"
            className="p-2"
            value={template}
            keyLabel="subject"
            keyValue="number"
            list={listOfTemplates}
            onChange={(e) => setTemplate(e.target.value)}
          />
        )}
        <SelectField
          label="choose language"
          containerClassName="w-full max-w-sm"
          className="p-2"
          value={language}
          keyLabel="name"
          keyValue="name"
          list={[{ name: "ar" }, { name: "tr" }, { name: "en" }]}
          onChange={(e) => setLanguage(e.target.value)}
        />
      </div>

      {/* <div className="flex gap-4 my-4 items-center">
        <UploadFile
          label="Upload media"
          containerClassName="max-w-[400px] w-full rounded-md"
        />
        <div className="">
          {media?.map((item) => (
            <img src={item} alt="item media" />
          ))}
        </div>
      </div> */}

      <HTMLEditor mail={mail} setMail={setMail} />
    </BlockPaper>
  );
};

export default EmailSender;
