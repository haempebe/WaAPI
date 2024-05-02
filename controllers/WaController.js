const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
});

client.once('ready', () => {
    console.log('Client is ready!');
});

client.initialize();

const api = async(req, res) => {
    const tokenApp = "shjdksahlsakjdkaqijdsajhda";
    let nohp = req.query.nohp || req.body.nohp;
    const pesan = req.query.pesan || req.body.pesan;
    const token = req.query.token || req.body.token;

    if (token != tokenApp) {
        return res.status(401).json({status : "gagal", pesan : "token tidak valid"});
    }
    
    try {
        if (nohp.startWith("0")) {
            nohp = "62" + nohp.slice(1) + "@c.us";
        }else if(nohp.startWith("62")){
            nohp = nohp + "@c.us"
        }else {
            nohp = "62" + nohp + "@c.us";
        }
        const user = await client.isRegisteredUser(id);
        if (user) {
            client.sendMessage(nohp, pesan);
            res.json ({status : "berhasil terkirim", pesan})
        } else {
            res.json({status : "gagal", pesan : "nomor WA tidak terdaftar"})
        }        
        res.json ({nohp, pesan})
    } catch (error) {
        
        console.log(error);
        res.status(500).json({status : "error", pesan : "Server Error"});
    }

}

module.exports = api;