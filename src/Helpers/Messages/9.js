const { fetchWord } = require("../../Components/lang/fetchWord");

export const msg9 = (lang) => `
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
      <p>
        ${fetchWord("msg_9_text_1", lang)}
        <br />
        ${fetchWord("msg_9_text_2", lang)}
        <br />
        ${fetchWord("msg_9_text_3", lang)}
        
      </p>

      <p>
        <a
          class="but"
          href=""
          style="
            background-color: #fffffe !important;
            color: #f457b0 !important;
            text-decoration: none !important;
            padding: 0 5px;
            overflow: hidden;
            display: inline-block;
            border-radius: 10px;
            padding: 0 20px;
          "
        >
          <span
            style="margin: 5px 5px 0 !important; float: left"
            >${fetchWord("here", lang)}</span
          >
          <img
            src="http://66.29.142.115/hand-point.png"
            style="
              width: 20px;
              height: 20px;
              margin-top: 5px;
              display: inline-block;
            "
          />
        </a>
      </p>

      <p>
      ${fetchWord("msg_9_text_4", lang)}
      
      </p>
      <p>
      ${fetchWord("msg_9_text_5", lang)}
       [dollars] ${fetchWord("dollars", lang)}.
      </p>
      <p>
      ${fetchWord("msg_9_text_6", lang)}
      
      </p>
      <p>
      ${fetchWord("msg_9_text_7", lang)}
        
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
