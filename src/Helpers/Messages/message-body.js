export const messageBody = (message) => `
<!DOCTYPE html>
<html>
  <head>
    <title>Kadinle</title>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body
    style="
      font-size: 10pt;
      font-family: 'Poppins', sans-serif, ARIAL !important;
      margin: 0 !important;
    "
  >
    <table style="background-color: #fff !important; border-collapse: collapse">
      <tbody>
        <tr style="border: none">
          <td
            align="center"
            colspan="4"
            bgcolor="#393939"
            style="background-color: #393939 !important"
          >
            <img
              src="http://66.29.142.115/logo.png"
              alt="logo"
              style="width: 30%; padding-bottom: 16px; padding-top: 16px"
            />
          </td>
        </tr>
        <tr style="border: none; background: #fffffe !important">
          <td
            colspan="1"
            align="center"
            style="border: none; border-bottom: 6px solid #c4c4c4 !important"
          >
            <figure style="width: 30px !important; height: 35px !important">
              <img
                src="http://66.29.142.115/dresses.png"
                className=""
                style="
                  fill: #f457b0 !important;
                  width: 100% !important;
                  max-width: 100% !important;
                  height: 32px !important;
                  max-height: 32px !important;
                  object-fit: cover;
                  margin: 8px 0 !important;
                "
              />
            </figure>
            <p
              style="
                margin: 0 !important;
                font-size: 16px;
                color: #f457b0 !important;
              "
            >
              Dresses
            </p>
          </td>
          <td
            colspan="1"
            align="center"
            style="border: none; border-bottom: 6px solid #c4c4c4 !important"
          >
            <figure style="width: 30px !important; height: 35px !important">
              <img
                src="http://66.29.142.115/clothes.png"
                style="
                  fill: #f457b0 !important;
                  width: 100% !important;
                  max-width: 100% !important;
                  height: 32px !important;
                  max-height: 32px !important;
                  object-fit: cover;
                  margin: 8px 0 !important;
                "
              />
            </figure>
            <p
              style="
                margin: 0 !important;
                font-size: 16px;
                color: #f457b0 !important;
              "
            >
              Clothing
            </p>
          </td>
          <td
            colspan="1"
            align="center"
            style="border: none; border-bottom: 6px solid #c4c4c4 !important"
          >
            <figure style="width: 30px !important; height: 35px !important">
              <img
                src="http://66.29.142.115/accessories.png"
                style="
                  fill: #f457b0 !important;
                  width: 100% !important;
                  max-width: 100% !important;
                  height: 32px !important;
                  max-height: 32px !important;
                  object-fit: cover;
                  margin: 8px 0 !important;
                "
              />
            </figure>
            <p
              style="
                margin: 0 !important;
                font-size: 16px;
                color: #f457b0 !important;
              "
            >
              Accessories
            </p>
          </td>
          <td
            colspan="1"
            align="center"
            style="border: none; border-bottom: 6px solid #c4c4c4 !important"
          >
            <figure style="width: 30px !important; height: 35px !important">
              <img
                src="http://66.29.142.115/gift.png"
                style="
                  fill: #f457b0 !important;
                  width: 100% !important;
                  max-width: 100% !important;
                  height: 32px !important;
                  max-height: 32px !important;
                  object-fit: cover;
                  margin: 8px 0 !important;
                "
              />
            </figure>
            <p
              style="
                margin: 0 !important;
                font-size: 16px;
                color: #f457b0 !important;
              "
            >
              Gifts
            </p>
          </td>
        </tr>
        <tr style="background: #393939 !important; padding: 20px">
          <td colspan="4">
            <table style="padding: 20px; width: 100%">
              <tbody>
                <!-- message content -->
                ${message}
                <!-- message content -->
              </tbody>
            </table>
          </td>
        </tr>

        <tr style="border: none; background: #fffffe !important">
          <td colspan="2" align="center">
            <h4
              style="
                color: rgb(105, 105, 105) !important;
                font-size: 20px !important;
                margin: 20px 0 10px !important;
              "
            >
              <b>Get the app</b>
            </h4>
            <div style="padding-bottom: 16px">
              <a
                className="social"
                style="
                  display: inline-block;
                  margin-left: 10px;
                  color: rgb(57, 57, 57) !important;
                  font-size: 1.2 !important;
                "
                href="#"
                target="_blank"
              >
                <img
                  style="width: 23px"
                  src="http://66.29.142.115/apple.png"
                  alt="apple"
                />
              </a>
              <a
                className="social"
                style="
                  display: inline-block;
                  margin-left: 10px;
                  color: rgb(57, 57, 57) !important;
                  font-size: 1.2 !important;
                "
                href="#"
                target="_blank"
              >
                <img
                  style="width: 23px"
                  src="http://66.29.142.115/google-play.png"
                  alt="google play"
                />
              </a>
              <a
                className="social"
                style="
                  display: inline-block;
                  margin-left: 10px;
                  color: rgb(57, 57, 57) !important;
                  font-size: 1.2 !important;
                "
                href="#"
                target="_blank"
              >
                <img
                  src="http://66.29.142.115/app-gallery.png"
                  style="
                    stroke: none;
                    fill: #f457b0 !important;
                    color: #f457b0 !important;
                    width: 23px;
                    height: 23px;
                  "
                />
              </a>
            </div>
          </td>
          <td colspan="2" align="center">
            <h4
              style="
                color: rgb(105, 105, 105) !important;
                font-size: 20px;
                margin: 20px 0 10px !important;
              "
            >
              <b>Find us on</b>
            </h4>
            <div style="padding-bottom: 16px">
              <a
                className="social"
                style="
                  color: rgb(57, 57, 57) !important;
                  display: inline-block;
                  margin-left: 5px;
                  font-size: 1.2 !important;
                "
                target="_blank"
                href="https://www.facebook.com/kadinle.arabic/"
              >
                <img
                  style="width: 23px; margin-left: 5px"
                  src="http://66.29.142.115/facebook.png"
                  alt="facebook"
                />
              </a>
              <a
                className="social"
                style="
                  color: rgb(57, 57, 57) !important;
                  display: inline-block;
                  margin-left: 5px;
                  font-size: 1.2 !important;
                "
                target="_blank"
                href="https://twitter.com/kadinle"
              >
                <img
                  style="width: 23px; margin-left: 5px"
                  src="http://66.29.142.115/twitter.png"
                  alt="twitter"
                />
              </a>
              <a
                className="social"
                style="
                  color: rgb(57, 57, 57) !important;
                  display: inline-block;
                  margin-left: 5px;
                  font-size: 1.2 !important;
                "
                target="_blank"
                href="https://www.instagram.com/kadinle.arabic/?hl=en"
                ><img
                  style="width: 23px; margin-left: 5px"
                  src="http://66.29.142.115/instagram.png"
                  alt="instagram"
              /></a>
              <a
                className="social"
                style="
                  color: rgb(57, 57, 57) !important;
                  display: inline-block;
                  margin-left: 5px;
                  font-size: 1.2 !important;
                "
                target="_blank"
                href="https://www.youtube.com/@kadinle"
              >
                <img
                  style="width: 23px"
                  src="http://66.29.142.115/youtube.png"
                  alt="youtube"
                />
              </a>
            </div>
          </td>
        </tr>
        <tr style="border: none; background: #fffffe !important">
          <td align="center" colspan="4">
            <p
              style="
                font-size: 1.2 !important;
                color: white;
                color: rgb(105, 105, 105) !important;
                font-size: 16px;
              "
            >
              This Email is generated automatically, and aims to draw your
              attention and provice you with all our news. You may receivce this
              Email if you are an affiliate or have made purchases through our
              store
              <a
                href="http://66.29.142.115"
                style="color: #f457b0 !important"
                target="_blank"
                >www.kadinle.com</a
              >.
            </p>
            <p
              style="
                font-size: 1.2 !important;
                color: white;
                color: rgb(105, 105, 105) !important;
                font-size: 16px;
              "
            >
              If you do not wish to recive emails from KADINLE, click the
              (unsubscribe link) button below. If you have any other inquiries,
              please contact our customer service.
            </p>
            <p
              style="
                font-size: 1.2 !important;
                color: white;
                color: rgb(105, 105, 105) !important;
                font-size: 16px;
              "
            >
              <a
                style="color: #f457b0 !important"
                target="_blank"
                href="http://66.29.142.115/support"
                >Customer service</a
              >
              |
              <a
                style="color: #f457b0 !important"
                target="_blank"
                href="http://66.29.142.115/policy"
                >Privacy policy</a
              >
              |
              <a
                style="color: #f457b0 !important"
                target="_blank"
                href="http://66.29.142.115/terms"
                >Terms and conditions</a
              >
            </p>

            <p
              style="
                font-size: 22px;
                color: white;
                color: rgb(105, 105, 105) !important;
                font-size: 16px;
              "
            >
              <b className="red" style="color: #f457b0 !important">KADINLE STORE</b>
              <b> © 2022 ALL RIGHTS RESERVED.</b>
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </body>
</html>

  
`;
