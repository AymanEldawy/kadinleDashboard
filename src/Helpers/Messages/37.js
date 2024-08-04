import { fetchWord } from "../../Components/lang/fetchWord";

export const msg37 = (lang) => `
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
      <h1>${fetchWord("Hello", lang)} [agent_name].</h1>
      <p style="line-height: 1.7">
        ${fetchWord("msg_37_text_1", lang)} ([reason]) ${fetchWord(
  "msg_37_text_2",
  lang
)} [product_or_service] ${fetchWord("msg_37_text_3", lang)} [current_price]
        ${fetchWord("to", lang)} [new_price].<br />

        ${fetchWord("msg_37_text_4", lang)}:<br />
        .<br /> ${fetchWord("msg_37_text_11", lang)}
        [benefits] .<br />
        ${fetchWord("msg_37_text_5", lang)} [date],
        ${fetchWord("all", lang)}  [orders_contracts] 
        ${fetchWord("msg_37_text_6", lang)}.<br />
        ${fetchWord("msg_37_text_7", lang)}.<br />
        ${fetchWord("msg_37_text_8", lang)} [product_category]
        ${fetchWord("msg_37_text_9", lang)}.<br />
        ${fetchWord("msg_37_text_10", lang)}
        [name_Department] ${fetchWord("at", lang)} [phone_or_email] <br />
      </p>
     <p style="display: flex; justify-content: center;  margin-top: 20px;">
        <b>${fetchWord("Best_regards", lang)} </b>
        <img
          src="http://66.29.142.115/bookmark-heart.png"
          style="
            width: 30px;
            height: 30px;
            margin: 0 0 -9px !important;
          "
        />

        <!-- Message content -->
      </p>
    </div>
  </div>
</td>
</tr>
<tr>
<td>
  <div
    style="margin: 15px 0 0 !important; text-align: center"
  >
    <a
      style="
        background-color: #fffffe !important;
        color: #f457b0 !important;
        text-decoration: none !important;
        padding: 0 5px;
        overflow: hidden;
        display: inline-block;
        border-radius: 10px;
        padding: 10px 20px;
        width: fit-content;
        margin: 0 auto;
        font-size: 1.2rem;
      "
      href="http://kadinle.com/"
    >
      <span style="margin: 5px 5px 0 !important; float: left">
        ${fetchWord("Take_the_chance", lang)}
      </span>

      <img
        src="http://66.29.142.115/bag.png"
        style="width: 26px; height: 26px"
      />
    </a>
  </div>
</td>
</tr>
`;
