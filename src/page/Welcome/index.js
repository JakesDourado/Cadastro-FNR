import React from "react";
import "./styles.css";
import { Card } from "react-bootstrap";

export default function Welcom() {
  return (
    <>
      <Card className="conteiner">
        <Card.Body>
          <h1>Bem vindo!</h1>
          <p>MVP - Cadastro de produto.</p>
        </Card.Body>
      </Card>
    </>
  );
}
