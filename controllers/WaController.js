const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      "--no-first-run",
      "--no-zygote",
      "--disable-gpu",
    ],
  },
  webVersionCache: {
    type: "remote",
    remotePath:
      "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html",
  },
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.once("ready", () => {
  console.log("Client is ready!");
});

client.initialize();

const api = async (req, res) => {
  const tokenApp = "shjdksahlsakjdkaqijdsajhda";
  let nohp = req.query.nohp || req.body.nohp;
  const pesan = req.query.pesan || req.body.pesan;
  const token = req.query.token || req.body.token;

  try {
    if (token != tokenApp) {
      return res
        .status(401)
        .json({ status: "gagal", pesan: "token tidak valid" });
    }
    if (nohp.startsWith("0")) {
      nohp = "62" + nohp.slice(1) + "@c.us";
    } else if (nohp.startsWith("62")) {
      nohp = nohp + "@c.us";
    } else {
      nohp = "62" + nohp + "@c.us";
    }
    const user = await client.isRegisteredUser(nohp);
    if (user) {
      client.sendMessage(nohp, pesan);
      res.json({ status: "success", pesan: "berhasil Terkirim" });
    } else {
      res.json({ status: "error", pesan: "nomor WA tidak terdaftar" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", pesan: "Server Error" });
  }
};

module.exports = api;
