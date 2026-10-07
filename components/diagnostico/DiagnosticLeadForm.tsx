"use client";

import { useState, type FormEvent } from "react";

export type LeadData = {
  name: string;
  whatsapp: string;
  email: string;
};

type Errors = Partial<Record<keyof LeadData, string>>;

type Props = {
  onSubmit: (data: LeadData) => void;
  onBack: () => void;
};

function validate(data: LeadData): Errors {
  const errors: Errors = {};

  if (data.name.trim().length < 2) {
    errors.name = "Informe seu nome.";
  }

  const digits = data.whatsapp.replace(/\D/g, "");
  if (digits.length < 10) {
    errors.whatsapp = "Informe um WhatsApp válido, com DDD.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = "Informe um e-mail válido.";
  }

  return errors;
}

export default function DiagnosticLeadForm({ onSubmit, onBack }: Props) {
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = { name, whatsapp, email };
    const validationErrors = validate(data);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    onSubmit(data);
  }

  return (
    <div className="diagnostic__screen diagnostic__screen--lead">
      <button type="button" className="diagnostic__back" onClick={onBack}>
        ← Voltar
      </button>

      <div className="diagnostic__titleMask">
        <h2 className="diagnostic__title diagnostic__revealTitle" tabIndex={-1}>Para continuarmos essa conversa.</h2>
      </div>

      <p className="diagnostic__text diagnostic__revealText">
        Deixe seus dados para receber sua leitura e, se fizer sentido,
        conversar com a Origami.
      </p>

      <form className="diagnostic__form" onSubmit={handleSubmit} noValidate>
        <div className="diagnostic__field diagnostic__revealField">
          <label htmlFor="diagnostic-name">Nome</label>
          <input
            id="diagnostic-name"
            name="name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name && (
            <span className="diagnostic__fieldError">{errors.name}</span>
          )}
        </div>

        <div className="diagnostic__field diagnostic__revealField">
          <label htmlFor="diagnostic-whatsapp">WhatsApp</label>
          <input
            id="diagnostic-whatsapp"
            name="whatsapp"
            type="tel"
            autoComplete="tel"
            value={whatsapp}
            onChange={(event) => setWhatsapp(event.target.value)}
            aria-invalid={Boolean(errors.whatsapp)}
          />
          {errors.whatsapp && (
            <span className="diagnostic__fieldError">{errors.whatsapp}</span>
          )}
        </div>

        <div className="diagnostic__field diagnostic__revealField">
          <label htmlFor="diagnostic-email">E-mail</label>
          <input
            id="diagnostic-email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email && (
            <span className="diagnostic__fieldError">{errors.email}</span>
          )}
        </div>

        <button type="submit" className="button button--blue diagnostic__revealAction">
          Continuar <span aria-hidden="true">→</span>
        </button>
      </form>
    </div>
  );
}
