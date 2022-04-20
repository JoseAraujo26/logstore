# Registrar pedido
  rota: /registrarpedido
  type: post

  ## Input usuário cadastrado
  {
    "address": ENDEREÇO DO USUÁRIO,
    "requestsList": [
      {
        "flavors": [ID DO SABOR, ID DO SABOR]
      },
      {
        "flavors": [ID DO SABOR]
      }
    ]
  }

  ## Input usuário não cadastrado
  {
    "tokenClient": ID DO USUÁRIO,
    "requestsList": [
      {
        "flavors": [ID DO SABOR, ID DO SABOR]
      },
      {
        "flavors": [ID DO SABOR]
      }
    ]
  }

# Listar pedido
  rota: /pedidos
  rota_paginação: /pedidos?page=number
  type: get
