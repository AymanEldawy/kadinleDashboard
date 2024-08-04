import { fetchWord } from "../../Components/lang/fetchWord";

export const msg34 = (lang) => `
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
        <b>
          ${fetchWord("msg_34_text_1", lang)}.<br />

          ${fetchWord("msg_34_text_2", lang)} [discount_expire_time]......<br />

          <a href="" style="color: white !important"
            >${fetchWord("msg_34_text_3", lang)}</a
          ><br />
        <br />
            </b>
        </p>
            <div style="margin:15px 0; border-top: 1px solid #21212120; border-bottom: 1px solid #21212120; padding: 20px 0;align-items:center;justify-content: center;display: flex; flex-direction:column">
              <div style="display:flex; gap:10px; margin-bottom:10px ">
                <img src="https://kadinle.com/media/products/72004/208/7200400614110-1.jpg" style="height: 150px; width: 120px; object-fit:contain" alt="" />
                <div>
                  <h3>[product name]</h3>
                  <p>[product price]</p>
                </div>
              </div>
              <div style="display:flex; gap:10px; margin-bottom:10px">
              <img src="https://kadinle.com/media/products/7A005/109/7A00500610910-1.jpg" style="height: 150px; width: 120px; object-fit:contain" alt="" />
              <div>
                <h3>[product name]</h3>
                <p>[product price]</p>
              </div>
            </div>
            </div>
     <p style="display: flex; justify-content: center;  margin-top: 20px;">
        <b>${fetchWord("Kadinle_here_for_you", lang)} </b>
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
  <div style="margin: 15px 0 0 !important;text-align: center;">
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
      href="http://kadinle.com/new-arrivals"
    >
      <span style="margin: 5px 5px 0 !important; float: left">
        ${fetchWord("Our_new_products", lang)}
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
