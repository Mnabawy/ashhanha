const logo = require('../../assets/imgs/logo.png');

const PDFHtml = ({ data }) => {
  const shipmentDetails = data;

  return (
    `<!DOCTYPE html>
<html class="no-js" lang="ar">
  <head>
    <title>esh7nha</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <meta name="description" content="description">
    <meta name="Sard" content="sard">
    <meta name="robots" content="index">
    <style>
      span{
        display: block;
      }
      table{
        width: 60%;
        margin: auto;
        border: 1px solid #000;
        border-collapse: collapse;
      }
      table tr:not(:last-child){
        border-bottom:1px solid #000;
      }
      table td{
        padding:15px;
      }
      .dark{
        background: #000;
        color: #fff;
      }
      .dark h4{
        margin: 0;
      }
      h4{
        font-size:22px;
        margin: 5px 0;
      }
      h2{
        text-align: center;
        font-size:32px ;
        margin: 0;
      }
      .logo img{
        width: 250px;
        max-width: 100%;
      }
      @media only screen and (max-width: 767px) {
        table{
          width: 95%;
          margin: auto;
        }
        table td{
          min-width: 80px;
        }
      }
    </style>
  </head>
  <body>
    <table>
      <tr>
        <td colspan="2" class="logo">
          <img src=${shipmentDetails?.company?.image} alt="">
        </td>
        <td colspan="1" class="logo" style="text-align: right;">
          <img src=${shipmentDetails?.company?.image} alt="">
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <div>
            <label for="">From :${shipmentDetails?.sender?.name}</label>
          </div>
          <div>
            <span>Issac Mahmoud</span>
            <span>King Abdul Aziz Rd 123</span>
            <span>Alkhalidiyah</span>
            <span>ph 55555</span>
            <span>Gadda</span>
            <span>Saudi Arabia</span>
          </div>
        </td>
        <td>
          <p for="">Origin</p>
          <label>JED</label>
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <div>
            <label>To :</label>
          </div>
          <div>
            <span>Carllios Comnpany</span>
            <span>Juaan Carllio</span>
            <span>123 Main St</span>
            <span>Suite 4</span>
            <h4>33139 - 1234 Miami FL</h4>
            <h4>United States of America</h4>
          </div>
        </td>
        <td>
          <p>contact :</p>
          <p>ph : 55555555</p>
        </td>
      </tr>
      <tr>
        <td colspan="3">
          <h2>US - TMP</h2>
        </td>
      </tr>
      <tr>
        <td class="dark">
          <h4>C</h4>
        </td>
        <td>
          Day :
        </td>
        <td>
          Time :
        </td>
      </tr>
      <tr>
        <td>
          <p>Ref : 101 A</p>
        </td>
        <td>
          <p>Piece weight :</p>
          <h4>0.50 Kg</h4>
          <p>Date 28-May-2011</p>
        </td>
        <td>
          <p> pieces : 
          <h4>1/1</h4>
        </td>
      </tr>
      <tr>
        <td colspan="3">
          <span>contents : </span>
          <span>documentos</span>
        </td>
      </tr>
    </table>
  </body>
</html>`
  )
};

export default PDFHtml;
