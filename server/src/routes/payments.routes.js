import express from "express";
import { MercadoPagoConfig, Preference } from "mercadopago";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { title, unit_price, quantity } = req.body;

    console.log("Datos recibidos en /api/payments:", { title, unit_price, quantity });

    const client = new MercadoPagoConfig({
      accessToken: process.env.MP_ACCESS_TOKEN,
    });
    const preference = new Preference(client);

    // Versión simple (sandbox / local)
    const preferenceData = {
      items: [
        {
          title: title || "Producto Botanic Soul",
          unit_price: Number(unit_price),
          quantity: Number(quantity),
          currency_id: "CLP",
        },
      ],
      metadata: {
        order_id: `order-${Date.now()}`,
      },
    };

    console.log("Creando preferencia:", JSON.stringify(preferenceData, null, 2));

    const result = await preference.create({ body: preferenceData });

    console.log("Preferencia creada:", result.id);
    res.json({
      id: result.id,
      init_point: result.init_point,
      sandbox_init_point: result.sandbox_init_point,
    });
  } catch (error) {
    console.error("Error detallado:", error);
    res.status(500).json({
      error: "Error creando preferencia",
      message: error.message,
      details: error.cause || error,
    });
  }
});

router.get("/test", (req, res) => {
  res.json({
    message: "Payments API funcionando",
    token_configured: !!process.env.MP_ACCESS_TOKEN,
    token_preview: process.env.MP_ACCESS_TOKEN
      ? `${process.env.MP_ACCESS_TOKEN.substring(0, 10)}...`
      : "No configurado",
  });
});

export default router;
