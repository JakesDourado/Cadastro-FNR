import React, { useEffect, useState } from "react";
import { Card, Button, Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import api from "../../services/api";
import "./styles.css";

export default function Category() {
  const [categories, setCategories] = useState([]);

  const initialState = {
    id: null,
    nome: "",
    descricao: "",
  };
  const [data, setData] = useState(initialState);

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    try {
      const response = await api.get("/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
      alert("Erro ao carregar categorias. Verifique se o servidor está rodando.");
    }
  }

  async function deleteCategory(id) {
    try {
      await api.delete(`/categories/${id}`);
      await loadCategories();
    } catch (error) {
      console.error("Erro ao deletar categoria:", error);
      alert("Erro ao deletar categoria");
    }
  }

  async function editCategory(id) {
    try {
      const category = categories.find((category) => category.id === id);
      if (category) {
        setData(category);
      }
    } catch (error) {
      console.error("Erro ao carregar categoria:", error);
      alert("Erro ao carregar categoria");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (data.id) {
        await api.put(`/categories/${data.id}`, data);
      } else {
        await api.post("/categories", {
          nome: data.nome,
          descricao: data.descricao
        });
      }
      setData(initialState);
      await loadCategories();
    } catch (error) {
      console.error("Erro ao salvar categoria:", error);
      alert("Erro ao salvar categoria");
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Card className="marg-botton">
          <Card.Header as="h5">CADASTRAR CATEGORIAS</Card.Header>
          <Card.Body>
            <Form.Row>
              <Form.Group className="col-md-6">
                <Form.Label>Nome*</Form.Label>
                <Form.Control
                  name="nome"
                  onChange={(e) => {
                    setData({ ...data, nome: e.target.value });
                  }}
                  value={data.nome}
                  placeholder="Informe o nome da categoria"
                  required
                />
              </Form.Group>
              <Form.Group className="col-md-6">
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                  name="descricao"
                  onChange={(e) => {
                    setData({ ...data, descricao: e.target.value });
                  }}
                  value={data.descricao}
                  placeholder="Informe a descrição da categoria"
                />
              </Form.Group>
            </Form.Row>
            <Button type="submit" variant="primary">
              {data.id ? "ATUALIZAR" : "SALVAR"}
            </Button>
          </Card.Body>
        </Card>
      </Form>
      <Card>
        <Card.Header as="h5">LISTA DE CATEGORIAS</Card.Header>
        <Card.Body>
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.nome}</td>
                  <td>{category.descricao}</td>
                  <td>
                    <span className="just-icon">
                      <Link onClick={() => editCategory(category.id)}>
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
                      <Link onClick={() => deleteCategory(category.id)}>
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