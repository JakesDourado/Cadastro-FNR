import React, { useEffect, useState } from "react";
import { Card, Button, Form, Table, Alert, Spinner, Modal } from "react-bootstrap";
import api from "../../services/api";
import "./styles.css";

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const initialState = {
    id: "",
    name: "",
    description: ""
  };

  const [data, setData] = useState(initialState);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get("/categories");
      setCategories(response.data);
    } catch (err) {
      setError("Erro ao carregar categorias. Verifique se o servidor está rodando.");
      console.error("Erro ao carregar categorias:", err);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!data.name.trim()) errors.name = "Nome da categoria é obrigatório";
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      if (data.id) {
        const response = await api.put(`/categories/${data.id}`, {
          name: data.name,
          description: data.description
        });
        setCategories(categories.map(c => c.id === response.data.id ? response.data : c));
        setSuccess("Categoria atualizada com sucesso!");
      } else {
        const response = await api.post("/categories", {
          name: data.name,
          description: data.description
        });
        setCategories([...categories, response.data]);
        setSuccess("Categoria cadastrada com sucesso!");
      }
      
      setData(initialState);
      setShowModal(false);
    } catch (err) {
      setError("Erro ao salvar categoria. Verifique se o servidor está rodando.");
      console.error("Erro ao salvar categoria:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (category) => {
    setData({
      id: category.id,
      name: category.name,
      description: category.description
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir esta categoria?")) return;

    try {
      setLoading(true);
      await api.delete(`/categories/${id}`);
      setCategories(categories.filter(category => category.id !== id));
      setSuccess("Categoria excluída com sucesso!");
    } catch (err) {
      setError("Erro ao excluir categoria. Verifique se o servidor está rodando.");
      console.error("Erro ao excluir categoria:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setData(initialState);
    setValidationErrors({});
  };

  return (
    <div className="category-container">
      {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}
      {success && <Alert variant="success" onClose={() => setSuccess(null)} dismissible>{success}</Alert>}

      <div className="header-actions">
        <h2>Categorias</h2>
        <Button variant="primary" onClick={() => setShowModal(true)} disabled={loading}>
          Nova Categoria
        </Button>
      </div>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : categories.length === 0 ? (
        <Alert variant="info">Nenhuma categoria cadastrada.</Alert>
      ) : (
        <Table responsive>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td>{category.name}</td>
                <td>{category.description}</td>
                <td>
                  <span className="just-icon">
                    <Button
                      variant="link"
                      onClick={() => handleEdit(category)}
                      disabled={loading}
                    >
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
                    </Button>
                    <Button
                      variant="link"
                      onClick={() => handleDelete(category.id)}
                      disabled={loading}
                    >
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
                    </Button>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{data.id ? "Editar Categoria" : "Nova Categoria"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nome*</Form.Label>
              <Form.Control
                name="name"
                value={data.name}
                onChange={handleInputChange}
                placeholder="Nome da categoria"
                isInvalid={!!validationErrors.name}
                disabled={loading}
              />
              <Form.Control.Feedback type="invalid">
                {validationErrors.name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={data.description}
                onChange={handleInputChange}
                placeholder="Descrição da categoria"
                rows={3}
              />
            </Form.Group>

            <div className="button-group">
              <Button
                variant="primary"
                type="submit"
                disabled={loading}
              >
                {loading ? <Spinner animation="border" size="sm" /> : "SALVAR"}
              </Button>
              <Button
                variant="secondary"
                onClick={handleCloseModal}
                disabled={loading}
              >
                CANCELAR
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
} 