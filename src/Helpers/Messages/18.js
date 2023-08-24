import { fetchWord } from "../../Components/lang/fetchWord";

export const msg18 = (lang) => `
<tr style="border: none">
<td>
  <div style="margin: 30px">
    <div
      style="
        color: #fff !important;
        background: #f457b0 !important;
        padding: 20px;
        box-shadow: 5px 6px 1px #b19999 !important;
        text-align: center;
        font-size: 1.2rem;
      "
    >
      <!-- Message content -->
      <h1>${fetchWord("Hello", lang)} [customer_name].</h1>
      <p style="line-height: 1.7;">
        ${fetchWord("msg_18_text_1", lang)}.<br />
        ${fetchWord("msg_18_text_2", lang)}
        .<br />
        ${fetchWord("msg_18_text_3", lang)}
        <a style="color: white !important" href="[customer_issue_link]">${fetchWord(
          "customer_issue",
          lang
        )}</a>.<br />
        ${fetchWord("msg_18_text_4", lang)}.<br />

        ${fetchWord("msg_18_text_5", lang)} [discount_code]%
        ${fetchWord("msg_18_text_6", lang)}: [code].<br />
        ${fetchWord("msg_18_text_7", lang)}.<br />
      </p>
     <p style="display: flex; justify-content: center;  margin-top: 20px;">
        <b
          >${fetchWord("service_center", lang)}
        </b>
        <img
          src="http://66.29.142.115/bookmark-heart.png"
          style="
            width: 30px;
            height: 30px;
            margin: 0 0 -9px !important;
          "
        />
      </p>
      <!-- Message content -->
    </div>
  </div>
</td>
</tr>
`;
