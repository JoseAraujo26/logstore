import { Router } from "express";
import { v4 as uuid } from "uuid";
import { Requests } from "../database/entities";
import { IRequest } from "./iRoutes";
import { DateGenerate } from "../utils/utils";

const router = Router();
const request = new Requests();

router
  .post('/registrarpedido', async (req, res) => {
    const id = uuid();
    const date = new DateGenerate();
    try {
      const { requestsList, tokenClient, address }: IRequest = req.body;
      const { priceOfRequest, pizzaQuantity } = await request.calculatePriceAndQuantity(requestsList);
      if (requestsList === undefined) throw 'Request property is not present.';
      if (tokenClient === undefined && address === undefined) throw 'The token and address properties are not present.';
      if (requestsList.length > 10) throw 'The max value of requests is 10.';
      if (requestsList.length === 0) throw 'Not exist values in requests.';
      if (tokenClient && address) throw 'The address is already registered in the database.';

      requestsList.forEach(async (element) => {
        try {
          if (element?.flavors?.length <= 0 || element?.flavors?.length > 2) throw 'The propriedade flavors is incorrect.';
        } catch (error) {
          return res.json({ error });
        }
      })

      request.registrar({
        id,
        fk_client: tokenClient ? tokenClient : null,
        date: date.fullDate,
        fullprice: priceOfRequest.toFixed(2),
        quantity: pizzaQuantity,
        address: address ? address : (await request.getAdress(tokenClient))
      });
        
      return res.json({ requestID: id });
    } catch (error) {
      return res.json({ error });
    }
  })

  .get('/pedidos', async (req, res) => {
    const { page }: {page?: string} = req.query;
    try {
      return res.json(await request.listRequests(page));
    } catch (error) {
      res.json({ error });
    }
  })

export { router };