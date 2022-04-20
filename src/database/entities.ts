import dotenv from 'dotenv';
import { ICalculatePriceAndQuantity, IRequestsList, IRegisterOrder } from './IEntities';
import { iFlavors } from '../routes/iRoutes';
import { UseDatabase } from './database';
dotenv.config();

export class Requests {
  async listRequests(page: string) {
    let limit: string = Number.parseInt(page) ? `limit ${(Number.parseInt(page) - 1)*10}, 10` : '';
    const search: Array<IRequestsList> = await UseDatabase.query(`SELECT id, date, quantity, price, fk_client from requests order by date desc ${limit}`);
    
    return search.map(request => {
      const { id, date, quantity, price, fk_client }: IRequestsList = request;
      if(fk_client === null) {
        return {
          request_id: id,
          date,
          pizzasQuantity: quantity,
          price
        }
      }
      return {
        request_id: id,
        date,
        pizzasQuantity: quantity,
        price,
        id_client: fk_client
      }
    })
  }

  async getAdress(id: string) {
    const search: [{address: string}] | [] = await UseDatabase.query('SELECT address from users where id = ?', [id])
    if(search.length === 0) throw 'User not found.';
    
    return search[0].address;
  }

  async calculatePriceAndQuantity (requestsList: Array<{flavors: Array<number>}>): Promise<ICalculatePriceAndQuantity> {
    const search: Array<iFlavors> = await UseDatabase.query('SELECT * from flavors');
    const options = search.map(row => row.id);
    let priceOfRequest = 0;
    let pizzaQuantity = 0;
    requestsList.forEach(flavorsArray => {
      let price = 0;
      flavorsArray.flavors.forEach(flavor => {
        if (options.indexOf(flavor) === -1) throw 'Flavor not found.';
        search.forEach(row => {
          if (row.id == flavor) {
            price += row.price;
          }
        })
      })
      pizzaQuantity++;
      priceOfRequest += (price/flavorsArray.flavors.length);
    });

    return { priceOfRequest, pizzaQuantity };
  }

  async registrar(datas: IRegisterOrder) {
    await UseDatabase.query('INSERT INTO requests (id, fk_client, date, price, quantity, address) VALUES (?,?,?,?,?,?)', Object.values(datas));
  }
}