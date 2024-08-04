const { fetchWord } = require("../../Components/lang/fetchWord");

export const msg17 = (lang) => `
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
        ${fetchWord("msg_17_text_1", lang)}  
        <br />
        ${fetchWord("msg_17_text_2", lang)}  
        .<br />
        ${fetchWord("msg_17_text_3", lang)}  
        [carrier]
        [tracking_number].<br />
        ${fetchWord("msg_17_text_3", lang)}  
        : [link].
        <br />
        ${fetchWord("msg_17_text_5", lang)}  
        [date] 
        ${fetchWord("msg_17_text_6", lang)}  
        .<br />
        ${fetchWord("msg_17_text_7", lang)}  
        .<br />
        ${fetchWord("msg_17_text_8", lang)}  
        .
        <br />
        ${fetchWord("msg_17_text_9", lang)}  
        [days]
        ${fetchWord("msg_17_text_10", lang)}  
        .<br />
        ${fetchWord("msg_17_text_11", lang)}  
        <a href="[print_link]">${fetchWord("msg_17_text_12", lang)}</a> 
        ${fetchWord("msg_17_text_13", lang)}.
        <br />
        ${fetchWord("msg_17_text_14", lang)}.
        <a href="[location_link]">${fetchWord("msg_17_text_15", lang)}</a>.
        <br />
        ${fetchWord("msg_17_text_16", lang)}.
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
