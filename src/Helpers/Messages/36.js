import { fetchWord } from "../../Components/lang/fetchWord";

export const msg36 = (lang) => `
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
      <p style="line-height: 1.7">
        ${fetchWord("im", lang)} [your_name] ${fetchWord(
  "msg_36_text_1",
  lang
)}.<br />
        ${fetchWord("msg_36_text_2", lang)}.<br />
        ${fetchWord("msg_36_text_3", lang)}.<br />
        ${fetchWord("msg_36_text_4", lang)}.<br />
        ${fetchWord("msg_36_text_5", lang)}.<br />
        ${fetchWord("msg_36_text_6", lang)}<br />
      </p>
     <p style="display: flex; justify-content: center;  margin-top: 20px;">
        <b>[your_name] ${fetchWord("msg_36_text_7", lang)}  </b>
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
