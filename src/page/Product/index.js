import React, { useEffect, useState } from "react";
import { Card, Button, Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import api from "../../services/api";
import "./styles.css";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const initialState = {
    id: null,
    produto: "",
    qnt: "",
    valor: "",
    categoria_id: ""
  };
  const [data, setData] = useState(initialState);

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  async function loadProducts() {
    try {
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
      alert("Erro ao carregar produtos. Verifique se o servidor está rodando.");
    }
  }

  async function loadCategories() {
    try {
      const response = await api.get("/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
      alert("Erro ao carregar categorias. Verifique se o servidor está rodando.");
    }
  }

  async function deleteProduct(id) {
    try {
      await api.delete(`/products/${id}`);
      await loadProducts();
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
      alert("Erro ao deletar produto");
    }
  }

  async function editProduct(id) {
    try {
      const product = products.find((product) => product.id === id);
      if (product) {
        setData(product);
      }
    } catch (error) {
      console.error("Erro ao carregar produto:", error);
      alert("Erro ao carregar produto");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!data.categoria_id) {
      alert("Selecione uma categoria");
      return;
    }

    try {
      if (data.id) {
        await api.put(`/products/${data.id}`, data);
      } else {
        await api.post("/products", {
          produto: data.produto,
          qnt: data.qnt,
          valor: data.valor,
          categoria_id: data.categoria_id
        });
      }
      setData(initialState);
      await loadProducts();
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
      alert("Erro ao salvar produto");
    }
  }

  function getCategoryName(categoria_id) {
    const category = categories.find(cat => cat.id === categoria_id);
    return category ? category.nome : 'Categoria não encontrada';
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Card className="marg-botton">
          <Card.Header as="h5">CADASTRAR PRODUTOS</Card.Header>
          <Card.Body>
            <Form.Row>
              <Form.Group className="col-md-4">
                <Form.Label>Nome*</Form.Label>
                <Form.Control
                  name="produto"
                  onChange={(e) => {
                    setData({ ...data, produto: e.target.value });
                  }}
                  value={data.produto}
                  placeholder="Informe o nome do produto"
                  required
                />
              </Form.Group>
              <Form.Group className="col-md-2">
                <Form.Label>Quantidade*</Form.Label>
                <Form.Control
                  name="qnt"
                  type="number"
                  min="0"
                  onChange={(e) => {
                    setData({ ...data, qnt: e.target.value });
                  }}
                  value={data.qnt}
                  placeholder="Qtd de produtos"
                  required
                />
              </Form.Group>
              <Form.Group className="col-md-2">
                <Form.Label>Valor*</Form.Label>
                <Form.Control
                  name="valor"
                  type="number"
                  step="0.01"
                  min="0"
                  onChange={(e) => {
                    setData({ ...data, valor: e.target.value });
                  }}
                  value={data.valor}
                  placeholder="Valor do produto"
                  required
                />
              </Form.Group>
              <Form.Group className="col-md-4">
                <Form.Label>Categoria*</Form.Label>
                <Form.Control
                  as="select"
                  name="categoria_id"
                  onChange={(e) => {
                    setData({ ...data, categoria_id: e.target.value });
                  }}
                  value={data.categoria_id}
                  required
                >
                  <option value="">Selecione uma categoria</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.nome}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Button type="submit" variant="primary">
              {data.id ? "ATUALIZAR" : "SALVAR"}
            </Button>
          </Card.Body>
        </Card>
      </Form>
      <Card>
        <Card.Header as="h5">LISTA DE PRODUTOS</Card.Header>
        <Card.Body>
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Produto</th>
                <th>Quantidade</th>
                <th>Valor Und</th>
                <th>Categoria</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.produto}</td>
                  <td>{product.qnt}</td>
                  <td>R$ {parseFloat(product.valor).toFixed(2)}</td>
                  <td>{getCategoryName(product.categoria_id)}</td>
                  <td>
                    <span className="just-icon">
                      <Link onClick={() => editProduct(product.id)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-pencil"
                          viewBox="0 0 16 16"
                        >
                          <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                        </svg>
                      </Link>
                      <Link onClick={() => deleteProduct(product.id)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-trash"
                          viewBox="0 0 16 16"
                        >
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                          <path
                            fillRule="evenodd"
                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                          />
                        </svg>
                      </Link>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  );
}
