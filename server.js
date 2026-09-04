import express from "express";
import { MercadoPagoConfig, Preference } from "mercadopago";

const app = express();

app.use(express.json());
app.use(express.static("public"));

const client = new MercadoPagoConfig({
  accessToken: "SEU_ACCESS_TOKEN"
});

const preference = new Preference(client);

app.post("/criar-pagamento", async (req, res) => {
  try {
    const resposta = await preference.create({
      body: {
        items: [
          {
            title: "Meu produto",
            quantity: 1,
            unit_price: 2000,
            currency_id: "BRL"
          }
        ]
      }
    });

    console.log("Pagamento criado:", resposta);

    res.json({
      id: resposta.id,
      init_point: resposta.init_point
    });

  } catch (error) {
    console.error("Erro:", error);

    res.status(500).json({
      erro: "Não foi possível criar o pagamento",
      detalhes: error.message
    });
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
