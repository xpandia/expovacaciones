const { Resend } = require('resend');

module.exports = async (req, res) => {
    // CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { nombre, apellido, empresa, email, telefono, tipo, mensaje } = req.body;

    if (!nombre || !apellido || !empresa || !email || !telefono) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    try {
        await resend.emails.send({
            from: 'Expovacaciones <onboarding@resend.dev>',
            to: 'daniel@xpandia.co',
            subject: `Nueva solicitud de expositor: ${empresa}`,
            html: `
                <h2>Nueva solicitud de expositor - Expovacaciones Cali 2026</h2>
                <table style="border-collapse:collapse;width:100%;max-width:600px;">
                    <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Nombre</td><td style="padding:8px;border-bottom:1px solid #eee;">${nombre} ${apellido}</td></tr>
                    <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Empresa</td><td style="padding:8px;border-bottom:1px solid #eee;">${empresa}</td></tr>
                    <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Email</td><td style="padding:8px;border-bottom:1px solid #eee;">${email}</td></tr>
                    <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Teléfono</td><td style="padding:8px;border-bottom:1px solid #eee;">${telefono}</td></tr>
                    <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Tipo de Empresa</td><td style="padding:8px;border-bottom:1px solid #eee;">${tipo || 'No especificado'}</td></tr>
                    <tr><td style="padding:8px;font-weight:bold;vertical-align:top;">Mensaje</td><td style="padding:8px;">${mensaje || 'Sin mensaje'}</td></tr>
                </table>
            `,
        });

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ error: 'Error al enviar el correo' });
    }
};
